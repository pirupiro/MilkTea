const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category');

categoryRouter.get('', categoryController.geAllCategories);
categoryRouter.post('', categoryController.addNewCategory);
categoryRouter.put('/:id', categoryController.editCategory);

module.exports = categoryRouter;
