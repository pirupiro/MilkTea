const adminRouter = require('express').Router();
const adminController = require('../controllers/admin');

adminRouter.post('', adminController.signUp);
adminRouter.get('', adminController.getAllAdmins);
adminRouter.post('/:id', adminController.updatePassword);
adminRouter.delete('/:id', adminController.deleteAccount);

module.exports = adminRouter;
