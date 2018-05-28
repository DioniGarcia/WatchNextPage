<template>

  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand style="cursor: default">WatchNext</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item class="nav-item"><router-link class="menu-item" to="/dashboard">Dashboard</router-link></b-nav-item>
        <b-nav-item class="nav-item"><router-link class="menu-item" to="/gestionoperarios">Gestion Operarios</router-link></b-nav-item>
        <b-nav-item class="nav-item"><router-link class="menu-item" to="/plantillas">Gestion Plantillas</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

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

  .bg-info {
    /*background: linear-gradient(to bottom, #bcede9, #599693) !important;*/
    background: #81cac7; /* Old browsers */
    background: -moz-linear-gradient(top, #bcede9 0%, #81cac7 40%, #599693 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #bcede9 0%, #81cac7 40%,#599693 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #bcede9 0%, #81cac7 40%,#599693 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#bcede9', endColorstr='#599693',GradientType=0 );
  }

  em, em:hover {
    background: none !important;
  }

  .menu-item {
     color: whitesmoke;
     text-decoration: none;
  }

  nav ul a:hover {
    background-color: transparent !important;
  }

  nav ul a a:hover {
    color: white;
    background: #81cac7; /* Old browsers */
    background: -moz-linear-gradient(top, #bcede9 0%, #81cac7 40%, #5e9f9c 88%, #f4ffff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #bcede9 0%, #81cac7 40%, #5e9f9c 88%, #f4ffff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #bcede9 0%, #81cac7 40%, #5e9f9c 88%, #f4ffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter:  progid:DXImageTransform.Microsoft.gradient( startColorstr='#bcede9', endColorstr='#599693',GradientType=0 );
  }

  .nav-item, .nav-item:hover {
    margin-bottom: -5px;
    margin-top: -5px;
    backface-visibility: hidden;
  }

  .white_shadow_hover:hover {
    background: none !important;
    background: #81cac7; /* Old browsers */
    background: -moz-linear-gradient(top, #bcede9 0%, #81cac7 40%, #5e9f9c 88%, #f4ffff 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #bcede9 0%, #81cac7 40%, #5e9f9c 88%, #f4ffff 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #bcede9 0%, #81cac7 40%, #5e9f9c 88%, #f4ffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter:  progid:DXImageTransform.Microsoft.gradient( startColorstr='#bcede9', endColorstr='#599693',GradientType=0 );
  }

</style>
