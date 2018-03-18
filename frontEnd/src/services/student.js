import store from '../vuex/index.js'

export default {
  'student_list':function(data){
    console.log(data)
    store.dispatch('setStudentList',data.students)
  },
  'history':function(data){
    console.log(data)
    store.dispatch('setHistory',data.history)
  }
}
  
