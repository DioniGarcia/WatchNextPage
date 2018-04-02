<template>
  <div id="dashboard">
    <Navbar />
    <div class="wn-col col-pendientes">
      <div class="wn-col-title">Tareas Sin Asignar
        <button @click="dialogVisible = true" class="wn-menu-btn">Nueva tarea</button>
      </div>

      <div class="wn-col-container">
        <div v-for="task in tasks_sin_asignar" v-bind:key="task.id" class="wn-task-container"><!--scroll-->
          <div class="wn-task-data">
            <h3>{{task.titulo}}</h3>
            <p>Operario:  {{task.operario}}</p>
            <p>Duración: {{task.duracion}}/{{task.estimado}} min</p>
          </div>
          <div class="wn-btn-div">
            <button class="wn-menu-btn">Eliminar</button>
            <button class="wn-menu-btn disabled">Prioridad</button>
            <button class="wn-menu-btn">Editar</button>
          </div>
        </div>
      </div>

    </div>
                                                                              <!-- REFACTORIZAR!!! -->
    <div class="wn-col col-asignadas">
      <div class="wn-col-title">Tareas Asignadas</div>
      <div v-for="task in tasks_asignadas" v-bind:key="task.id" class="wn-task-container"><!--scroll-->
        <div class="wn-task-data">
          <h3>{{task.titulo}}</h3>
          <p>Operario:  {{task.operario}}</p>
          <p>Duración: {{task.duracion}}/{{task.estimado}} min</p>
        </div>
        <div class="wn-btn-div">
          <button class="wn-menu-btn">Eliminar</button>
          <button class="wn-menu-btn disabled">Prioridad</button>
          <button class="wn-menu-btn">Editar</button>
        </div>
      </div>
    </div>

    <div class="wn-col col-realizadas">
      <div class="wn-col-title ">Tareas Realizadas</div>
      <div v-for="task in tasks_realizadas" v-bind:key="task.id" class="wn-task-container"><!--scroll-->
        <div class="wn-task-data">
          <h3>{{task.titulo}}</h3>
          <p>Oprerario:  {{task.operario}}</p>
          <p>Duración: {{task.duracion}}/{{task.estimado}} min</p>
        </div>
        <div class="wn-btn-div">
          <button class="wn-menu-btn">Eliminar</button>
          <button class="wn-menu-btn disabled">Prioridad</button>
          <button class="wn-menu-btn">Editar</button>
        </div>
      </div>
    </div>


    <!-- Modal Add Tarea -->
    <el-dialog
        title="Nueva tarea"
        :visible.sync="dialogVisible"
        width="65%">

      <el-form ref="form" :model="form" label-position="left" label-width="120px">

        <el-form-item label="Título:"  required >
            <el-input  type="text" v-model="frm_titulo" placeholder="Nombre de la tarea"></el-input>
        </el-form-item>

        <el-form-item label="Prioridad:" required>
          <el-select v-model="frm_prioridad" placeholder="Medio">
            <el-option
              v-for="item in prioridades"
              :key="item.value"
              :label="item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Descripción:" required>
          <el-input type="textarea" v-model="frm_descripcion" placeholder="Descripción de la tarea"></el-input>
        </el-form-item>

        <el-form-item label="T. estimado:"  required>
          <el-input v-model="frm_estimado" placeholder="30" style="width: 10%"></el-input>
        </el-form-item>

        <el-switch  active-text="Pausable" v-model="frm_pausable"></el-switch>

        <el-form-item label="Etiquetas:"  required>
          <el-tag
            :key="tag"
            v-for="tag in frm_etiquetas"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>

          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>

          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nuevo tag</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- FIN: Modal Add Tarea -->
  </div>

</template>



<script>
  import Navbar from './Navbar';
  import db from './firebaseInit';
  import ButtonGroup from "bootstrap-vue/es/components/button-group/button-group";
  import InputTag from 'vue-input-tag';

  export default {
    name: 'dashboard',
    data() {
      return {

        dialogVisible: false,

        tasks_sin_asignar: [],
        tasks_asignadas:   [],
        tasks_realizadas:  [],

        // Modelo de datos del form
        frm_titulo:        '',
        frm_descripcion:   '',
        frm_estimado:      '',
        frm_prioridad:    200,
        frm_pausable:   false,
        frm_etiquetas:     [],

        prioridades: [
          { value: 400, text: 'Urgente' },
          { value: 300, text: 'Alta' },
          { value: 200, text: 'Media' },
          { value: 100, text: 'Baja' },
          { value: 0,   text: 'Muy baja' },
        ],

        inputVisible: false,
        inputValue: '',

        loading: true
      }
    },
    created: function () { // REFACTORIZAR
      db
        .collection('sinAsignar')
        .orderBy('titulo')
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const task = {
              id: doc.id,
              operario: "___",
              titulo: doc.data().titulo,
              duracion: doc.data().duracion,
              estimado: doc.data().estimado
            };
            this.tasks_sin_asignar.push(task);

          });
        });

      db.collection('asignadas').get().then(
        querySnapshot => {
          this.loading = false;
          querySnapshot.docs.map(doc => {
            console.log(doc.data());
            const id=doc.id;
            db.collection('asignadas').doc(id).collection('Tareas').get().then(
              querySnapshot => {
                this.loading = false;
                querySnapshot.docs.map(doc2 => {
                  const task = {
                    id: doc2.id,
                    operario: doc.id,
                    titulo: doc2.data().titulo,
                    duracion: doc2.data().duracion,
                    estimado: doc2.data().estimado
                  };
                  this.tasks_asignadas.push(task);
                });

              });
          });
        });


      db.collection('finalizadas').orderBy('titulo').get().then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const task = {
              id: doc.id,
              operario: doc.operario,
              titulo: doc.data().titulo,
              duracion: doc.data().duracion,
              estimado: doc.data().estimado
            };
            this.tasks_realizadas.push(task);

          });
        });


    },
    methods: {

      createTask (evt) {
        evt.preventDefault()
        if (!this.frm_titulo) {
          alert('El título no puede estar vacío')
        }
        else if (!this.frm_estimado) {
          alert('El tiempo estimado no puede estar vacío')
        }
        else if (isNaN(this.frm_estimado)) {
          alert('El tiempo estimado debe ser un número entero')
        }
        else {
          this.persistData()
          this.handleSubmit()

        }
      },
      persistData () {
        db.collection('sinAsignar').add({
          asignable: true,
          descripcion: this.frm_descripcion,
          estimado: parseInt(this.frm_estimado),
          etiquetas: this.frm_etiquetas,
          fecha_realizacion:  Date.now(),
          pausable:  this.frm_pausable,
          prioridad: this.frm_prioridad,
          titulo:    this.frm_titulo
        })
          .then(docRef => {
            console.log('Tarea añadida a FireBase!');

            for(var i in this.frm_etiquetas){
              db.collection('etiquetas').add({
                tag: this.frm_etiquetas[i],
                veces: 1
              })
            }
            this.cleanForm();

          })
          .catch(error => {
            console.error('Error añadiendo la tarea!',error);
            alert('Error añadiendo la tarea! Vuelve a intentarlo');
          })
      },

      handleSubmit () {
        this.tasks_sin_asignar.push(
          { titulo: this.frm_titulo,
            operario: "?",
            duracion: "?",
            estimado:this.frm_estimado}
        )
        this.dialogVisible = false;
        this.persistData();
      },

      handleClose(tag) {
        this.frm_etiquetas.splice(this.frm_etiquetas.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.frm_etiquetas.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },


      cleanForm () {
        this.frm_titulo='';
        this.frm_descripcion='';
        this.frm_estimado='';
        this.frm_prioridad=200;
        this.frm_pausable=false;
        this.frm_etiquetas=[];
      }

    },
    components: {
      ButtonGroup,
      Navbar,
      'bootstrap-modal': require('vue2-bootstrap-modal'),
      InputTag
    }
  }
</script>

<style>

  div.wn-col div{
    padding-left:  10px;
    padding-top:    3px;
    padding-bottom: 3px;
  }
  div.wn-col {
    width: 33.3333%;
    float: left;
    margin-top: -9px;
    border: solid 2px white;
    height: 100%;
  }
  div.wn-col-title {
    background: cadetblue;
    color: white;
    font-size: 16px;
    padding-bottom: 2px;
  }

  div.wn-col-container {
    overflow-y:scroll;
    align-content: center;
    padding: 0;
    margin:  0;
    height: 100%;
    width:  100%;
  }

  div.wn-task-container {
    margin-top: 3px;
    background: whitesmoke;
    height: 80px;
  }
  div.col-pendientes {
    border-left: none;
  }
  div.col-asignadas {
    border-left: none;
    border-right: none;
  }
  div.col-realizadas {
    border-right: none;
  }


  div.wn-task-data {
    width: 80%;
    float: left;
  }

  div.wn-task-data h3 {
    font-size:     16px;
  }

  div.wn-task-data p {
    font-size:     12px;
    padding-top:    4px;
    padding-bottom: 0px;
    margin-bottom:  -6px;
  }

  div.wn-btn-div {
    width: 2px;
    float: right;
  }

  button.wn-menu-btn {
    border: none;
    background: whitesmoke;
    color: cadetblue;
    font-size: 12px;
    float: right;
    width: 140px;
    padding-top:    2px;
    padding-bottom: 2px;
    padding-left:  34px;
    padding-right: 34px;
    margin-top:     1px;
    margin-right:  24px;
  }

  div.wn-btn-div .wn-menu-btn {
    width: 100px;
    font-size: 12px;
    text-align: left;
    float: right;
    margin-top:    0px;
    margin-bottom: 0px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

   /*body{*/
     /*background-image:none;*/
     /*background-color:white;*/
   /*}*/


</style>
