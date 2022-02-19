const jwt= require('jsonwebtoken')
const User = require('../schemas/userSchema')

const authToken = function(req, res, next){
    try{
        const getTokenFromHeader = req.header("authorization")
        if(!getTokenFromHeader){
            res.send('error to get token')
        }

        const checkToken = jwt.verify(getTokenFromHeader, 'secretkey')
        if(!checkToken){
            throw new Error("This token not match")
        }

        const getUserById = User.findById({_id : checkToken._id})

        next()
    }catch(err){
        res.statu(401).send('error happen in middleware')
    }
}

module.exports = authToken