const Order = require("../model/OrderSchema")
const User = require('../model/UserSchema')

exports.createOrder = (req, res, next)=>{
    const userID = req.userID
    let productID 
     let newOrder = new Order({
         userID: userID,
         products: {
            productID: "JIJBIUFBIUIUB",
            quantity: 20,
            unitPrice: 2000
         },
    })

    newOrder.save()
    .then(order=>{
        productID = order._id
        return User.findById(userID)
    })
    .then(user=>{
        if(!user){
            let error =  new Error("no user found in ordercontroller")
            error.status = 401
            throw error
        }
        user.orderID.push(productID)
        user.save()
        res.status(200).json(user)
    })
    .catch(err=>{
        next(err)
    })
}

exports.viewOrders = (req, res, next)=>{
    Order.find().populate("userID")
    .then(orders=>{
        res.send(orders)
    })
    .catch(err=>{
        next(err)
    })
} 