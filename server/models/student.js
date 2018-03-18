/* 学生model */
var Schema = require("mongoose").Schema


function getYear(){
  return new Date().getFullYear()
}

var StudentSchema = new Schema({
  _id:String, // 学生的名字
  score:{type:Number,default:0},        //积分
  year:{type:Number,default:getYear},   //哪一年参加
  retired:{type:Boolean,default:false}, //是否退休
  hidden:{type:Boolean,default:false},  //是否删除
});


StudentSchema.index({name:1,year:1})

module.exports = StudentSchema
