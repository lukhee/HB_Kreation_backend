const mongoose = require("mongoose")//Require Mongoose
const Order = require('./OrderSchema')
const bcypt = require('bcrypt');
const saltRound = 12;

//Define a schema
var Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    isAdmin: {
        type: Boolean,
        default: false
    }, 
    orderID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('user', UserSchema);