<template>
  <div class="wn-task-data">
    <h3>
      <i v-if="this.conectado" class="conectado-icon" aria-hidden="true"></i>
      <i v-if="!this.conectado" class="desconectado-icon" aria-hidden="true"></i>
      Sr/Sra. {{this.apellidos}}

    </h3>
    <p><b>Nombre completo</b> {{this.nombre}} {{this.apellidos}}</p>
    <p><b>Id:</b> {{this.id}}</p>

    <div v-if="showMore" class="more-info">
      <p><b>Etiquetas:</b></p>
      <div class="el-tag" v-for="t in this.tags"><p>{{t}}</p></div>
    </div>

    <div class="end-line">
      <p></p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "task",

    props: [
      'id',
      'nombre',
      'apellidos',
      'tags',
      'showMore',
      'conectado'
    ]
  }
</script>

<style scoped>

  b {
    color: cadetblue;
  }

  .end-line {
    border-bottom: 3px solid white;
    width: 160%;
    margin-top: 10px;
    margin-left: -20px;
  }

  .el-tag {
    margin-top:  12px;
    padding-top: 0px;
    background: cadetblue;
  }

  .el-tag p {
    padding: 0;
    font-size: 10px;
    color: whitesmoke;
  }

  div.more-info {
    padding-left: 0;
    margin-left: 0;
    margin-top: 14px;
    border-top:  1px solid cadetblue;
    width: 120%;
  }

  .wn-task-data {
    padding-left:  0;
    padding-right: 0;
  }

  .conectado-icon {
    background: greenyellow;
    border-radius: 50px;
    padding: 0px 6px ;
    font-size: 9px;
    margin-right: 4px;
  }

  .desconectado-icon {
    background: #db5352;
    border-radius: 50px;
    padding: 0px 6px ;
    font-size: 9px;
    margin-right: 4px;
  }



</style>
