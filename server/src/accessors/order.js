const OrderModel = require('../models/order');

class OrderAccessor {
    insert(order) {
        return OrderModel.create(order);
    }

    getAllByStatus(status) {
        return OrderModel.find(
            { status },
            { details: -1 }
        ).lean();
    }

    getAllByStatusWithUserId(status, userId) {
        return OrderModel.find(
            { status, userId },
            { details: -1 }
        ).lean();
    }

    getById(id) {
        return OrderModel.findById(id).lean();
    }

    updateById(id, order) {
        return OrderModel.findByIdAndUpdate(
            id,
            order,
            { new: true }
        ).lean();
    }
}

module.exports = new OrderAccessor();
