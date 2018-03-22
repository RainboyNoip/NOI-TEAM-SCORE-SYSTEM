var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');

var md5  = require('md5')

var cors = require('cors')

var app = express();
app.use(compression())


var server = require('http').Server(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


global.debug = require('debug')('debug')
global.C = require('./config.js')
global.verifyToken = require('./verifyToken.js')

/* 建立db model */
global.M ={}
require('./models/except/index.js')

// enable all cors
if (process.env.DEBUG){
  debug("开启跨域!")
  app.use(cors())
}

//主页
app.use(express.static("../frontEnd/dist"))



/* 添加默认管理员 */
M['admin'].findOneAndUpdate({name:C.admin_name},{name:C.admin_name,secret:md5(C.admin_secret)},
  {
    upsert:true,
    setDefaultsOnInsert:true
  }
  ,function(err,doc){
    if(err)
      debug('error',err)
    else if(doc == null)
      debug("添加管理员成功!")
    else
      debug("管理员已经存在!")
  }
)

//开始监听

// namespace 
global.NSPS = {}
global.io = require('socket.io')(server)
require("./linstenIO/index.js")



app.use('/', require('./routes/index.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  if(err.status == 404)
    res.status(404);
  else
    res.status(500);
  res.json({
    status:-1,
    err:err.message
  })
});

server.listen(C.port,function(){
  debug("listen on port",C.port)
});
//module.exports = app;

