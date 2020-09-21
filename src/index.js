const express = require ('express')
const path = require ('path')
require('../db/mongoose')
require('dotenv').config


const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))
app.use(express.json())

const userRouter = require('../routes/users')
app.use('/users', userRouter)

app.listen(port, ()=>{
    console.log(`The server is up and running on ${port}!`)
})