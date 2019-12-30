const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    image: String
});

const ItemModel = mongoose.model('Item', ItemSchema);
module.exports = ItemModel;
