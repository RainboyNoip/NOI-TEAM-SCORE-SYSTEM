var fs = require("fs")
var jwt = require('jsonwebtoken')

debug("token_key:",C.jwt_key)

module.exports = async function(req,res,next){

  let token = req.headers["token"]
  if(token === undefined){
    next({
      status:-1,
      message:"need token"
    })
  }

  debug("请求的token:",token)
  try{
    let decode = jwt.verify(token,C.jwt_key)
    req.author= decode.author
    debug("token正确:",decode)
    next()
  }
  catch(e){
    debug("token错误:",e.name)
    next({
      status:-1,
      message:e.name
    })
  }
}
