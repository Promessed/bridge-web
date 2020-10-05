const jwt = require('jsonwebtoken')
const Employer = require('../models/Employer')

const authEmployer = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const employer = await Employer.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!employer) {
            throw new Error()
        }
        req.token = token
        req.employer = employer
        next
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate. ' })
    }
}

module.exports = authEmployer