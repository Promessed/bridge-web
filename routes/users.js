const express = require('express')
const router = express.Router()
const  User = require('../models/User')

// creating a user

router.post('/', async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error) {
        res.status(400).send(error)
    }
})

//login

router.post('/login', async (req, res)=>{
  try {
      const user  = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({user,token})
  } catch (error) {
      res.status(400).send()
  }
})

module.exports = router