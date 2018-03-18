var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    status:0,
    message:'scyz noip team scoreSystem backend server 1.0',
    author:'rainboy'
  })
});


// 登录 成功 返回token
// 失败 返回  status:-1
router.post('/login',async function(req,res,next){
  let data = req.body
  let admin = await M['admin'].findOne({name:data.username})
  console.log(admin)
  if( admin.secret== data.secret){
    res.json({
      status:0,
      token: jwt.sign({'payload':'scyzNoipTeamSaiGao'},C.jwt_key)
    })
  }
  else 
    res.json({
      status:-1,
      message:'账号或密码不对'
    })
})

module.exports = router;
