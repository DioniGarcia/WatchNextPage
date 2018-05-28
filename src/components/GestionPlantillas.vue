<template>
  <div id="gOperarios">
    <Navbar />

      <div class="wn-col col-pendientes">
      <b-input-group v-if="searchVisible" class="fondo-buscador">
        <b-form inline>
          <i class="material-icons prefix">search</i>
          <b-input style="width: 300px; margin-left: 10px; margin-right: 8px" v-model="searchWord" placeholder="Buscar" />
          <i :disabled="!searchWord" @click="searchWord = ''" class="fa fa-times-circle prefix"></i>
        </b-form>
      </b-input-group>
      <div class="wn-col-title">Plantillas
        <el-button v-if="!searchVisible" @click="searchVisible = true"  class="wn-menu-btn" icon="el-icon-search">Abrir</el-button>
        <el-button v-if="searchVisible"  @click="searchVisible = false" class="wn-menu-btn" icon="el-icon-search">Cerrar</el-button>
        <el-button @click="dialogVisible = true" class="wn-menu-btn">Crear nueva</el-button>
      </div>

      <div class="wn-col-container">

        <div v-for="template in filteredTemplates" v-bind:key="template.id" class="wn-task-container">
          <Task
            :id=template.id
            :titulo=template.titulo
            :operario=template.operario
            :duracion=template.duracion
            :estimado=template.estimado
            :prioridad=template.prioridad
            :showMore=template.showMore
            :descripcion=template.descripcion
            :pausable=template.pausable
            :tags=template.tags
          />
          <div class="wn-btn-div">
            <button @click="deleteTemplate(template.id)" class="wn-menu-btn"><i class="fa fa-close " aria-hidden="true"></i></button>
            <button @click="fillData(template.id), dialogEditVisible = true" class="wn-menu-btn"><i class="fa fa-edit " aria-hidden="true"></i></button>
            <button v-if="!template.showMore" @click="template.showMore=true" class="wn-menu-btn"><i class="fa fa-eye " aria-hidden="true"></i></button>
            <button v-if="template.showMore" @click="template.showMore=false" class="wn-menu-btn"><i class="fa fa-eye-slash " aria-hidden="true"></i></button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Add Plantilla -->
    <el-dialog
      title="Nueva plantilla"
      :visible.sync="dialogVisible"
      width="65%">

      <el-form ref="form" label-position="left" label-width="120px">

        <el-form-item label="Título:"  required >
          <el-input  type="text" v-model="frm_titulo" placeholder="Nombre de la plantilla"></el-input>
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
          <el-input type="textarea" v-model="frm_descripcion" placeholder="Descripción de la plantilla"></el-input>
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
            ref="saveTagInput"
            :fetch-suggestions="querySearch"
            placeholder="Nombre nueva etiqueta"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelectTag">
          </el-autocomplete>

          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nuevo tag</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createTemplate">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- FIN: Modal Add Plantilla -->

    <!-- Modal EDIT Tarea -->
    <el-dialog
      title="Editar plantilla"
      :visible.sync="dialogEditVisible"
      width="65%">

      <el-form ref="form" label-position="left" label-width="120px">

        <el-form-item label="Título:"  required >
          <el-input  type="text" v-model="frm_titulo" placeholder="Nombre de la plantilla"></el-input>
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
            ref="saveTagInput"
            :fetch-suggestions="querySearch"
            placeholder="Nombre nueva etiqueta"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelectTag">
          </el-autocomplete>

          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ Nuevo tag</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editTemplate">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- FIN: Modal EDIT Tarea -->

  </div>
</template>

<script>
  import Navbar from './Navbar';
  import Task from './Task';
  import db from './firebaseInit';
  import ButtonGroup from "bootstrap-vue/es/components/button-group/button-group";
  import InputTag from 'vue-input-tag';

  export default {
    name: 'gTemplates',
    data() {
      return {

        dialogVisible: false,
        searchVisible: false,
        dialogEditVisible: false,

        templates: [],

        // Modelo de datos del form
        frm_operario: '',
        frm_asignable:   true,
        frm_titulo:        '',
        frm_descripcion:   '',
        frm_estimado:      '',
        frm_prioridad:    200,
        frm_pausable:   false,
        frm_etiquetas:     [],

        prioridades: [
          { value: 400, text: 'Urgente' },
          { value: 300, text: 'Alta' },
          { value: 200, text: 'Media' },
          { value: 100, text: 'Baja' },
          { value: 0,   text: 'Muy baja' },
        ],

        searchWord: '',

        tagRecomendations: [],
        inputVisible: false,
        inputValue: '',
        id:'',
        loading: true
      }
    },
    created: function () {
      db
        .collection('plantillas')
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const template = {
              id: doc.id,
              operario: doc.data().operario,
              titulo: doc.data().titulo,
              duracion: doc.data().duracion,
              estimado: doc.data().estimado,
              prioridad: doc.data().prioridad,
              descripcion: doc.data().descripcion,
              showMore: false,
              pausable: doc.data().pausable,
              tag: doc.data().tags
            };
            this.templates.push(template);

          });
        });
    }
     ,
    computed: {
      filteredTemplates: function(){
        return this.templates.filter((template) => {
          return template.titulo.toLowerCase().match(this.searchWord.toLowerCase())
        })
      }
    },
    methods: {

      querySearch(queryString, cb) {

        var tagRecomendations = this.tagRecomendations;
        var results = queryString ? tagRecomendations.filter(this.createFilter(queryString)) : tagRecomendations;
        // call callback function to return suggestions
        cb(results);
      },
      createFilter(queryString) {
        return (coso) => {
          return (coso.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelectTag(item) {
        this.handleInputConfirm();
      },
      loadTags() {
        var tags = [];

        db.collection('etiquetas').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {

            const t = {
              "value": doc.data().tag
            };
            tags.push(t);
          });
        });
        return tags;
      },

      createTemplate (evt) {
        evt.preventDefault()
        if (!this.frm_titulo) {
          alert('El título no puede estar vacío')
        }
        else if (!this.frm_estimado) {
          alert('El tiempo estimado no puede estar vacío')
        }
        else if (isNaN(this.frm_estimado)) {
          alert('El tiempo estimado debe ser un número entero')
        }
        else {
          this.dialogVisible = false;
          this.persistData()
        }
      },

      editTemplate (evt) {

        evt.preventDefault()
        if (!this.frm_titulo) {
          alert('El título no puede estar vacío')
        }
        else if (!this.frm_estimado) {
          alert('El tiempo estimado no puede estar vacío')
        }
        else if (isNaN(this.frm_estimado)) {
          alert('El tiempo estimado debe ser un número entero')
        }
        else {
          this.dialogEditVisible = false;
          this.updateTemplate(this.id)
        }
      },
      fillData(id){

        var opRef = db.collection("plantillas").doc(id.toString());

        opRef.get()
          .then(doc => {
            this.frm_operario = doc.data().operario,
              this.frm_asignable = doc.data().asignable,
              this.frm_titulo = doc.data().titulo,
              this.frm_descripcion = doc.data().descripcion,
              this.frm_estimado=  doc.data().estimado,
              this.frm_prioridad=  doc.data().prioridad,
              this.frm_pausable = doc.data().pausable,
              this.frm_etiquetas = doc.data().etiquetas,
              this.id = doc.id
          }).catch(function(error) {
          console.log("Error gettings document:", error);
        });
      },
      updateTemplate(id) {

        var tsRef = db.collection("plantillas").doc(id.toString());

        return tsRef.update({
          descripcion: this.frm_descripcion,
          estimado: parseInt(this.frm_estimado),
          etiquetas: this.frm_etiquetas,
          pausable: this.frm_pausable,
          prioridad: this.frm_prioridad,
          titulo: this.frm_titulo,

        }).then(function() {
          console.log("Plantilla actualizada con éxito!");
        }).then(() => {
          this.handleEdit(id)
        }).catch(function(error) {
          console.error("Error actualizando la plantilla: ", error);
        });
      },
      persistData () {

        var autRef = db.collection('autoIncrems').doc('plantillas');
        var transaction = db.runTransaction( async t => {
          return t.get(autRef)
            .then(doc => {

              var newTemplate = doc.data().plantillas + 1;
              this.id = newTemplate;
              db.collection('plantillas').doc(newTemplate.toString()).set({

                asignable: true,
                descripcion: this.frm_descripcion,
                estimado: parseInt(this.frm_estimado),
                etiquetas: this.frm_etiquetas,
                pausable: this.frm_pausable,
                prioridad: this.frm_prioridad,
                titulo: this.frm_titulo,
                id: newTemplate

              }).then(docRef => {
                console.log('Plantilla añadida a FireBase!')

                for (var i = 0; i < this.frm_etiquetas.length; i++) {
                  var eti = this.frm_etiquetas[i].toString();

                  this.persistTag(eti);
                }
              }).then(() => {
                this.handleSubmit()

              }).catch(error => {
                console.error('Error añadiendo la plantilla!',error)
              });
              t.update(autRef, {plantillas: newTemplate});

            })
        })

      },

      deleteTemplate(id) {

        if (confirm('¿Estas seguro que quieres borrar la plantilla con ID: ' + id + ' ?')) {
          var evalTags = [];
          var ref = db.collection('plantillas').doc(id.toString());

          return ref.get()
            .then(doc => {
              evalTags = doc.data().etiquetas;
              for (var i = 0; i < evalTags.length; i++) {
                this.decreaseTag(evalTags[i])
              }
            }).then(doc => {
              db.collection('plantillas').doc(id.toString()).delete().then(function () {
                console.log("Plantilla borrada con éxito!");
              }).catch(function (error) {
                console.error("Error borrando plantilla!: ", error);
              });

              this.removeFromModel(id);
            })
        }
      },

      removeFromModel(id){

        var idx = -1;
        var i = 0;
        this.templates.forEach(function(task) {
          if(task.id == id){
            idx=i;
          };
          i++;
        });
        this.templates.splice(idx,1);
      },

      decreaseTag(tag){

        var ref = db.collection('etiquetas').doc(tag);

        return ref.get()
          .then(doc => {
            var num = doc.data().veces;
            console.log(num)
            if(num > 1){
              ref.update({veces:num-1})
            }else{
              ref.delete().then(function() {
                console.log("Etiqueta borrada con éxito!");
              }).catch(function(error) {
                console.error("Error borrando etiqueta!: ", error);
              });
            }
          })

      },
      persistTag(tag){

        var refTag = db.collection('etiquetas').doc(tag);

        var getDoc = refTag.get().then(doc => {

          if (!doc.exists) {
            refTag.set({tag: tag, veces: 1})
              .then(docRef => {
                console.log('Nueva etiqueta añadida a FireBase!: '+tag)
                this.tagRecomendations = this.loadTags();
              })
              .catch(error => {console.error('Error añadiendo la etiqueta!: '+tag, error)});
          } else {
            var updateVeces = refTag.set({tag: tag, veces: doc.data().veces + 1})
              .then(docRef => {console.log('Etiqueta incrementada en FireBase!: '+tag)})
          }
        })
          .catch(err => {console.log('Error getting document', err);});
      },
      handleEdit(id) {

        var i = 0;
        for(i=0; i<this.templates.length; i++){

          if(this.templates[i].id == id){
            this.templates[i].titulo=this.frm_titulo;
            this.templates[i].operario=this.frm_operario;
            this.templates[i].pausable=this.frm_pausable;
            this.templates[i].prioridad=this.frm_prioridad;
            this.templates[i].estimado=this.frm_estimado;
            this.templates[i].descripcion=this.frm_descripcion;
            this.templates[i].etiquetas=this.frm_etiquetas;
          }
        }

        this.dialogEditVisible = false;
        this.cleanForm();
      },
      handleSubmit () {

        this.templates.push(
          {
            titulo: this.frm_titulo,
            operario: "N/A",
            duracion: 0,
            estimado:parseInt(this.frm_estimado),
            id: this.id
          }

        )
        this.dialogVisible = false;
        this.cleanForm();
      },

      handleClose(tag) {

        this.frm_etiquetas.splice(this.frm_etiquetas.indexOf(tag), 1);
      },

      showInput() {

        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {

        let inputValue = this.inputValue;
        if (inputValue) {

          this.frm_etiquetas.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },


      cleanForm () {

        this.frm_titulo='';
        this.frm_descripcion='';
        this.frm_estimado='';
        this.frm_prioridad=200;
        this.frm_pausable=false;
        this.frm_etiquetas=[]
        this.id = '';
      },

    },

    mounted() {
      this.tagRecomendations = this.loadTags();
    },

    components: {
      ButtonGroup,
      Navbar,
      Task,
      'bootstrap-modal': require('vue2-bootstrap-modal'),
      InputTag
    }
  }
</script>
<style>

  div.wn-col div{
    padding-left:  10px;
    padding-top:    3px;
    padding-bottom: 3px;
  }
  div.wn-col {
    width: 33.3333%;
    float: left;
    margin-top: -9px;
    border: solid 2px white;
    height: 100%;
  }
  div.wn-col-title {
    background: cadetblue;
    color: white;
    font-size: 16px;
    padding-bottom: 2px;
  }

  div.wn-col-container {
    overflow-y:scroll;
    overflow-x: hidden;
    align-content: center;
    background: whitesmoke;
    padding: 0;
    margin:  0;
    height: 600px;
    width:  100%;
  }

  div.wn-task-container {
    margin-top: 3px;

    height: 80px;
  }
  div.col-pendientes {
    border-left: none;
  }
  div.col-asignadas {
    border-left: none;
    border-right: none;
  }
  div.col-realizadas {
    border-right: none;
  }


  div.wn-task-data {
    width: 80%;
    float: left;
  }

  div.wn-task-data h3 {
    font-size:     16px;
  }

  div.wn-task-data p {
    font-size:     12px;
    padding-top:    4px;
    padding-bottom: 0px;
    margin-bottom:  -6px;
  }

  div.wn-btn-div {
    width: 2px;
    float: right;
  }

  .el-button {
    margin-top: 3px !important;
  }

  button.wn-menu-btn {
    border: none;
    background: whitesmoke;
    color: cadetblue;
    font-size: 12px;
    float: right;
    width: 140px;
    padding-top:    2px;
    padding-bottom: 2px;
    padding-left:  34px;
    padding-right: 34px;
    margin-top:     1px;
    margin-right:  24px;
  }

  div.wn-btn-div .wn-menu-btn {
    font-size: 12px;
    text-align: left;
    width: 20px;
    float: right;
    margin:    0;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .fondo-buscador {
    background-color: #66a7a4;
    border-bottom: solid 2px whitesmoke;
    padding-left: 29px !important;
  }

</style>
