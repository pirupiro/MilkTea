const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    username: String,
    password: String,
});

const AdminModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminModel;
