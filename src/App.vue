<template>
  <div id="app" >
    <Navbar style="height: 4vh"/>
    <div>
      <router-view style="height: 86vh" />
    </div>
  </div>
  </template>

  <script>
  export default {
    name: 'app'
  }
</script>

<style>
  @import url("//unpkg.com/element-ui/lib/theme-chalk/index.css");

  nav {
    margin-bottom:10px;
  }

  html, body {
    height: 100vh;
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
