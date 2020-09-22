const express = require('express')
const { __esModule } = require('validator/lib/isAlpha')
const router = express.Router()
const Job = require('../models/Job')

// Create a Job

router.post('/', async(req, res)=>{
 const job = new Job(req.body)   
 try {
     await job.save()
     res.status(201).send(job)
 } catch (error) {
     res.status(400).send(error)
 }
})

// get a single job

async function getJob(req, res, next){
let job
try {
    job = await Job.findById(req.params.id)
    if(job==null){
        res.status(400).json({message : 'cannot find job'})
    }
} catch (error) {
    res.status(500).json({message: error.message})
}
res.user = user
next()
}

// retrieving all jobs

router.get('/', async (req, res)=>{
    try {
        const jobs = await Job.find()
        res.send(jobs)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// updating a certain job

router.patch('/', getJob, async(req, res)=>{
if(req.body.title != null){
  res.job.title = req.body.title
}
if(req.body.description != null){
  res.job.description = req.body.description
}
if(req.body.numberOfDevs != null){
   res.job.numberOfDevs = req.body.numberOfDevs
}
if(req.body.startOn != null){
    res.job.startOn = req.body.startOn
}
if(req.body.endOn != null){
    res.job.endOn = req.job.endOn
}
if(req.body.budget != null){
    res.job.budget
}
try {
    const job = await res.job.save()
    res.json(job)
} catch (error) {
    res.status(500).json({message: error.message})
}
})

// delete a job

router.delete('/:id', getJob, async(req, res)=>{
    try {
        res.job.remove()
        res.json({message: 'Job successfully deleted'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})




module.exports = router