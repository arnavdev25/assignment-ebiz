const express = require('express')
const userRoute = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/auth')


userRoute.post('/signup', userController.userSignup)
userRoute.post('/login', userController.userLogin)
userRoute.post('/change/password', authMiddleware.verifyToken, userController.changePassword)
userRoute.post('/update', authMiddleware.verifyToken, userController.updateUser)


module.exports = userRoute