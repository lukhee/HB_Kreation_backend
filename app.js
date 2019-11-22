const express = require('express')
const bodyParser = require('body-parser')
const productRoute = require("./routes/poducts")
const authRoute = require("./routes/auth")
const orderRoute = require("./routes/order")
const mongooseConnection = require('./uti/db')

const app = express()
const PORT = process.env.PORT || 3030

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // parse application/json

app.use(productRoute)
app.use('/auth', authRoute)
app.use(orderRoute)

app.use((req, res, next)=>{
    let err = new Error("page not found")
    err.status = 400
    throw err   
})

app.use((error, req, res, next) => {
    if(error.status == undefined){
        res.status(500)
    }else{
        res.status(error.status)
    }
    res.json({message: error.message})
})

mongooseConnection()

app.listen(PORT, ()=>{
    console.log(`app listen at port ${PORT}`)
})