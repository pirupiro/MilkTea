const categoryAccessor = require('../accessors/category');
const ObjectId = require('mongoose').Types.ObjectId;

class CategoryController {
    addNewCategory(req, res) {
        const name = req.body.name;
        const category = { name };

        categoryAccessor.insert(category)
            .then(category => {
                return res.status(200).json({
                    error: false,
                    message: 'Tạo mới loại sản phẩm thành công',
                    data: category
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    geAllCategories(req, res) {
        categoryAccessor.getAll()
            .then(categories => {
                return res.status(200).json({
                    error: false,
                    message: 'Truy xuất danh sách loại sản phẩm thành công',
                    data: categories
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    editCategory(req, res) {
        const id = ObjectId(req.params.id);
        const name = req.body.name;
        const category = { name };

        categoryAccessor.updateById(id, category)
            .then(category => {
                if (category) {
                    return res.status(200).json({
                        error: false,
                        message: 'Đổi tên loại sản phẩm thành công',
                        data: category
                    });
                } else {
                    return res.status(200).json({
                        error: true,
                        message: 'Loại sản phẩm không tồn tại',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }
}

module.exports = new CategoryController();
