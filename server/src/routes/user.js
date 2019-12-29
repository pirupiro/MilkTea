const express = require('express');
const userController = require('../controllers/user');
const userRouter = express.Router();

userRouter.post('/users', userController.signUp);
userRouter.post('/users/login', userController.logIn);
userRouter.put('/users/:id', userController.editProfile);

module.exports = userRouter;
