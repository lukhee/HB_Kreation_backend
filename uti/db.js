const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/HB_Cake'

module.exports = function MongooseConnection(){
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}).then(connect => {
        console.log("connection successful")
    })
        .catch(err => {
            err.statusCode = 500
            next(err)
        })
}