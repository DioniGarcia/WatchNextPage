import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import NewTask   from '@/components/NewTask'
import EditTask  from '@/components/EditTask'
import ViewTask  from '@/components/ViewTask'
import Login     from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/task',
      name: 'new-task',
      component: NewTask
    },
    {
      path: '/task/edit/:task_id',
      name: 'edit-task',
      component: EditTask
    },
    {
      path: '/task/:task_id',
      name: 'view-task',
      component: ViewTask
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
