const mongoose = require('mongoose')
const { text } = require('express')

const stackSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description: {
        type: text,
        required: true,
        unique: true
    },
}, {
    timestamps = true
})

const Stack = mongoose.model('Stack', stackSchema)
module.exports = Stack