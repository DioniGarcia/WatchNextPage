<template>
    <div class="wn-task-data">
      <h3>
        <i v-if="this.prioridad==400" class="fa fa-angle-double-up " aria-hidden="true"></i>
        <i v-if="this.prioridad==300" class="fa fa-angle-up " aria-hidden="true"></i>
        <i v-if="this.prioridad==200" class="fa fa-angle-right " aria-hidden="true"></i>
        <i v-if="this.prioridad==100" class="fa fa-angle-down" aria-hidden="true"></i>
        <i v-if="this.prioridad==0"   class="fa fa-angle-double-down" aria-hidden="true"></i>
        {{this.titulo}}
      </h3>

      <p><b>Operario:</b>  {{this.operario}}</p>
      <p>Duración: {{this.duracion}}/{{this.estimado}} min</p>

      <div v-if="showMore" class="more-info">
        <p>Id: {{this.id}}</p>
        <p>Pausable: {{this.pausable}}</p>
        <p>Descipción:  {{this.descripcion}}</p>
        <p>Etiquetas:</p>
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
          'titulo',
          'operario',
          'duracion',
          'estimado',
          'prioridad',
          'showMore',
          'descripcion',
          'pausable',
          'tags'
        ]
    }
</script>

<style scoped>

  .end-line {
    border-bottom: 3px solid white;
    width: 180%;
    margin-top: 10px;
    margin-left: -20px;
  }

  .el-tag {
    margin-top:  9px;
    padding-top: 0px;
  }

  .el-tag p {
    padding: 0;
    font-size: 10px;
  }

  div.more-info {
    padding-left: 0;
    margin-left: 0;
    margin-top: 14px;
    border-top: 1px solid cadetblue;
    width: 126%;
  }

  .wn-task-data {
    padding-left:  0;
    padding-right: 0;
  }

</style>
