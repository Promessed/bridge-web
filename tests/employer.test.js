const request = require('supertest')
const app = require('../src/app')
const Employer = require('../models/Employer')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const employerOneId = new mongoose.Types.ObjectId()
const employerOne = {
    _id: employerOneId,
    username: 'Prodiv',
      email:'prodiv@example.com',
      organization:'Octan ',
      location: 'Ukraine',
      password: 'fskdfskjdfdsdfs',
      tokens: [{
        token: jwt.sign({_id: employerOneId}, process.env.JWT_SECRET)
    }]
}


beforeEach( async()=>{
    await Employer.deleteMany()
    await new Employer(employerOne).save()
})

test('Should sign up an employer', async(done)=>{
    jest.setTimeout(30000)
    await request(app).post('/employers')
    .send({
      username: 'Andrew',
      email:'andrew@example.com',
      organization:'Octan group',
      location: 'Talin',
      password: 'fskdfskjdfdsdfs'
    }).expect(201)
    done()
}, 30000)

test('should login an existing employer', async(done)=>{
 jest.setTimeout(30000)
 await request(app).post('/employers/login').send({
   email: employerOne.email,
   password: employerOne.password
 }).expect(200)
 done()
}, 30000)