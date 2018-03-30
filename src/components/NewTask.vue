<template>
  <div id="new-task">
    <Navbar />
    <h3>Nueva Tarea</h3>
    <p>Esta opción no estará en el menú, si no en un botón en el planificador correspondiente</p>
    <div class="row">
      <form @submit.prevent="newTask" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="task_id" required>
            <label>ID Tarea</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Nombre</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label>Departamento</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dificulty" required>
            <label>Dificultad</label>
          </div>
        </div>
        <button type="submit" class="btn">Crear</button>
        <router-link to="/" class="btn grey">Cancelar</router-link>
      </form>
    </div>
  </div>
</template>

<script>

  import Navbar from './Navbar';
  import db from './firebaseInit'

  export default {
    name: 'new-task',
    components: {
      Navbar
    },
    data() {
      return {
        task_id: null,
        name: null,
        dept: null,
        dificulty: null
      }
    },
    methods: {
      newTask () {
        db.collection('tareas').add({
          task_id: this.task_id,
          name: this.name,
          dept: this.dept,
          dificulty: this.dificulty
        })
          .then(docRef => {
            console.log('Tarea añadida: ', docRef.id)
            this.$router.push('/dashboard')
          })
          .catch(error => {
            console.error('Error añadiendo tarea: ', error)
          })
      }
    }
  }
</script>
