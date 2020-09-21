const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

//Hashing the plane password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

// Generate Auth token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
const User = mongoose.model('User',userSchema)
module.exports = User