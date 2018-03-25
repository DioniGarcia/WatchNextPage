import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import NewTask   from '@/components/NewTask'
import GestionOperarios  from '@/components/GestionOperarios'
import Login    from '@/components/Login'
import Initial from '@/components/Initial'
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/task',
      name: 'new-task',
      component: NewTask,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/gestionoperarios',
      name: 'gestionoperarios',
      component: GestionOperarios,
      meta: {
        requiresAuth: true

      }
    },
    {
      path: '/',
      name: 'initial',
      component: Initial,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    }
  ]
});

// Nav Guard
/*
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {

    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      alert(firebase.auth().currentUser);
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

*/


export default router;
