const adminRouter = require('express').Router();
const adminController = require('../controllers/admin');

adminRouter.post('', adminController.signUp);
adminRouter.post('/login', adminController.logIn);
adminRouter.get('', adminController.getAllAdmins);
adminRouter.put('/:id', adminController.changePassword);
adminRouter.delete('/:id', adminController.deleteAccount);

module.exports = adminRouter;
