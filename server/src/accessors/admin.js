const AdminModel = require('../models/admin');

class AdminAccessor {
    insert(admin) {
        return AdminModel.create(admin);
    }

    getByUsername(username) {
        return AdminModel.findOne({ username }).lean();
    }

    deleteById(id) {
        return AdminModel.findByIdAndDelete(id).lean();
    }

    updateById(id, password) {
        return AdminModel.findByIdAndUpdate(id, { password }).lean();
    }

    getAll() {
        return AdminModel.find().lean();
    }

}

module.exports = new AdminAccessor();
