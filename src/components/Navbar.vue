
<template>
  <b-navbar toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">WatchNext</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <ul>

          <li v-if="isLoggedIn"><router-link to="/dashboard">Dashboard</router-link></li>
          <li v-if="isLoggedIn"><router-link to="/gestionoperarios">Gestion Operarios</router-link></li>

        </ul>

        <ul>
          <el-date-picker
            v-model="frm_timestamp"
            clear-icon="none"
            type="date"
            placeholder="Selecciona una fecha"
            format="yyyy/MM/dd"
            value-format="timestamp">
          </el-date-picker>
        </ul>

        <ul class="right hide-on-med-and-down">
          <li v-if="isLoggedIn"><span class="email black-text">Bienvenido: {{currentUser}}</span></li>
          <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black">Logout</button></li>
        </ul>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'navbar',
    data() {
      return {

        frm_timestamp: "",

        isLoggedIn: false,
        currentUser: false
      };
    },
    created() {
      if (firebase.auth().currentUser) {
        this.isLoggedIn = true;
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
    methods: {
      logout: function() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.push('./');
          });
      }
    }
  };
</script>

<style scoped>
  .email {
    padding-right: 10px;
  }
</style>
