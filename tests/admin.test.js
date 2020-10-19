const request = require('supertest')
const app = require('../src/app')
const Admin = require('../models/Admin')
const mongoose = require('../db/mongoose')
const jwt = require('jsonwebtoken')

const adminOneId = new mongoose.Types.ObjectId()
const adminOne = {
    _id:adminOneId,
    username:'Promesse',
    email:'promesse@example.com',
    password: 'fhdjhfjdfdfsd',
    tokens:[{
        token: jwt.sign({_id:adminOne}, process.env.JWT_SECRET)
    }]
}

beforeEach( async()=>{
    await Admin.deleteMany()
    await new Admin(adminOne).save()
})

test('should signup a new admin', async(done)=>{
    jest.setTimeout(3000)
    const admin = await request(app).post('/admins').send({
        username:'Andrew',
        email:'andrew@example.com',
        password:'hdajdhajdahd'
    }).expect(201)
    done()
},30000)