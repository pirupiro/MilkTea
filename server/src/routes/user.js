const userRouter = require('express').Router();
const userController = require('../controllers/user');

userRouter.post('', userController.signUp);
userRouter.post('/login', userController.logIn);
userRouter.put('/:id', userController.editProfile);

module.exports = userRouter;
