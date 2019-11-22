const Order = require("../model/OrderSchema")
const User = require('../model/UserSchema')

exports.createOrder = (req, res, next)=>{
     let newOrder = new Order({
         userID: req.userID,
         products: {
            productID: "JIJBIUFBIUIUB",
            quantity: 20,
            unitPrice: 2000
         },
    })

    newOrder.save()
    .then(order=>{
        res.send(order)
    })
    .catch(err=>{
        res.send("error found")
    })
}

exports.viewOrders = (req, res, next)=>{
    Order.find()
    .then(orders=>{
        res.send(orders)
    })
    .catch(err=>{
        next(err)
    })
} 