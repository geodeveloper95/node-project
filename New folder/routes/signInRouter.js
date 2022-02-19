const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')

route.post('/', async (req, res)=> {
    try{
        const userSign = await User.findOne({email: req.body.email})
        if(!userSign){
            throw new Error("invalid email or password")
        }

        const checkPassword = await bcrypt.compare(req.body.password, userSign.password)
        if(!checkPassword){
            throw new Error("invalid email or password")
        }

        const token = await jwt.sign({_id: req.body._id}, "secretkey")
        res.send({
            "status": "successful",
            "token": token
        })
    }catch(err){
        res.send(err.message)
    }
})

module.exports = route