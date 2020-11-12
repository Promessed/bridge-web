const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')
const auth = require('../middleware/authAdmin')

// creating an admin

router.post('/', async (req, res) => {
    const admin = new Admin(req.body)
    try {
        await admin.save()
        const token = await admin.generateAuthToken()
        res.status(201).send({ admin, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

//login

router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password)
        const token = await admin.generateAuthToken()
        res.send({ admin, token })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.admin.tokens = req.admin.tokens.filter((token) => {
            return token.tokens != req.token
        })
        await req.admin.save()
    } catch (error) {
        res.status(500).send()
    }
})
module.exports = router;