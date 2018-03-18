import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import api from '../services/ta.js'
export default new Vuex.Store({
  state:{
    tags:[],
    authors:['raiboy','raiboy2'],
    studentList:[],
    isGet:false,
    adminLoged:false,
    adminConnected:false,
    userConnected:false,
    adminSocket:null,
    userSocket:null,
    adminToken:'',
    ylist:[],
    _syear:[],
    history:[]
  },
  getters:{
    studentList: state => state.studentList,
    ylist: state => state.ylist,
    _syear:state => state._syear,
    history:state => state.history,
    isLogin:state => !(state.adminToken.length ==0)
  },
  actions:{
    setStudentList({commit},list){
      commit('setStudentList',list)
    },
    setHistory({commit},list){
      commit('setHistory',list)
    },
    updateAdminToken({commit},token){
      commit('updateAdminToken',token)
    }
  },
  mutations:{
    setStudentList(state,list){
      state.studentList = list
      let yset =  new Set()
      for(let i=0;i<list.length;i++)
        yset.add(list[i].year)
      state.ylist = []
      yset.forEach(e=>state.ylist.push(e))
    },
    setHistory(state,list){
      state.history = list
    },
    updateAdminToken(state,token){
      state.adminToken= token
    }
  }
})
