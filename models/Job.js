const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:text,
        required:true,
        unique:true
    },
    numberOfDevs:{
        type:Number,
        required:true,
     },
     startOn:{
         type:Date,
         required:true,
     },
     endOn:{
         type:Date,
         required:true
     },
     budget:{
         type:Number,
         required:true
     },
     timestamps:true,
})

const Job = mongoose.model('Job', jobSchema)
module.exports = Job