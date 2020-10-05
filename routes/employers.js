const express = require('express')
const router = express.Router()
const Employer = require('../models/Employer')
const auth = require('../middleware/authEmployer')

// Create an employer

router.post('/', async (req, res) => {
    const employer = new Employer(req.body)
    try {
        await employer.save()
        res.send(employer)
    } catch (error) {
        res.status(400).send(error)
    }
})

// get a single employer

async function getEmployer(req, res, next) {
    let employer
    try {
        employer = await Employer.findById(req.params.id)
        if (employer == null) {
            return res.status(400).json({ message: 'cannot find that employer' })
        }
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
    res.employer = employer
    next()
}

// get all employers
router.get('/', async (req, res) => {
    try {
        const employers = Employer.find()
        res.status(200).send(employers)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//login

router.post('/login', async (req, res) => {
    try {
        const employer = await Employer.findByCredentials(req.body.email, req.body.password)
        const token = await employer.generateAuthToken()
        res.send({ employer, token })
    } catch (error) {
        res.status(400).send()
    }
})

// logout
router.post('/logout', auth, async (req, res) => {
    try {
        req.employer.tokens = req.employer.tokens.filter((token) => {
            return token.tokens != req.token
        })
        await req.employer.save()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router