<template>
  <div id="dashboard">
    <!-- Modal Add Tarea -->
    <!--<b-modal id="modal-new-task" size="lg" centered  title="Añadir tarea al planificador">
      <p class="my-4">Esto es una prueba</p>
    </b-modal>
    <!-- FIN: Modal Add Tarea -->

    <div class="wn-col col-pendientes">
      <div class="wn-col-title">Tareas Pendientes
        <button v-b-modal.modal-new-task class="wn-menu-btn">Nueva tarea</button>
      </div>

      <div v-for="task in tasks_planificadas" class="wn-task-container">
        <div class="wn-task-data">
          <h3>{{task.title}}</h3>
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

    <div class="wn-col col-asignadas">
      <div class="wn-col-title">Tareas Asignadas</div>
      <div v-for="task in tasks_asignadas" class="wn-task-container">
        <div class="wn-task-data">
          <h3>{{task.title}}</h3>
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

    <div class="wn-col col-realizadas">
      <div class="wn-col-title ">Tareas Realizadas</div>
      <div v-for="task in tasks_realizadas" class="wn-task-container">
        <div class="wn-task-data">
          <h3>{{task.title}}</h3>
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
             title="Añadiendo tarea al planificador"
             @ok="createTask"
             @shown="cleanForm">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" placeholder="Nombre de tarea" v-model="frm_title"></b-form-input>
        <b-form-input type="text" placeholder="Tiempo estimado (en minutos)" v-model="frm_estimado"></b-form-input>
      </form>
    </b-modal>
    <!-- FIN: Modal Add Tarea -->
  </div>

</template>

<script>
  export default {
    name: 'dashboard',
    data() {
      return {
        tasks_planificadas: [
          { title: 'Reparar grifo',     operario:'Pablito Perez', duracion:0, estimado:10 },
          { title: 'Reparar ventana',   operario:'Juan Lopez',    duracion:0, estimado:12 },
          { title: 'Comprar bombillas', operario:'Juan Lopez',    duracion:0, estimado:20 }
        ],

        tasks_asignadas: [
          { title: 'Cambiar bombilla',     operario:'Pablito Perez', duracion:9, estimado:10 },
          { title: 'Desmontar ventana',    operario:'Juan Lopez',    duracion:23, estimado:20 }
        ],

        tasks_realizadas: [
          { title: 'Reparar grifo', operario:'Carlos Martinez', duracion:12, estimado:10 }
        ],

        frm_title: '',
        frm_estimado: ''
      }
    },
    methods: {
      createTask (evt) {
        evt.preventDefault()
        if (!this.frm_title) {
          alert('El título no puede estar vacío')
        }
        else if (!this.frm_estimado) {
          alert('El tiempo estimado no puede estar vacío')
        }
        else if (this.frm_estimado.includes(".") || isNaN(this.frm_estimado)) {
          alert('El tiempo estimado debe ser un número entero')
        }
        else {
          this.handleSubmit()
        }
      },

      handleSubmit () {
        this.tasks_planificadas.push(
          { title: this.frm_title, operario:'-', duracion:'-', estimado:this.frm_estimado}
        )
        this.$refs.modal_new_task.hide()
      },

      cleanForm () {
        this.frm_title = '';
        this.frm_estimado = '';
      }
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

</style>
