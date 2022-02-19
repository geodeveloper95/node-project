const express = require("express");
const { route } = require("express/lib/application");
const app = express()
const mongoose = require('mongoose')
const port = 3000;
const doctorRoutes = require('./routes/doctorRoute')
const signUpUser = require('./routes/signUpRoute')
const singInRouter = require('./routes/signUpRoute')

mongoose.connect(`mongodb://localhost:27017/vezeeta`).then(()=>{
    console.log("connected to database successfully")
}).catch(()=>{
    console.log('error to connect to database')
})

app.listen(port, ()=>{
    console.log(`this app listen on port ${port}`)
})
app.use(express.json()) // this is middleware to transfer any data to json type

app.use('/doctor', doctorRoutes)
app.use('/signup', signUpUser)
app.use('/signin', singInRouter)


app.use((req, res) => {
    res.status(404).send('error happened')
})