/* 历史记录 */
var Schema = require("mongoose").Schema


function getYear(){
  return new Date().getFullYear()
}

var HistorySchema = new Schema({
  name:{type:String,ref:'student'}, //标题
  score:Number,                 //加减分值
  content:String,               //加减分原因
  time:{type:Date,default:Date.now},
  hidden:{type:Boolean,default:false},  //是否删除
});


HistorySchema.index({time:1})

module.exports = HistorySchema
