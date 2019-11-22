const jwtoken = require('jsonwebtoken')

exports.authMiddleware = (req, res, next)=>{
    const header = req.get('authorization')
    // if token not found send error 402 token not found
    if(!header){
        let error = new Error("not authorized!")
        error.status = 401
        throw error
    }
    const bearer = header.split(' ');
    const token = bearer[1];
    try{
        const decoded = jwtoken.verify(token, "supersupersecrete");
        req.userID = decoded.userId;
        next();
    } catch(error){
        error.message = "user timeout or incorrect token"
        error.status = 401
        next(error)
    }
}