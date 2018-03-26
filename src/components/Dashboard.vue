<template>
  <div id="dashboard">
    <Navbar />

    <div class="wn-col col-pendientes">
      <div class="wn-col-title">Tareas Sin Asignar
        <button v-b-modal.modal-new-task class="wn-menu-btn">Nueva tarea</button>
      </div>

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

    <b-modal id="modal-new-task" centered size="lg"
             ref="modal_new_task"
             title="Añadir tarea al planificador"
             @ok="createTask"
             @shown="cleanForm">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="Nombre de la tarea" v-model="frm_titulo"></b-form-input>
        <b-form-input type="text" placeholder="Tiempo estimado (minutos)" v-model="frm_estimado"></b-form-input>
      </form>
    </b-modal>
    <!-- FIN: Modal Add Tarea -->
  </div>

</template>

<script>
  import Navbar from './Navbar';
  import db from './firebaseInit'

  export default {
    name: 'dashboard',
    data() {
      return {

        tasks_sin_asignar: [],
        tasks_asignadas: [],
        tasks_realizadas: [],

        // Modelo de datos del form

        frm_titulo: '',
        frm_operario: '',
        frm_duracion: '',

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
              operario: doc.operario,
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
          operario: this.frm_operario,
          titulo: this.frm_titulo,
          duracion: this.frm_duracion,
          estimado: this.frm_estimado
        })
          .then(docRef => {
            console.log('Tarea añadida a FireBase!')
          })
          .catch(error => {
            console.error('Error añadiendo la tarea!',error)
          })
      },

      handleSubmit () {
        this.tasks_sin_asignar.push(
          { titulo: this.frm_titulo, operario:this.frm_titulo, duracion:this.frm_duracion, estimado:this.frm_estimado}
        )
        this.$refs.modal_new_task.hide()
      }
      ,

      cleanForm () {
        this.frm_titulo = '';
        this.frm_estimado = '';
      }

    },
    components: {
      Navbar
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
    height: auto;
  }
  div.wn-col-title {
    background: cadetblue;
    color: white;
    font-size: 16px;
    padding-bottom: 2px;
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

   /*body{*/
     /*background-image:none;*/
     /*background-color:white;*/
   /*}*/


</style>
