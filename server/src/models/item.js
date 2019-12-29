const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    price: Number,
    uri: String,
    category: String
});

const ItemModel = mongoose.model('Category', ItemSchema);
module.exports = ItemModel;
