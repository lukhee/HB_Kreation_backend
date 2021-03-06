const mongoose = require("mongoose")//Require Mongoose
const User = require('../model/UserSchema')

//Define a schema
var Schema = mongoose.Schema;

let OrderSchema = new Schema({
    products: [{
        productID: String,
        quantity: Number,
        unitPrice: Number,
    }],
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model('order', OrderSchema);