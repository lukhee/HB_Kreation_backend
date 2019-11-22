const Product = require("../model/ProductSchema")
const User = require("../model/UserSchema")
  
exports.createProduct = (req, res, next) => {
    const { body } = req
    const createProduct = new Product({
        category: body.category,
        price: body.price,
        description: body.description,
        user: req.userID
    })
    createProduct.save()
    .then(result=>{
        res.send(result)
    })
    .catch(err=>{
        next(err)
    })
}

exports.getProductById = (req, res, next) => {
    let id = req.params.productID
    // Product.findById(id).populate("user")
    Product.findById(id)
        .then(product => {
            if(!product){
                let error = new Error("no product found")
                error.status = 404
                throw error
            }
            res.send(product)
        })
        .catch(err => {
            next(err)
        })
}

exports.allProducts = (req, res, next)=>{
    Product.find()
        .then(product => {
            res.send(product)
        })
        .catch(err => {
            next(err)
        })
}

exports.updateProduct = (req, res, next) => {
    const { body } = req
    console.log (body)
    let id = req.params.productID
    Product.findById(id)
        .then(product => {
            if(!product){
                let error = new Error("product not found")
                error.status = 404
            }
            product.price = body.price
            product.category = body.category
             return product.save()
        })
        .then(updateProduct=>{
            res.send(updateProduct)
        })
        .catch(err => {
            next(err)
        })
}

exports.deleteProduct = (req, res, next) => {
    let id = req.params.productID
    Product.findByIdAndDelete(id)
    .then(deleteProduct=>{
        if(!deleteProduct){
            let error = new Error("product not found")
            error.status = 404
           throw error
        }
        res.status(202).json({product: deleteProduct})
    })
    .catch(err=>{
        next(err)
    })
}