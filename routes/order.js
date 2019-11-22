const router = require('express').Router()
const orderController = require('../controllers/orderController')

router.get("/order", orderController.createOrder)

router.get("/allOrders", orderController.allOrders)

module.exports = router