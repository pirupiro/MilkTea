const userAccessor = require('../accessors/user');
const ObjectId = require('mongoose').Types.ObjectId;

class UserController {
    signUp(req, res) {
        const { username, password, name, gender, phone, address } = req.body;
        const user = { username, password, name, gender, phone, address };

        userAccessor.insert(user)
            .then(user => {
                return res.status(200).json({
                    message: 'Tạo tài khoản mới thành công',
                    data: user
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500);
            });
    }

    logIn(req, res) {
        const { username, password } = req.body;

        userAccessor.getByUsername(username)
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        return res.status(200).json({
                            message: 'Đăng nhập thành công',
                            data: user
                        });
                    } else {
                        return res.status(400).json({
                            message: 'Mật khẩu không chính xác',
                        });
                    }
                } else {
                    return res.status(400).json({
                        message: 'Tài khoản không tồn tại',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500);
            });
    }

    editProfile(req, res) {
        const { password, name, gender, phone, address } = req.body;
        const user = { password, name, gender, phone, address };
        const id = ObjectId(req.params.id);

        userAccessor.update(id, user)
            .then(user => {
                if (user) {
                    return res.status(200).json({
                        message: 'Cập nhật thông tin thành công',
                        data: user
                    });
                } else {
                    return res.status(400).json({
                        message: 'Id không tồn tại',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500);
            });
    }
}

module.exports = new UserController();
