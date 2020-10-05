const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jw = require('jsonwebtoken')

const employerSchema = new  mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The email is not valid')
            }
        }
    },
    organization: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    location: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

// hashing the password
employerSchema.pre('save', async function (next) {
    const employer = this
    if (employerSchema.isModified('password')) {
        employer.password = await bcrypt.hash(employer.password, 8)
    }
    next()
})

// generate authtoken
employerSchema.methods.generateAuthToken = async function () {
    const employer = this
    const token = jwt.sign({ _id: employer._id.toString() }, process.env.JWT_SECRET)
    employer.tokens = employer.tokens.concat({ token })
    await employer.save()
    return token
}

// Check if the user exists
userSchema.statics.findByCredentials = async (email, password) => {
    const employer = await Employer.findOne({ email })
    if (!employer) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return employer
}

const Employer = mongoose.model('Employer', employerSchema)
module.exports = Employer
