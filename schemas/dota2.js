var mongoose = require('mongoose')

var Dota2Schema = new mongoose.Schema({
    hero:String,
    gold:Number,
    kill:Number,
    die:Number,
})


module.exports = Dota2Schema