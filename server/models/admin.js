/* 管理员密码 */

var Schema = require("mongoose").Schema

var AdminSchema = new Schema({
  name:String, //名字
  secret:String,    //密码
  time:{type:Date,default:Date.now},
  hidden:{type:Boolean,default:false},  //是否删除
});


AdminSchema.index({name:1})

module.exports = AdminSchema
