const categoryAccessor = require('../accessors/category');

class CategoryController {
    addNewCategory(req, res) {
        const name = req.body.name;
        const category = { name };

        categoryAccessor.insert(category)
            .then(category => {
                return res.status(200).json({
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
        const id = req.params.id;
        const name = req.body.name;
        const category = { name };

        categoryAccessor.updateById(id, category)
            .then(category => {
                if (category) {
                    return res.status(200).json({
                        message: 'Đổi tên loại sản phẩm thành công',
                        data: category
                    });
                } else {
                    return res.status(400).json({
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
