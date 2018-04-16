<template>
  <body class="flex-box text-center" >
  <div class="flex-box background">
    <div class="flex-box cover-container d-flex h-100 p-3 mx-auto flex-column" >

      <div class="flex-box">

        <transition name="fade">
          <h1 class="cover-heading welcome" v-if="showTitle" v-animation>WatchNext®</h1>
        </transition>
        <transition name="lupa">
          <img v-show="showIcon" @click="handleClickIcon" class="logo reflex" src="../assets/wnLogo.png" title="Login"/>
        </transition>

        <el-dialog style="margin-top:-50px"

                   :visible.sync="showLogin"
                   width="460px"
                   :show-close="false"
                   :close-on-press-escape="false"
                   :close-on-click-modal="false"
        >
          <h1 style="margin-top:-30px; padding-bottom:30px;">Login</h1>
          <div style="height:140px; margin-left:-20px; margin-right:-20px; margin-bottom:30px; background:cadetblue">
            <img style="width:100px; height:100px; margin-top:20px;" class="logo" src="../assets/wnLogo.png" title="Login"/>
          </div>
          <el-form ref="form" :model="form" label-position="left" label-width="120px">
            <el-form-item label="Usuario:"  required >
              <el-input  type="text" v-model="email" placeholder="Usuario"></el-input>
            </el-form-item>
            <el-form-item label="Contraseña:"  required >
              <el-input  type="password" v-model="password" placeholder="Contraseña"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button class="btn-login reflex" type="primary" @click="handleLogin">Login</el-button>
          </span>
        </el-dialog>

      </div>

    </div>

  </div>
  </body>

</template>

<script>
  import firebase from 'firebase';
  export default {
    name: 'initial',
    data() {
      return {
        showIcon: true,
        showTitle: true,

        showLogin: false,

        email:'',
        password:''
      };
    },
    methods: {

      handleClickIcon: function() {
        this.showIcon=false
        this.showTitle=false
        this.showLogin=true
      },

      handleLogin: function(e) {
        if (this.email == 'operario@watchnext.com') {
          this.$notify.error({
            title: 'Error en el Login',
            message: 'Acceso denegado',
            position: 'top-left'
          });
        }else{
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(
              user => {
                alert(`¡Bienvenido ${user.email}!`);
                this.$router.push('/dashboard');
              },
              err => {
                this.$notify.error({
                  title: 'Error en el Login',
                  message: err.message,
                  position: 'top-left'
                });
              }
            );
        }
        e.preventDefault();
      }

    }
  };

</script>

<style scoped>

  .fade-enter-active {
    animation: disappear .5s;
  }
  .fade-leave-active {
    animation: disappear .5s reverse;
  }

  .lupa-enter-active {
    animation: bounce-in .5s;
  }
  .lupa-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes disappear {
    0% {
      transform: translateX(400px) scale(0);
    }
    50% {
      transform: translateX(200px) scale(0.1);
    }
    100% {
      transform: translateX(0px) scale(1);
    }
  }

  .btn-login {
    padding-left:  120px;
    padding-right: 120px;
    margin-top: -40px;
    margin-bottom: 20px;
    margin-right: 14%;
    font-size: 21px;
    border-radius: 50px;
    background: cadetblue;
  }

  .reflex:hover {
    opacity: 0.7;
    -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);
    filter: alpha(opacity=70);
    transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -webkit-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    cursor: pointer;

  }
  main, header{
    height: max-content;
  }

  img {
    transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -webkit-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    height: 250px;
    width: 250px;
  }

  div.flex-box {
    height:100vh;
    display: flex;
    align-items: center;
  }

  html {
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    background-image: url("../assets/background.png") ;
    background-position: center center;
    background-repeat:  no-repeat;
    background-attachment: fixed;
    background-size:  cover;
    background-color: #999;
  }
</style>

