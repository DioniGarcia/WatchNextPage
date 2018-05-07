<template>

  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">WatchNext</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item class="nav-item"><router-link class="menu-item" to="/dashboard">Dashboard</router-link></b-nav-item>
        <b-nav-item class="nav-item"><router-link class="menu-item" to="/gestionoperarios">Gestion Operarios</router-link></b-nav-item>
        <b-nav-item class="nav-item"><router-link class="menu-item" to="/plantillas">Gestion Plantillas</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!--
        <div class="block">
          <el-date-picker
            class="menu-item"
            v-model="frm_timestamp"
            clear-icon="none"
            type="date"
            placeholder="Selecciona una fecha"
            format="yyyy/MM/dd"
            value-format="timestamp">
          </el-date-picker>
        </div>
        -->

        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em class="menu-item">{{currentUser}}</em>
          </template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
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

  .degradado-cool {
    background-color: red;
  }

  .menu-item {
     color: whitesmoke;
     text-decoration: none;
  }

  .menu-item:hover {
    color: whitesmoke;
    background: none;
    /*padding-top: -20px;*/
    /*margin-bottom: -5px;*/
  }

  .nav-item, .nav-item:hover {
    margin-bottom: -5px;
    margin-top: -5px;
    backface-visibility: hidden;
  }

</style>
