const mongoose = require('mongoose')
const validator = require('validator')

const employerSchema = mongoose.Schema({
    username:{
        type: String,
        unique: true,
        trim:true,
        required:true
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
    organization:{
        type: String,
        unique: true,
        trim:true,
        required:true
    },
    location:{
        type: String,
        unique: true,
        trim:true,
        required:true
    },
    password:{
        type: String,
        required:true,
        minlength:8
    },
    timestamps:true

})

const Employer = mongoose.model('Employer', employerSchema)
module.exports = Employer
