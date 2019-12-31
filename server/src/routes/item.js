const itemRouter = require('express').Router();
const itemController = require('../controllers/item');
const upload = require('../upload');

itemRouter.post('', upload.single('image'), itemController.addNewItem);
itemRouter.get('', itemController.getAllItems);
itemRouter.put('/:id', itemController.editItem);
itemRouter.delete('/:id', itemController.deleteItem);

module.exports = itemRouter;
