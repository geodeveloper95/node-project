const express = require('express')
const route = express.Router()
const User = require('../schemas/userSchema')
const bcrypt = require('bcrypt')
const saultRound = 10
const jwt = require('jsonwebtoken')

route.post('/', async (req, res)=> {
    try{
        req.body.password = await bcrypt.hash(req.body.password, saultRound)
        const addUser = new User(req.body)
        await addUser.save()
        const token = jwt.sign({_id: addUser._id}, "password")
        res.send({
            "token": token,
            "data": addUser
        })
    }catch(err){
        res.send(err.message)
    }
})

module.exports = route