const itemAccessor = require('../accessors/item');

class ItemController {
    addNewItem(req, res) {
        const { name, price, category } = req.body;
        const item = {
            name,
            price,
            category,
            image: req.file.path
        };

        itemAccessor.insert(item)
            .then(item => {
                return res.status(200).json({
                    message: 'Thêm sản phẩm mới thành công',
                    data: item
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    deleteItem(req, res) {
        const id = req.params.id;

        itemAccessor.deleteById(id)
            .then(item => {
                if (item) {
                    return res.status(200).json({
                        message: 'Xóa sản phẩm thành công',
                        data: item
                    });
                } else {
                    return res.status(400).json({
                        message: 'Sản phẩm không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    editItem(req, res) {
        const id = req.params.id;
        const { name, price, category } = req.body;
        const item = { name, price, category };

        itemAccessor.updateById(id, item)
            .then(item => {
                if (item) {
                    return res.status(200).json({
                        message: 'Cập nhật sản phẩm thành công',
                        data: item
                    });
                } else {
                    return res.status(400).json({
                        message: 'Sản phẩm không tồn tại'
                    });
                }
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
                    message: 'Truy xuất danh sách sản phẩm thành công',
                    data: items
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }
}

module.exports = new ItemController();
