const adminAccessor = require('../accessors/admin');

class AdminController {
    async signUp(req, res) {
        try {
            const { username, password } = req.body;
            const adminData = { username, password };

            let admin = await adminAccessor.getByUsername(username);

            if (admin) {
                return res.status(400).json({
                    message: 'Tài khoản này đã tồn tại'
                });
            } else {
                admin = await adminAccessor.insert(adminData);
                return res.status(200).json({
                    message: 'Tạo tài khoản mới thành công',
                    data: admin
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).end();
        }
    }

    getAllAdmins(req, res) {
        adminAccessor.getAll()
            .then(admins => {
                return res.status(200).json({
                    message: 'Truy xuất danh sách quản trị viên thành công',
                    data: admins
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    updatePassword(req, res) {
        const id = req.params.id;
        const password = req.body.password;

        adminAccessor.updateById(id, password)
            .then(admin => {
                if (admin) {
                    return res.status(200).json({
                        message: 'Cập nhật mật khẩu thành công',
                        data: admin
                    });
                } else {
                    return res.status(400).json({
                        message: 'Tài khoản không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    deleteAccount(req, res) {
        const id = req.params.id;

        adminAccessor.deleteById(id)
            .then(admin => {
                if (admin) {
                    return res.status(200).json({
                        message: 'Cập nhật mật khẩu thành công',
                        data: admin
                    });
                } else {
                    return res.status(400).json({
                        message: 'Tài khoản không tồn tại'
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }
}

module.exports = new AdminController();
