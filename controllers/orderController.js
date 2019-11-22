const Order = require("../model/OrderSchema")

exports.createOrder = (req, res, next)=>{
     let newOrder = new Order({
         products: {
            productID: "JIJBIUFBIUIUB",
            quantity: 20,
            unitPrice: 2000
         }
    })

    newOrder.save()
    .then(order=>{
        res.send("order successful")
    })
    .catch(err=>{
        res.send("error found")
    })
}

exports.allOrders = (req, res, next)=>{
    Order.find()
    .then(orders=>{
        res.send(orders)
    })
}