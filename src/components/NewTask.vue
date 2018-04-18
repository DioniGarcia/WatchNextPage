<template>
  <!-- Modal Add Tarea -->

  <el-dialog
    title="Nueva tarea"
    :visible.sync=this.dialogVisible
    width="65%">

    <el-form ref="form" label-position="left" label-width="120px">

      <el-form-item label="Título:"  required >
        <el-input  type="text" v-model="frm_titulo" placeholder="Nombre de la tarea"></el-input>
      </el-form-item>

      <el-form-item label="Prioridad:" required>
        <el-select v-model="frm_prioridad" placeholder="Medio">
          <el-option
            v-for="item in prioridades"
            :key="item.value"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Descripción:" required>
        <el-input type="textarea" v-model="frm_descripcion" placeholder="Descripción de la tarea"></el-input>
      </el-form-item>

      <el-form-item label="T. estimado:"  required>
        <el-input v-model="frm_estimado" placeholder="30" style="width: 10%"></el-input>
      </el-form-item>

      <el-switch  active-text="Pausable" v-model="frm_pausable"></el-switch>

      <el-form-item label="Etiquetas:"  required>
        <el-tag
          :key="tag"
          v-for="tag in frm_etiquetas"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>

        <el-autocomplete
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          :fetch-suggestions="querySearch"
          placeholder="Nombre nueva etiqueta"
          @keyup.enter.native="handleInputConfirm"
          @select="handleSelectTag">
        </el-autocomplete>

        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nuevo tag</el-button>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="true.dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createTask">Confirm</el-button>
      </span>
  </el-dialog>
  <!-- FIN: Modal Add Tarea -->
</template>

<script>

  export default {
    name: "new-task",

    props: [
      'dialogVisible'
    ]
  }


</script>
