/* 监听学生请求 */

function connect(socket){
  debug('socket connected!')
  socket.on('disconnect',function(){
    debug('socket ',socket.id,' disconnected!')
  })

  //监听学生 请求的list
  socket.on('list',async function(){
    let students = await M['student'].find({hidden:false})
    socket.emit('student_list',{students:students})
    debug('发送list完毕,关闭socket:')
  })

  //返回历史
  socket.on('history',async function(){
    let students = await M['history'].find({hidden:false}).sort('-time')
    socket.emit('history',{history:students})
    debug('发送history完毕,关闭socket:')
  })
}

function disconnect(socket){
}

module.exports = {
  connect:connect,
}
