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
    ]
});

const OrderModel = mongoose.model('User', OrderSchema);
module.exports = OrderModel;
