const mongoose = require('mongoose')

const stackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps : true
})

const Stack = mongoose.model('Stack', stackSchema)
module.exports = Stack