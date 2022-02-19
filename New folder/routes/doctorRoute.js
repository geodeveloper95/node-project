const express = require('express')
const route = express.Router()
const Doctor = require('../schemas/doctorSchema')
const tokenAuth = require('../middle-ware/tokenAuthorized')

// add new doctor
route.post('/',tokenAuth, async (req, res)=> {
    try{
        const addDoc = new Doctor(req.body)
        await addDoc.save()
        res.send({
            state: "success",
            data: addDoc
        })
    }catch(err){
        res.send(err.message)
    }
})

// get all doctors
route.get('/', async (req, res)=> {
    try {
        const getAllDocs = await Doctor.find()
        await res.send({
            state: "success",
            data: getAllDocs
        })
    }catch(err){
        res.send(err.message)
    }
});

// get one doctor by id
route.get('/:id', async (req, res)=> {
    try{
        const getOneDoc = await Doctor.findById(req.params.id)
        await res.send({
            state: "success",
            data: getOneDoc
        })
    }catch(err){
        res.send(err.message)
    }
})

// get doctor by id and edite its data
route.patch('/:id', tokenAuth,async (req, res)=> {
    try{
        const updateDoc = await Doctor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
            )
        if(!updateDoc){
            throw new Error("Error to update data")
        }
        await updateDoc.save()
        res.send({
            state: "data updated successfully",
            data: updateDoc
        })
    }catch(err){
        res.send(err.message)
    }
})

// get doctot by id and delete it 
route.delete('/:id', tokenAuth,async (req, res)=> {
    try{
        const deleteDoc = await Doctor.findByIdAndDelete(req.params.id)
        res.send({
            state: "doctor has deleted"
        })
    }catch(err){
        res.send(err.message)
    }
})

module.exports = route