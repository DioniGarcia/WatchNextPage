<template>
    <div id="gOperarios">
      <Navbar />

      <div class="wn-col col-pendientes">
        <div class="wn-col-title">Lista Operarios
          <button v-b-modal.modal-new-worker class="wn-menu-btn">Nuevo operario</button>
        </div>

        <div v-for="operario in operarios" v-bind:key="operario.id" class="wn-task-container">
          <div class="wn-task-data">
            <h3>ID: {{operario.id}}</h3>
            <p>Nombre:  {{operario.nombre}} </p>
            <p>Apellidos: {{operario.apellidos}}</p>
          </div>
          <div class="wn-btn-div">
            <button @click="deleteWorker" class="wn-menu-btn">Eliminar</button>
            <button class="wn-menu-btn">Editar</button>
          </div>
        </div>
      </div>
      <b-modal id="modal-new-worker" centered size="lg"
               ref="modal_new_worker"
               title="Añadir operario al gestor"
               @ok="createWorker"
               @shown="cleanForm">
        <form @submit.stop.prevent="handleSubmit">
          <b-form-input type="text" placeholder="Nombre " v-model="frm_nombre"></b-form-input>
          <b-form-input type="text" placeholder="Apellidos" v-model="frm_apellidos"></b-form-input>
          <b-form-input type="text" placeholder="ID " v-model="frm_id"></b-form-input>
          <b-form-input type="password" placeholder="Password"  v-model="frm_pass"></b-form-input>
        </form>
      </b-modal>
      <!-- FIN: Modal Add Tarea -->
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

        frm_nombre: '',
        frm_apellidos: '',
        frm_id: '',
        frm_pass: '',

        loading: true
      }
    },

    created() { // REFACTORIZAR
      db
        .collection('operarios')
        .orderBy('id')
        .get()
        .then(querySnapshot => {
          this.loading = false;
          querySnapshot.forEach(doc => {
            const operario = {
              nombre: doc.data().nombre,
              apellidos: doc.data().apellidos,
              id: doc.data().id,
              pass: doc.data().pass
            };
            this.operarios.push(operario);

          });
        });
    },
    components: {
      Navbar
    },
    methods: {
      createWorker (evt) {
        evt.preventDefault()
        if (!this.frm_nombre) {
          alert('El nombre no puede estar vacío')
        }
        else if (!this.frm_apellidos) {
          alert('Los apellidos no puden estar vacios')
        }
        else if (!this.frm_id) {
          alert('Se requiere un ID')
        }
        else if (isNaN(this.frm_id)) {
          alert('El ID ha de ser numérico')
        }
        else if (!this.frm_id) {
          alert('Se requiere un Password')
        }
        else if (isNaN(this.frm_id)) {
          alert('El Password ha de ser numérico')
        }
        else {
          this.persistData()
          this.handleSubmit()
        }
      },
      persistData () {
        db.collection('operarios').add({
          nombre: this.frm_nombre,
          apellidos: this.frm_apellidos,
          id: this.frm_id,
          pass: this.frm_pass
        })
          .then(docRef => {
            console.log('Operario añadido a FireBase!')
          })
          .catch(error => {
            console.error('Error añadiendo el operario!',error)
          })
      },

      handleSubmit () {
        this.operarios.push(
          { nombre: this.frm_nombre, apellidos:this.frm_apellidos, id:this.frm_id, pass:this.frm_pass}
        )
        this.$refs.modal_new_worker.hide()
      }
      ,

      cleanForm () {
        this.frm_nombre = '';
        this.frm_apellidos = '';
        this.frm_id = '';
        this.frm_pass = '';
      },
      deleteWorker () {
        if(confirm ('Estas seguro que quieres borrar el empleado?')) {
          db.collection('operarios').where('id', '==', this.$route.id).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
            })
          })
        }
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
    width: 100px;
    font-size: 12px;
    text-align: left;
    float: right;
    margin-top:    0px;
    margin-bottom: 0px;
  }

  body{
    background-image:none;
    background-color:white;
  }


</style>

