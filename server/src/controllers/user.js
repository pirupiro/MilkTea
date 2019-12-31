const userAccessor = require('../accessors/user');
const ObjectId = require('mongoose').Types.ObjectId;

class UserController {
    async signUp(req, res) {
        try {
            const { username, password, name, gender, phone, address } = req.body;
            const userData = { username, password, name, gender, phone, address };

            let user = await userAccessor.getByUsername(username);

            if (user) {
                return res.status(400).json({
                    message: 'Tài khoản này đã tồn tại'
                });
            } else {
                user = await userAccessor.insert(userData);
                return res.status(200).json({
                    message: 'Đăng ký tài khoản thành công',
                    data: user
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).end();
        }
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
                return res.status(500).end();
            });
    }

    editProfile(req, res) {
        const { password, name, gender, phone, address } = req.body;
        const user = { password, name, gender, phone, address };
        const id = ObjectId(req.params.id);

        userAccessor.updateById(id, user)
            .then(user => {
                if (user) {
                    return res.status(200).json({
                        message: 'Cập nhật thông tin thành công',
                        data: user
                    });
                } else {
                    return res.status(400).json({
                        message: 'Tài khoản không tồn tại',
                    });
                }
            })
            .catch(error => {
                console.error(error);
                return res.status(500).end();
            });
    }
}

module.exports = new UserController();
