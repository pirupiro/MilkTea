const orderAccessor = require('../accessors/order');
const ObjectId = require('mongoose').Types.ObjectId;

class OrderController {
    createNewOrder(req, res) {
        const { userId, name, phone, address, details } = req.body;
        const status = 'waiting';
        let totalPrice = 0;

        details.forEach((v, i) => {
            details[i].totalPrice = details[i].unitPrice * details[i].quantity;
            totalPrice += details[i].totalPrice;
        });

        const order = { userId, name, phone, address, totalPrice, status, details };

        orderAccessor.insert(order)
            .then(order => {
                return res.status(200).json({
                    error: false,
                    message: 'Tạo mới đơn hàng thành công',
                    data: order
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    getAllOrdersByStatus(req, res) {
        const { status, userId } = req.body;

        if (userId) {
            orderAccessor.getAllByStatusWithUserId(status, userId)
                .then(orders => {
                    return res.status(200).json({
                        error: false,
                        message: 'Truy xuất danh sách đơn hàng thành công',
                        data: orders
                    });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(500).end();
                });
        } else {
            orderAccessor.getAllByStatus(status)
                .then(orders => {
                    return res.status(200).json({
                        error: false,
                        message: 'Truy xuất danh sách đơn hàng thành công',
                        data: orders
                    });
                })
                .catch(error => {
                    console.error(error);
                    return res.status(500).end();
                });
        }
    }

    getOrderDetail(req, res) {
        const id = ObjectId(req.params.id);

        orderAccessor.getById(id)
            .then(order => {
                if (order) {
                    return res.status(200).json({
                        error: false,
                        message: 'Truy xuất thông tin chi tiết đơn hàng thành công',
                        data: order
                    });
                } else {
                    return res.status(200).json({
                        error: true,
                        message: 'Đơn hàng không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    updateOrderStatus(req, res) {
        const id = ObjectId(req.params.id);
        const status = req.body.status;
        const order = { status };

        orderAccessor.updateById(id, order)
            .then(order => {
                if (order) {
                    return res.status(200).json({
                        error: false,
                        message: 'Cập nhật tình trạng đơn hàng thành công',
                        data: order
                    });
                } else {
                    return res.status(200).json({
                        error: true,
                        message: 'Đơn hàng không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }
}

module.exports = new OrderController();
