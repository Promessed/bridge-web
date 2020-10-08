const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/auth')
// creating a user

router.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

// logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.tokens != req.token
        })
        await req.user.save()
    } catch (error) {
        res.status(500).send()
    }
})

// Retrieving a single user
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            res.status(404).json({ message: 'cannot find the user' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.user = user
    next()
}

// Retrieving all user

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// updating a user
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }
    if (req.body.password != null) {
        res.user.password = req.body.password
    }
    try {
        const user = await res.user.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//delete a user
router.delete('/:id', getUser, async (req, res) => {
    try {
        res.user.remove()
        res.json({ message: 'User successfully deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router