<template>
  <div id="edit-task">


      <div class="text-center">
        <div class="container">
          <div class="row">
            <div class=" col s12 m8 offset-m2">
              <div class="login card-panel cyan darken-2 white-text center">
                <h3>Autenticación Encargado</h3>
                <form action="index.html">
                  <div class="input-field">
                    <i class="material-icons prefix">email</i>
                    <input type="email" id="email" v-model="email">
                    <label class="white-text" for="email">Email</label>
                  </div>
                  <div class="input-field">
                    <i class="material-icons prefix">fingerprint</i>
                    <input type="password" id="password" v-model="password">
                    <label class="white-text" for="password">Password</label>
                  </div>
                  <button v-on:click="login" class="btn btn-large btn-extended grey lighten-4 black-text">Entrar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'login',
    data: function() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      login: function(e) {
        if (this.email == 'operario@watchnext.com') {
          alert('Acceso denegado');
        }else{
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
              user => {
                alert(`¡ Bienvenido ${user.email} !`);
                this.$router.push('/dashboard');
              },
              err => {
                alert(err.message);
              }
            );
        }
        e.preventDefault();
      }
    }
  };
</script>

<style scoped>

  div {

    /*display: flex;*/
    align-items: center;
  }
</style>

