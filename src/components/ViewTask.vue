<template>
    <div id="view-task">
      <Navbar />
      <h3>Vista Tarea</h3>
      <p>Esta opción no estará en el menú, si no al lado de la tarea</p>
    </div>
</template>

<script>
  import Navbar from './Navbar';
  export default {
    name: 'view-task',
    data() {
      return {
      }
    },
    components: {
      Navbar
    }
  }
</script>
