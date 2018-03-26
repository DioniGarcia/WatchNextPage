<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  nav {
    margin-bottom:10px;
  }
  #app{
    height: 100%;
  }
  body {
    background-image:url("assets/background.png");
    min-height:100vh;
  }

</style>
