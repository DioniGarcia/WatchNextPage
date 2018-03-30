// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import firebase from 'firebase';
import './components/firebaseInit';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Modal } from 'bootstrap-vue/es/components';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.use(Modal);
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    /* eslint-disable */
    app = new Vue({
      el: '#app',
      render: h => h(App),
      router,
      template: '<App/>',
      components: { App }
    });
  }
});
