var path = require('path')
var fs = require('fs')


var base= path.join(__dirname);

//调用器
function loadScoket(_path){
  let files = fs.readdirSync(_path)
  files.forEach( function(file){
    if(  file == "index.js" || file == 'except') return;

    let file_path = path.join(_path,file)
    let stat = fs.statSync(file_path)

    if( stat.isFile() && path.extname(file) == '.js'){
      let basename = path.basename(file,'.js') //文件名
      
      // namespace
      NSPS[basename] = io.of('/'+basename)
      var IO = require(file_path)

      for( key in IO){
        NSPS[basename].on(key,IO[key])
      }
    }
    else if(stat.isDirectory())
      loadScoket(file_path)
  })

  NSPS['admin'].use((socket, next) => {
    let token = socket.handshake.query.token;
    console.log('token',token)
    if( token !== 'mytoken')
      return next(new Error('authentication error'));
    return next();

  });
}

loadScoket(base)
