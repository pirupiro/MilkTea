const ItemModel = require('../models/item');

class ItemAccessor {
    insert(item) {
        return ItemModel.create(item);
    }

    getAll() {
        return ItemModel.find().lean();
    }

    deleteById(id) {
        return ItemModel.findByIdAndDelete(id).lean();
    }

    updateById(id, item) {
        return ItemModel.findByIdAndUpdate(
            id,
            item,
            { new: true }
        ).lean();
    }
}

module.exports = new ItemAccessor();
