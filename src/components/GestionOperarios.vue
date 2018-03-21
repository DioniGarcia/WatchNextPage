<template>
    <div id="gestionoperario">
      <Navbar />

      <h3>Gestion de Operarios</h3>
      <p>Espacio para crear la vista donde se gestionan los operarios</p>
    </div>
</template>

<script>
  import Navbar from './Navbar';
  export default {
    name: 'gestionoperario',
    data() {
      return {
      }
    },
    components: {
      Navbar
    }
  }
</script>
