<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar';
  import NewTask from './components/NewTask';
  export default {
    name: 'app',
    components: {
      Navbar,
      NewTask
    }
  }
</script>

<style>
  nav {
    margin-bottom:10px;
  }
</style>
