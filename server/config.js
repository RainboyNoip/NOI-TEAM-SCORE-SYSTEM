//配置
var addr = process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost'
module.exports ={
  "DB":{
    addr:"mongodb://"+addr+"/score",
    opts:{
      useMongoClient:true
    }
  },
  port:3010,//端口
  'admin_name':'rainboy',
  'admin_secret':'123456',
  "jwt_key":'mytoken'  //jwt 的key
}
