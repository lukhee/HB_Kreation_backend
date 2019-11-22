const router = require('express').Router()
const authController =  require('../controllers/authcontroller')

router.put("/signUp", authController.signUp )

router.post("/signIn", authController.signIn)

module.exports = router