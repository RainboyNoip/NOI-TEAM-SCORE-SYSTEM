var socketClient  = require('socket.io-client')
var server = require('../config.js').server
import store from '../vuex/index.js'
import student from './student.js'


export default function connect(nsp){
  let adminCon
  let userCon
  if( nsp == 'admin'){
    adminCon = socketClient(server+nsp,{
      forceNew:true,
      query:{
        token:'mytoken'
      }
    })
    adminCon.on("connect",function(){
      store.state.adminConnected = true;
      console.log('admin socket connected!');
    })
  }
  if( store.state.userConnected) return {
    adminCon,
    userCon: store.state.userSocket
  }

  userCon = socketClient.connect(server+'student')

  userCon.on("connect",function(){
    store.state.userConnected= true;
    console.log('user socket connected!');
  })


  for(let key in student){
    userCon.on(key,student[key])
  }

  userCon.emit('list')
  userCon.emit('history')
  return {
    adminCon,
    userCon
  }
}
