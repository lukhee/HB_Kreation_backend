const Comment = require('../model/comment')

exports.createComment = (req, res, next) => {
    const {body} = req
    let NewComment = new Comment({
        comment: body.comment,
        userID: req.userID
    })
    NewComment.save()
    .then(comment=>{
        res.status(200).json({
            message: 'comment created successfully'
        })
    })
    .catch(err=>{
        next(err)
    })
} 


// general users view approved comments route
exports.viewComments = (req, res, next)=>{
    Comment.find({ 'isApproved': true })
    .limit(10)
    // .select("comment createdAt updatedAt")
    .then(comments => {
        res.status(200).json({
            comment: comments
        })
    })
}

// admin approved comment route
exports.adminViewComments = (req, res, next)=>{
    if(!req.isAdmin){
        console.log(req.isAdmin)
        let error = new Error("for admin only")
        error.status = 402
        throw error
    }
    Comment.find().limit(10)
        .then(comments=>{
        res.status(200).json({
            comments: comments
        })
    })
}

exports.adminApproveComments = (req, res, next)=>{
     let CommentID = req.params.id
    if (!req.isAdmin) {
        console.log(req.isAdmin)
        let error = new Error("for admin only")
        error.status = 402
        throw error
    }
    Comment.findById(CommentID)
    .then(comment=>{
        comment.isApproved = true
        return comment.save()
    })
    .then(result=>{
        res.status(200).json({
            result: result
        })
    })
    .catch(err=>{
        next(err)
    })
}

exports.adminDeleteComment = (req, res, next) => {
    let CommentID = req.params.id
    if (!req.isAdmin) {
        console.log(req.isAdmin)
        let error = new Error("for admin only")
        error.status = 402
        throw error
    }
    Comment.findByIdAndDelete(CommentID)
        .then(result => {
            res.status(200).json({
                message: "comment deleted successfully"
            })
        })
        .catch(err=>{
            next(err)
        })
}

