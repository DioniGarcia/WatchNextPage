<template>
    <div id="gOperarios">
      <Navbar />

      <div class="wn-col col-pendientes">
        <div class="wn-col-title">Lista Operarios
          <button @click="dialogVisible = true" class="wn-menu-btn">Crear nuevo</button>
        </div>

        <div class="wn-col-container">
          <div v-for="operario in operarios" v-bind:key="operario.id" class="wn-task-container">
          <div class="wn-task-data">
            <h3>ID: {{operario.id}} </h3>
            <p>Nombre:  {{operario.nombre}} </p>
            <p>Apellidos: {{operario.apellidos}}</p>
          </div>
          <div class="wn-btn-div">
            <button @click="deleteWorker(operario.id)" class="wn-menu-btn">Eliminar</button>
            <button @click="fillData(operario.id), dialogEditVisible = true" class="wn-menu-btn" data-id="123">Editar</button>
          </div>
        </div>

        </div>
      </div>
      <!-- Modal NUEVO Operario -->
      <el-dialog
        title="Alta nuevo operario"
        :visible.sync="dialogVisible"
        width="65%">

        <el-form ref="modal_new_worker" :model="form" label-position="left" label-width="120px">
          <el-form-item label="Nombre:"  required >
            <el-input  type="text" v-model="frm_nombre" placeholder="Nombre del operario"></el-input>
          </el-form-item>
          <el-form-item label="Apellidos:"  required >
            <el-input  type="text" v-model="frm_apellidos" placeholder="Apellidos del operario"></el-input>
          </el-form-item>
          <el-form-item label="Contraseña:"  required >
            <el-input  type="password" v-model="frm_pass" placeholder="123456"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="createWorker">Crear</el-button>
        </span>
      </el-dialog>
      <!-- FIN: Modal NUEVO Operario-->

      <!-- Modal EDITAR Operario-->
      <el-dialog
        title="Editar operario"
        :visible.sync="dialogEditVisible"
        width="65%">

        <el-form ref="modal_edit_worker" :model="form" label-position="left" label-width="120px">
          <el-form-item label="Nombre:"  required >
            <el-input  type="text" v-model="ed_nombre" placeholder="Nombre del operario"></el-input>
          </el-form-item>
          <el-form-item label="Apellidos:"  required >
            <el-input  type="text" v-model="ed_apellidos" placeholder="Apellidos del operario"></el-input>
          </el-form-item>
          <el-form-item label="Contraseña:"  required >
            <el-input  type="password" v-model="ed_pass" placeholder="123456"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="editWorker">Guardar</el-button>
        </span>
      </el-dialog>
      <!-- FIN: Modal EDITAR Operario-->

    </div>
</template>

<script>
  import Navbar from './Navbar';
  import db from './firebaseInit'

  export default {
    name: 'gOperarios',
    data() {
      return {

        operarios: [],

        //Form crear
        frm_nombre: '',
        frm_apellidos: '',
        frm_pass: '',
        frm_id:'',

        //Form editar
        ed_nombre: '',
        ed_apellidos: '',
        ed_pass: '',
        ed_id: '',

        id:'',

        dialogVisible: false,
        dialogEditVisible: false,
        loading: true
      }
    },


    // RELLENAR EL ARRAY DE OPERARIOS CON LOS DATOS DE FIREBASE
    created() {
      db
        .collection('operarios')
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const operario = {
              nombre: doc.data().nombre,
              apellidos: doc.data().apellidos,
              pass: doc.data().pass,
              id: doc.id // El autoincrement de FB
            };
            this.operarios.push(operario);
          });
        });
    },
    components: {
      Navbar
    },

    methods: {

      createWorker(evt) {
        evt.preventDefault()
        if (!this.frm_nombre) {
          alert('El nombre no puede estar vacío')
        }
        else if (!this.frm_apellidos) {
          alert('Los apellidos no puden estar vacios')
        }
        else if (!this.frm_pass) {
          alert('Se requiere un Password')
        }
        else if (isNaN(this.frm_pass)) {
          alert('El Password ha de ser numérico')
        }
        else {
          this.dialogVisible = false;
          this.persistData()
        }
      },

      fillData(id){
        console.log(id)
        var opRef = db.collection("operarios").doc(id.toString());

        opRef.get()
          .then(doc => {
            this.ed_nombre = doc.data().nombre;
            this.ed_apellidos = doc.data().apellidos;
            this.ed_pass = doc.data().pass;
            this.ed_id = id;

        }).catch(function(error) {
          console.log("Error gettings document:", error);
        });
      },


      editWorker(evt){
        evt.preventDefault()
        console.log('thisid_ed_work->'+this.id+'<-')
        if (!this.ed_nombre) {
          alert('El nombre no puede estar vacío')
        }
        else if (!this.ed_apellidos) {
          alert('Los apellidos no pueden estar vacios')
        }
        else if (!this.ed_pass) {
          alert('Se requiere un Password')
        }
        else if (isNaN(this.ed_pass)) {
          alert('El Password ha de ser numérico')
        }
        else {
          this.dialogEditVisible = false;

          this.updateEmployee(this.ed_id)
          this.handleEdit(this.ed_id)
        }
      },

      persistData() {

        var autRef = db.collection('autoIncrems').doc('operarios');
        var transaction = db.runTransaction( async t => {
          return t.get(autRef)
            .then(doc => {

              var newOp = doc.data().operarios + 1;
              this.id = newOp;
              db.collection('operarios').doc(newOp.toString()).set({

                nombre: this.frm_nombre,
                apellidos: this.frm_apellidos,
                pass: this.frm_pass,
                id: newOp

              })
                .then(docRef => {
                  console.log('Operario añadido a FireBase!')
                })
                .catch(error => {
                  console.error('Error añadiendo el operario!', error)
                });
              t.update(autRef, {operarios: newOp});
            })
        }).then(() => {
          this.handleSubmit()
        })
      },

      handleSubmit() {
        this.operarios.push(
          {nombre: this.frm_nombre, apellidos: this.frm_apellidos, pass: this.frm_pass, id:this.id}
        );
        this.cleanForm();
      },

      handleEdit(id) {
        console.log('hnd_edit_id>'+id+'<')
        var i = 0;
        for(i=0;i<this.operarios.length;i++){
          if(this.operarios[i].id == id){
            this.operarios[i].nombre=this.ed_nombre;
            this.operarios[i].apellidos=this.ed_apellidos;
            this.operarios[i].pass=this.ed_pass;
          }
        }
        this.$refs.modal_edit_worker.hide()
      },

      cleanForm() {
        console.log('clean_frmdata')
        this.frm_nombre = '';
        this.frm_apellidos = '';
        this.frm_pass = '';
      },

      removeFromModel(id){
        var idx = -1;
        var i = 0;
        this.operarios.forEach(function(operario) {
          if(operario.id == id){
            idx=i;
          };
          i++;
        });
        this.operarios.splice(idx,1);
      },

      deleteWorker(id) {
        console.log('del_emp: '+id)
        if (confirm('¿Estas seguro que quieres borrar el operario con ID: '+id+' ?')) {
          db.collection('operarios').doc(id.toString()).delete().then(function() {
            console.log("Operario borrado con éxito!");
          }).catch(function(error) {
            console.error("Error borrando operario!: ", error);
          });
          this.removeFromModel(id);
        }

      },

      updateEmployee(id) {
        console.log('up_emp_id_>'+id+'<')
        var operarioRef = db.collection("operarios").doc(id.toString());

        return operarioRef.update({
          nombre: this.ed_nombre,
          apellidos: this.ed_apellidos,
          pass: this.ed_pass
        })
          .then(function() {
            console.log("Operario actualizado con éxito!");
          })
          .catch(function(error) {
            console.error("Error actualizando operario: ", error);
          });
      }
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
    height: auto;
  }
  div.wn-col-title {
    background: cadetblue;
    color: white;
    font-size: 16px;
    padding-bottom: 2px;
  }
  div.wn-task-container {
    margin-top: 3px;
    background: whitesmoke;
    height: 80px;
  }
  div.col-pendientes {
    border-left: none;
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
    padding-bottom: 0;
    margin-bottom:  -6px;
  }

  div.wn-btn-div {
    width: 2px;
    float: right;
  }

  button.wn-menu-btn {
    border: none;
    background: whitesmoke;
    color: cadetblue;
    font-size: 12px;
    float: right;
    width: 140px;
    margin-top:     1px;
    margin-right:  24px;
  }

  div.wn-btn-div .wn-menu-btn {
    width: 100px;
    font-size: 12px;
    text-align: left;
    float: right;
    margin-top:    0;
    margin-bottom: 0;
  }



</style>

