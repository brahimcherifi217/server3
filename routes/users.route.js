const express = require('express')
const userController = require('../controller/users.controller')
const route =express.Router()

route.post('/users/register', userController.register)
route.post('/users/login', userController.login)
route.get('/users/user-profile', userController.userProfile)
route.get('/doctors', userController.getDoctors)
route.post('/add-doctor', userController.addDoctor )

module.exports = route