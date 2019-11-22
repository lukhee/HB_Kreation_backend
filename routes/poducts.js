const route = require("express").Router()
const auth = require('../middleware/authMiddleware').authMiddleware
const productController = require('../controllers/productController')

route.get('/products', productController.allProducts)

route.get('/product/:productID', productController.getProductById)

route.post('/createProducts', auth, productController.createProduct)

route.put('/updatedProduct/:productID', auth, productController.updateProduct)

route.post('/deleteProduct/:productID', auth, productController.deleteProduct)

module.exports = route