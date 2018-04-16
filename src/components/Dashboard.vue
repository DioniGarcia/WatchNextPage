<template>
  <div id="dashboard">
    <Navbar />
    <div class="wn-col col-pendientes">
      <div class="wn-col-title">Tareas Sin Asignar
        <button @click="dialogVisible = true" class="wn-menu-btn">Nueva tarea</button>
      </div>

      <div class="wn-col-container">
        <div v-for="task in templates" v-bind:key="task.id" class="wn-task-container"><!--scroll-->
          <Task
            :id=task.id
            :titulo=task.titulo
            :operario=task.operario
            :duracion=task.duracion
            :estimado=task.estimado
            :prioridad=task.prioridad
            :showMore=task.showMore
            :descripcion=task.descripcion
            :pausable=task.pausable
            :tags=task.tags
          />
          <div class="wn-btn-div">
            <button @click="deleteTask(task.id)" class="wn-menu-btn"><i class="fa fa-close " aria-hidden="true"></i></button>
            <button @click="fillData(task.id), dialogEditVisible = true" class="wn-menu-btn"><i class="fa fa-edit " aria-hidden="true"></i></button>
            <button v-if="!task.showMore" @click="task.showMore=true" class="wn-menu-btn"><i class="fa fa-eye " aria-hidden="true"></i></button>
            <button v-if="task.showMore" @click="task.showMore=false" class="wn-menu-btn"><i class="fa fa-eye-slash " aria-hidden="true"></i></button>
          </div>
        </div>
      </div>

    </div>
                                                                              <!-- REFACTORIZAR!!! -->
    <div class="wn-col col-asignadas">
      <div class="wn-col-title">Tareas Asignadas</div>
      <div v-for="task in tasks_asignadas" v-bind:key="task.id" class="wn-task-container"><!--scroll-->
        <div class="wn-task-data">
          <h3>ID: {{task.id}}</h3>
          <p>Nombre: {{task.titulo}}</p>
          <p>Operario:  {{task.operario}}</p>
          <p>Duración: {{task.duracion}}/{{task.estimado}} min</p>
        </div>
        <div class="wn-btn-div">
          <button class="wn-menu-btn">Eliminar</button>
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
          <button class="wn-menu-btn">Editar</button>
        </div>
      </div>
    </div>


    <!-- Modal Add Tarea -->
    <el-dialog
        title="Nueva tarea"
        :visible.sync="dialogVisible"
        width="65%">

      <el-form ref="form" label-position="left" label-width="120px">

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

          <el-autocomplete
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            :fetch-suggestions="querySearch"
            placeholder="Nombre nueva etiqueta"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelectTag">
          </el-autocomplete>

          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nuevo tag</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createTask">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- FIN: Modal Add Tarea -->

    <!-- Modal EDIT Tarea -->
    <el-dialog
      title="Editar tarea"
      :visible.sync="dialogEditVisible"
      width="65%">

      <el-form ref="form" label-position="left" label-width="120px">

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

          <el-autocomplete
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            :fetch-suggestions="querySearch"
            placeholder="Nombre nueva etiqueta"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelectTag">
          </el-autocomplete>

          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nuevo tag</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editTask">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- FIN: Modal EDIT Tarea -->
  </div>

</template>



<script>
  import Navbar from './Navbar';
  import Task from './Task';
  import db from './firebaseInit';
  import ButtonGroup from "bootstrap-vue/es/components/button-group/button-group";
  import InputTag from 'vue-input-tag';

  export default {
    name: 'dashboard',
    data() {
      return {

        dialogVisible: false,
        dialogEditVisible: false,

        templates: [],
        tasks_asignadas:   [],
        tasks_realizadas:  [],

        // Modelo de datos del form
        frm_operario: '',
        frm_fechaRealizacion: '',
        frm_asignable:   true,
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

        tagRecomendations: [],

        inputVisible: false,
        inputValue: '',
        id:'',
        loading: true
      }
    },
    created: function () {
      db
        .collection('sinAsignar')
        .orderBy('titulo')
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const task = {
              id: doc.id,
              operario: "No Asignado",
              titulo: doc.data().titulo,
              duracion: doc.data().duracion,
              estimado: doc.data().estimado,
              prioridad: doc.data().prioridad,
              showMore: false,
              descripcion: doc.data().descripcion,
              pausable: doc.data().pausable,
              tags: doc.data().etiquetas
            };
            this.templates.push(task);

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
      peix(){
        console.log('peix!')
      },
      querySearch(queryString, cb) {
        console.log('q_s')
        var tagRecomendations = this.tagRecomendations;
        var results = queryString ? tagRecomendations.filter(this.createFilter(queryString)) : tagRecomendations;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        console.log('C_F')
        return (coso) => {
          return (coso.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectTag(item) {
        console.log('hd_st')
        console.log(item);
        this.handleInputConfirm();
      },
      loadTags() {
        console.log('ld_tags')
        var tags = [];

        db.collection('etiquetas').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log('ld_tgs_data: '+doc.data().tag);
            const t = {

              "value": doc.data().tag

            };
            tags.push(t);
          });
        });
        return tags;
      },

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
          this.dialogVisible = false;
          this.persistData()
        }
      },

      editTask (evt) {
        console.log('Edit task')
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
          this.dialogEditVisible = false;
          this.updateTask(this.id)
        }
      },
      fillData(id){
        console.log(id)
        var opRef = db.collection("sinAsignar").doc(id.toString());

        opRef.get()
          .then(doc => {
            this.frm_operario = doc.data().operario,
            this.frm_asignable = doc.data().asignable,
            this.frm_titulo = doc.data().titulo,
            this.frm_descripcion = doc.data().descripcion,
            this.frm_estimado=  doc.data().estimado,
            this.frm_prioridad=  doc.data().prioridad,
            this.frm_pausable = doc.data().pausable,
            this.frm_etiquetas = doc.data().etiquetas,
            this.frm_fechaRealizacion = doc.data().fecha_realizacion,
            this.id = doc.id
          }).catch(function(error) {
          console.log("Error gettings document:", error);
        });
      },
      updateTask(id) {
        console.log('up_tsk_id_>'+id+'<')
        var tsRef = db.collection("sinAsignar").doc(id.toString());

        return tsRef.update({
          descripcion: this.frm_descripcion,
          estimado: parseInt(this.frm_estimado),
          etiquetas: this.frm_etiquetas,
          fecha_realizacion: Date.now(),
          pausable: this.frm_pausable,
          prioridad: this.frm_prioridad,
          titulo: this.frm_titulo,

        }).then(function() {
            console.log("Tarea actualizada con éxito!");
        }).then(() => {
            this.handleEdit(id)
        }).catch(function(error) {
            console.error("Error actualizando la tarea: ", error);
        });
      },
      persistData () {

        var autRef = db.collection('autoIncrems').doc('tareas');
        var transaction = db.runTransaction( async t => {
          return t.get(autRef)
            .then(doc => {

              var newTask = doc.data().tareas + 1;
              this.id = newTask;
              db.collection('sinAsignar').doc(newTask.toString()).set({

                asignable: true,
                descripcion: this.frm_descripcion,
                estimado: parseInt(this.frm_estimado),
                etiquetas: this.frm_etiquetas,
                fecha_realizacion: Date.now(),
                pausable: this.frm_pausable,
                prioridad: this.frm_prioridad,
                titulo: this.frm_titulo,
                id: newTask

              }).then(docRef => {
                console.log('Tarea añadida a FireBase!')

                for (var i = 0; i < this.frm_etiquetas.length; i++) {
                  var eti = this.frm_etiquetas[i].toString();

                  this.persistTag(eti);
                }
              }).then(() => {
                this.handleSubmit()

              }).catch(error => {
                console.error('Error añadiendo la tarea!',error)
              });
              t.update(autRef, {tareas: newTask});

            })
        })

      },

      deleteTask(id) {

        if (confirm('¿Estas seguro que quieres borrar la tarea con ID: ' + id + ' ?')) {
          var evalTags = [];
          var ref = db.collection('sinAsignar').doc(id.toString());

          return ref.get()
            .then(doc => {
              evalTags = doc.data().etiquetas;
              for (var i = 0; i < evalTags.length; i++) {
                this.decreaseTag(evalTags[i])
              }
            }).then(doc => {
              db.collection('sinAsignar').doc(id.toString()).delete().then(function () {
                console.log("Tarea borrada con éxito!");
              }).catch(function (error) {
                console.error("Error borrando tarea!: ", error);
              });

              this.removeFromModel(id);
            })
        }
      },

      removeFromModel(id){

        var idx = -1;
        var i = 0;
        this.templates.forEach(function(task) {
          if(task.id == id){
            idx=i;
          };
          i++;
        });
        this.templates.splice(idx,1);
      },

      decreaseTag(tag){

        var ref = db.collection('etiquetas').doc(tag);

        return ref.get()
          .then(doc => {
            var num = doc.data().veces;
            console.log(num)
            if(num > 1){
              ref.update({veces:num-1})
            }else{
              ref.delete().then(function() {
                console.log("Etiqueta borrada con éxito!");
              }).catch(function(error) {
                console.error("Error borrando etiqueta!: ", error);
              });
            }
          })

      },
      persistTag(tag){

        var refTag = db.collection('etiquetas').doc(tag);

        var getDoc = refTag.get().then(doc => {

          if (!doc.exists) {
            refTag.set({tag: tag, veces: 1})
              .then(docRef => {
                console.log('Nueva etiqueta añadida a FireBase!: '+tag)
                this.tagRecomendations = this.loadTags();
              })
              .catch(error => {console.error('Error añadiendo la etiqueta!: '+tag, error)});
          } else {
            var updateVeces = refTag.set({tag: tag, veces: doc.data().veces + 1})
              .then(docRef => {console.log('Etiqueta incrementada en FireBase!: '+tag)})
          }
        })
          .catch(err => {console.log('Error getting document', err);});
      },
      handleEdit(id) {
        console.log('hnd_edit_id>'+id+'<')
        var i = 0;
        for(i=0; i<this.templates.length; i++){
          console.log('peces en el rio')
          if(this.templates[i].id == id){
            this.templates[i].titulo=this.frm_titulo;
            this.templates[i].operario=this.frm_operario;
            this.templates[i].pausable=this.frm_pausable;
            this.templates[i].prioridad=this.frm_prioridad;
            this.templates[i].estimado=this.frm_estimado;
            this.templates[i].descripcion=this.frm_descripcion;
            this.templates[i].etiquetas=this.frm_etiquetas;
          }
        }

        this.dialogEditVisible = false;
        this.cleanForm();
      },
      handleSubmit () {
        console.log('hd_sm')
        this.templates.push(
          {
            titulo: this.frm_titulo,
            operario: "N/A",
            duracion: 0,
            estimado:parseInt(this.frm_estimado),
            id: this.id
          }

        )
        this.dialogVisible = false;
        this.cleanForm();
      },

      handleClose(tag) {
        console.log('hd_cls')
        this.frm_etiquetas.splice(this.frm_etiquetas.indexOf(tag), 1);
      },

      showInput() {
        console.log('sw_input')
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        console.log('hd_icnf')
        let inputValue = this.inputValue;
        if (inputValue) {
          console.log('iv'+inputValue)
          this.frm_etiquetas.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },


      cleanForm () {
        console.log('cl_frm')
        this.frm_titulo='';
        this.frm_descripcion='';
        this.frm_estimado='';
        this.frm_prioridad=200;
        this.frm_pausable=false;
        this.frm_etiquetas=[]
        this.id = '';
      },

    },

    mounted() {
      console.log('mounted')
      this.tagRecomendations = this.loadTags();
    },

    components: {
      ButtonGroup,
      Navbar,
      Task,
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
    background: whitesmoke;
    padding: 0;
    margin:  0;
    height: 100%;
    width:  100%;
  }

  div.wn-task-container {
    margin-top: 3px;

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
    font-size: 12px;
    text-align: left;
    width: 20px;
    float: right;
    margin:    0;
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

</style>
