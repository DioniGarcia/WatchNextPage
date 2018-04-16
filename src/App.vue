<template>
  <div id="app" >
    <div>
      <router-view style="height: 100vh" />
    </div>
  </div>
  </template>

<script>
  export default {
    name: 'app',

  }
</script>

<style>
  nav {
    margin-bottom:10px;
  }

  html, body {

  }

  /*
  #app{
    height: 100%;
  }*/
  /*body {
    background-image:url("assets/background.png");
    min-height:100vh;
  }*/

</style>
