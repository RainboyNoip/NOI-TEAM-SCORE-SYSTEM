import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index.js'

Vue.use(Router)

import Index from '../views/Index.vue'
import List from '../views/list.vue'

import Login from '../views/login.vue'

import Admin from '../views/admin/admin.vue'
import addStudent from '../views/admin/addStudent.vue'
import studentList from '../views/admin/studentList.vue'
import setScore from '../views/admin/Score.vue'
import history from '../views/admin/history.vue'


function goInAdmin(to, from, next){
  if( store.getters.isLogin)
    next()
  else
    next({name:'Login'})
}


const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:{'name':'List'},
      children:[
        {
          path:'list',
          name:'List',
          component:List
        },
        {
          path:'history',
          name:'listhistory',
          component:history
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        login:Login
      }
    },
    {
      path: '/admin',       //后台处理
      name: 'Admin',
      redirect:{'name':'studentlist'},
      components:{
        admin:Admin
      },
      children:[
        {
          path:'studentlist',
          name:'studentlist',
          component:studentList,
          beforeEnter: goInAdmin
        },
        {
          path:'history',
          name:'history',
          component:history,
          beforeEnter: goInAdmin
        },
        {
          path:'addstudent',
          name:'addstudent',
          component:addStudent,
          beforeEnter: goInAdmin
        },
        {
          path:'setScore',
          name:'setScore',
          component:setScore,
          beforeEnter: goInAdmin
        }
      ]
    }
  ]
})

export default router
