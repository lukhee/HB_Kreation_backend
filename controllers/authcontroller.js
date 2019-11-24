const User = require('../model/UserSchema')
const bcrypt = require('bcrypt');
const jwtoken = require('jsonwebtoken')
const saltRound = 12;

exports.signUp = (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(user=>{
        if(user){
            let error = new Error("user already exist")
            error.status = 401
            throw(error)
        }
        return bcrypt.hash(req.body.password, saltRound)
    })
    .then(hashPassword=>{
        const newUser = new User({
            name: req.body.name,
            password: hashPassword,
            email: req.body.email,
            isAdmin: req.body.isAdmin
        })
        return newUser.save()
    })
    .then(user=>{
        if(!user){
            let error = new Error("no user created")
            error.statusCode= 401
            next(error)
        }
        res.json(user)
    })
    .catch(err=>{
        err.statusCode = 401
        next(err)
    })
}

exports.signIn = (req, res, next)=>{
    const password = req.body.password
    const email = req.body.email
    let validUser
    let userId
    User.findOne({email : email})
    .then(user=>{
        if(!user){
            let error = new Error("email not correct")
            error.status = 401
            throw (error)
        }
        validUser = user
        userId = validUser._id.toString()
        isAdmin = validUser.isAdmin
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual=>{
        if(!isEqual){
            const error = new Error("incorrect password, try again")
            error.status = 401
            throw error
        }
        let token = jwtoken.sign({
            userId: userId,
            email: validUser.email,
            isAdmin: validUser.isAdmin
        },
        'supersupersecrete', 
        { expiresIn: '1h' });
        res.status(201)
        res.json(token)
    })
    .catch(err=>{
        next(err)
    })
} 