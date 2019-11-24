const router = require('express').Router()
const commentController = require('../controllers/commentController')
const auth = require('../middleware/authMiddleware').authMiddleware

router.post("/createComment", auth, commentController.createComment)

router.get('/viewComments', commentController.viewComments)

router.get('/adminViewComments', auth, commentController.adminViewComments)

router.put('/adminApprovedComment/:id', auth, commentController.adminApproveComments)

router.put('/adminDeleteComment/:id', auth, commentController.adminDeleteComment)

module.exports = router