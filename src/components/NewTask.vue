<template>
  <div id="new-task">
    <b-btn v-on:click="show">Añadir tarea al planificador</b-btn>

    <!-- Modal Component -->
    <modal name="hello-world">
      <div>
        <h3>Añadir tarea al planificador</h3>
        <form @submit.stop.prevent="handleSubmit">
          <b-form-input type="text" placeholder="Nombre de tarea" v-model="frm_title"></b-form-input>
          <b-form-input type="text" placeholder="Tiempo estimado (en minutos)" v-model="frm_estimado"></b-form-input>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: 'new-task',
    data() {
      return {

      }
    },
    methods: {
      show () {
        this.$modal.show('hello-world');
      },
      hide () {
        this.$modal.hide('hello-world');
      }
    }
  }
</script>
