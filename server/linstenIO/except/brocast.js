//广播
function broadcast(nsp,eventName,data){
  NSPS[nsp].emit(eventName,data)
}

//广播 list
function broadcast_student_list(data){
  broadcast('student','student_list',data)
}


//广播 history
function broadcast_history(data){
  broadcast('student','history',data)
}

exports.broadcast_history = broadcast_history;
exports.broadcast_student_list = broadcast_student_list;
