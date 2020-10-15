const request = require('supertest')
const app = require('../src/app')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
  username: 'Mike',
  email: 'mike@example.com',
  password: 'jdfhsjdfksdfskdfdfd',
  tokens: [{
      token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
  }]
}

beforeEach( async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

    test('should signup a new user', async(done)=>{
        jest.setTimeout(30000)
        const user =  await request(app).post('/users').send({
         username:'Andrew',
         email:'andrew@example.com',
         password:'hdashdahdasds'
     }).expect(201)
    done()
    },30000)

     test('should login an existing user', async(done)=>{
        jest.setTimeout(30000)
        await request(app).post('/users/login').send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
        done()
     },30000)

    //  test('should delete account for user', async (done)=> {
    //     jest.setTimeout(30000)
    //      await request(app)
    //      .delete()
    //      .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    //      .send()
    //      .expect(200)
    //      done()
    //  },30000)