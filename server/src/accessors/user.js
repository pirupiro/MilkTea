const UserModel = require('../models/user');

class UserAccessor {
    insert(user) {
        return UserModel.create(user);
    }

    getByUsername(username) {
        return UserModel.findOne({ username }).lean();
    }

    updateById(id, user) {
        return UserModel.findByIdAndUpdate(
            id,
            user,
            { new: true }
        ).lean();
    }
}

module.exports = new UserAccessor();
