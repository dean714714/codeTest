/**
 * New node file
 */
var mongoose=require('../db').mongoose;
var schema=new mongoose.Schema({
    yonghu:String,
    xingbie:String,
    geyan:String
});
var User=mongoose.model('User',schema);
module.exports=User;