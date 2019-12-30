const CategoryModel = require('../models/category');

class CategoryAccessor {
    insert(category) {
        return CategoryModel.create(category);
    }

    getAll() {
        return CategoryModel.find().lean();
    }
}

module.exports = new CategoryAccessor();
