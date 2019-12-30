const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    totalPrice: Number,
    status: String,
    details: [
        {
            name: String,
            unitPrice: Number,
            quantity: Number,
            totalPrice: Number
        }
    ],
    phone: String,
    address: String
});

const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;
