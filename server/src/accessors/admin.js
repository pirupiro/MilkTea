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

    updateById(id, admin) {
        return AdminModel.findByIdAndUpdate(
            id,
            admin,
            { new: true }
        ).lean();
    }

    getAll() {
        return AdminModel.find().lean();
    }

}

module.exports = new AdminAccessor();
