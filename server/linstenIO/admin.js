const LOGOUT       = 'LOGOUT'
const ADDSCORE     = 'ADDSCORE'     // 给学生加分
const SETSCORE     = 'SETSCORE'     //设定分数
const DEL_STUDENT  = 'DEL_STUDENT'  //删除学生
const DEL_HISTORY  = 'DEL_HISTORY'  //删除历史
const SET_STUDENT  = 'SET_STUDENT'  //修改学生信息
const ADD_STUDENT  = 'ADD_STUDENT'  //加入学生
const ADMIN_RESPONE = 'ADMIN_RESPONE'

var broadcast = require('./except/brocast.js')

function getYear(){
  return new Date().getFullYear()
}

/* 监听admin 请求*/
function admin_list (socket){
}

async function ret_list(){

  // 
  let students = await M['student'].find({hidden:false})
  broadcast.broadcast_student_list({students:students})

}


function connect(socket){

  debug('amdin socket id:',socket.id,' connected!');

  //验证token
//  socket.use(function(data){
//  })
//
  // 给学生加分
  socket.on(ADDSCORE,async function(data){ //查找与修改
    // 批量修改 data.name type is Array
    //await M['student'].update({$in:{_id:data.name}},{'$inc':{data.score}})
    debug('加分人员:',data.name)
    //await M['student'].update({_id:{$in:data.name}},{'$inc':{score:data.score}})
    for(i=0;i<data.name.length;i++)
      await M['student'].update({_id:data.name[i]},{'$inc':{score:data.score}})
    //历史
    for(let i = 0 ;i < data.name.length;i++){
      await M['history'].create({name:data.name[i],
        content:data.content,
        score:data.score,
      })
    }

    debug(ADDSCORE,' end!');

    socket.emit(ADMIN_RESPONE,{
      status:0,
      message: data.name.join(',') + ' 加分完成!'
    })
    ret_list()

  })

  //设定分值
  socket.on(SETSCORE,async function(data){

    // 批量修改 data.name type is Array
    await M['student'].update({_id:{$in:data.name}},{score:data.score})

    // 历史
    for(let i = 0 ;i < data.name.length;i++){
      await M['history'].create({name:data.name[i],
        content:data.content,
        score:data.score,
      })
    }

    debug(SETSCORE,' end!');
    // 发送一个修改成功的信息
    socket.emit(ADMIN_RESPONE,{
      status:0,
      message: data.name.join(',') + ' 修改完成!'
    })

    ret_list()
  })

  // 删除学生
  socket.on(DEL_STUDENT,async function(data){

    let student = await M['student'].update({_id:{$in:data.name}},{hidden:true})

    for(let i =0;i< data.name.length;i++){

      await M['history'].create({
        name:data.name[i],
        content:'删除学生:'+data.name[i]
      })
    }

    socket.emit(ADMIN_RESPONE,{
      status:-1,
      message: data.name.join(',') +'删除成功!'
    })

    ret_list()

  })

  //加入学生
  socket.on(ADD_STUDENT,async function(data){
    //注意不能出现同名的学生
    //
    debug("ADD_STUDENT:",data)
    let m = ''
    let student = await M['student'].find({_id:{$in:data.name}}).select('name')
    if( student.length !== 0){ // 找到学生

      for(let i = 0;i<student.length;i++)
        m += student[i]._id+','
      m = m.slice(0,-1)
      socket.emit(ADMIN_RESPONE,{
        status:-1,
        message: m + ' 这些学生名已经存在,不能同名!'
      })
    }
    else {

        for(let i =0;i<data.name.length;i++){
          await  M['student'].create({
            _id:data.name[i],
            score:data.score || 0,
            year: data.year || getYear()
          })

          await M['history'].create({
            score:data.score || 0,
            name:data.name[i],
            content:'创建选手'
          })

          m += data.name[i] +','
        }

        m = m.slice(0,-1)
        socket.emit(ADMIN_RESPONE,{
          status:0,
          message: m +' 添加成功!'
        })

      ret_list()
    }
  })

  //设定学生
  socket.on(SET_STUDENT,async function(data){
    debug("SET_STUDENT:",data)
    let m = ''
    let student = await M['student'].update({_id:{$in:data.name}},{retired:data.retired})

    //创建历史
    for(let i =0;i<data.name.length;i++){
      await M['history'].create({
        name:data.name[i],
        content:'被管理员设定退役'
      })

      m += data.name[i] +','
    }
    m = m.slice(0,-1)
    socket.emit(ADMIN_RESPONE,{
      status:0,
      message: m +'设定成功!'
    })
  })
}

function disconnect(socket){
}

module.exports = {
  connect:connect,
}
