const itemRouter = require('express').Router();
const itemController = require('../controllers/item');
const upload = require('../upload');

itemRouter.get('', itemController.getAllItems);
itemRouter.post('', upload.single('image'), itemController.addNewItem);
itemRouter.put('/:id', itemController.editItem);
itemRouter.delete('/:id', itemController.deleteItem);

module.exports = itemRouter;
