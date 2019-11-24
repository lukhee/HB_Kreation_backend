const mongoose = require("mongoose")//Require Mongoose

//Define a schema
var Schema = mongoose.Schema;

let commentSchema = new Schema({
   comment:{
       type: String,
       required: true
   },
   isApproved:{
       type: Boolean,
       required: false,
       default: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    } 
}, {
    timestamps: true
})

module.exports = mongoose.model('comment', commentSchema);