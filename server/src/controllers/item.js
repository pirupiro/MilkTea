const itemAccessor = require('../accessors/item');
const ObjectId = require('mongoose').Types.ObjectId;

class ItemController {
    addNewItem(req, res) {
        const { name, price, category, description } = req.body;
        const item = {
            name,
            price,
            category,
            description,
            image: req.file.path
        };

        itemAccessor.insert(item)
            .then(item => {
                return res.status(200).json({
                    error: false,
                    message: 'Thêm sản phẩm mới thành công',
                    data: item
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    getAllItems(req, res) {
        itemAccessor.getAll()
            .then(items => {
                return res.status(200).json({
                    error: false,
                    message: 'Truy xuất danh sách sản phẩm thành công',
                    data: items
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    editItem(req, res) {
        const id = ObjectId(req.params.id);
        const { name, price, category, description } = req.body;
        const item = { name, price, category, description };

        itemAccessor.updateById(id, item)
            .then(item => {
                if (item) {
                    return res.status(200).json({
                        error: false,
                        message: 'Cập nhật sản phẩm thành công',
                        data: item
                    });
                } else {
                    return res.status(200).json({
                        error: true,
                        message: 'Sản phẩm không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    deleteItem(req, res) {
        const id = ObjectId(req.params.id);

        itemAccessor.deleteById(id)
            .then(item => {
                if (item) {
                    return res.status(200).json({
                        error: false,
                        message: 'Xóa sản phẩm thành công',
                        data: item
                    });
                } else {
                    return res.status(200).json({
                        error: true,
                        message: 'Sản phẩm không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }
}

module.exports = new ItemController();
