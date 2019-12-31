const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category');

categoryRouter.post('', categoryController.addNewCategory);
categoryRouter.get('', categoryController.geAllCategories);
categoryRouter.put('/:id', categoryController.editCategory);

module.exports = categoryRouter;
