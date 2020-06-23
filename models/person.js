var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PersonSchema = new Schema({
       name : {  type: String ,  required : true }, 
       age : {type:Number} , 
       favoriteFoods : {type: [String] }
})


module.exports = mongoose.model('Person', PersonSchema);
