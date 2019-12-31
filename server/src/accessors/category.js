const CategoryModel = require('../models/category');

class CategoryAccessor {
    insert(category) {
        return CategoryModel.create(category);
    }

    getAll() {
        return CategoryModel.find().lean();
    }

    updateById(id, category) {
        return CategoryModel.findByIdAndUpdate(
            id,
            category,
            { new: true }
        ).lean();
    }
}

module.exports = new CategoryAccessor();
