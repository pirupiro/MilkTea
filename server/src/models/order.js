const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
    userId: ObjectId,
    name: String,
    phone: String,
    address: String,
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const OrderModel = mongoose.model('Order', OrderSchema);
module.exports = OrderModel;
