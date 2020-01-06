const adminAccessor = require('../accessors/admin');
const ObjectId = require('mongoose').Types.ObjectId;

class AdminController {
    async signUp(req, res) {
        try {
            const { username, password } = req.body;
            const adminData = { username, password };

            let admin = await adminAccessor.getByUsername(username);

            if (admin) {
                return res.status(200).json({
                    error: true,
                    message: 'Tài khoản này đã tồn tại'
                });
            } else {
                admin = await adminAccessor.insert(adminData);
                return res.status(200).json({
                    error: false,
                    message: 'Tạo tài khoản mới thành công',
                    data: admin
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).end();
        }
    }

    logIn(req, res) {
        const { username, password } = req.body;

        adminAccessor.getByUsername(username)
            .then(admin => {
                if (admin) {
                    if (admin.password === password) {
                        return res.status(200).json({
                            error: false,
                            message: 'Đăng nhập thành công',
                            data: admin
                        });
                    } else {
                        return res.status(200).json({
                            error: true,
                            message: 'Mật khẩu không chính xác',
                        });
                    }
                } else {
                    return res.status(200).json({
                        error: true,
                        message: 'Tài khoản không tồn tại',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    getAllAdmins(req, res) {
        adminAccessor.getAll()
            .then(admins => {
                return res.status(200).json({
                    error: false,
                    message: 'Truy xuất danh sách quản trị viên thành công',
                    data: admins
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }

    changePassword(req, res) {
        const id = ObjectId(req.params.id);
        const password = req.body.password;
        const admin = { password };

        adminAccessor.updateById(id, admin)
            .then(admin => {
                if (admin) {
                    return res.status(200).json({
                        error: false,
                        message: 'Đổi mật khẩu thành công',
                        data: admin
                    });
                } else {
                    return res.status(200).json({
                        error: true,
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
        const id = ObjectId(req.params.id);

        adminAccessor.deleteById(id)
            .then(admin => {
                if (admin) {
                    return res.status(200).json({
                        error: false,
                        message: 'Xóa tài khoản thành công',
                        data: admin
                    });
                } else {
                    return res.status(200).json({
                        error: true,
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
