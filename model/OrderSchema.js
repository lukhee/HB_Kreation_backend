const mongoose = require("mongoose")//Require Mongoose

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
        ref: 'User'
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model('order', OrderSchema);