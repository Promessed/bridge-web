const mongoose = require('mongoose')
const validator = require('validator')


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('The email is not valid')
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength:8
    },
    timestamps:true
})

const User = mongoose.model('User',userSchema)
module.exports = User