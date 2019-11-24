const router = require('express').Router()
const orderController = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware').authMiddleware

router.get("/createOrder", auth, orderController.createOrder)

router.get("/viewOrders", orderController.viewOrders)

module.exports = router