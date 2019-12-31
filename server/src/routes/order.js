const orderRouter = require('express').Router();
const orderController = require('../controllers/order');

orderRouter.post('', orderController.createNewOrder);
orderRouter.get('', orderController.getAllOrdersByStatus);
orderRouter.get('/:id', orderController.getOrderDetail);
orderRouter.put('/:id', orderController.updateOrderStatus);

module.exports = orderRouter;
