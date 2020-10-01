const Stack = require('../models/Stack')
const express = require('express')
const router = express.Router()

// create new task

router.post('/', async (req, res) => {
    const stack = new Stack(req.body)
    try {
        await stack.save()
        res.status(201).send(stack)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// get a sinle stack

async function getStack(req, res, next) {
    let Stack
    try {
        stack = await Stack.findById(req.params.id)
        if (stack == null) {
            res.status(400).json({ message: 'Cannot find that stack' })
        }
    } catch (error) {

    }
}