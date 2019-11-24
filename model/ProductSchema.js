const mongoose = require("mongoose")//Require Mongoose
const User = require('./UserSchema')

//Define a schema
var Schema = mongoose.Schema;

let ProductSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    }, 
    productCreatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);