const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  register: async function (req, res) {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, email, password: hash }).fetch();
      return res.json(user);
    } catch (err) {
      return res.serverError(err);
    }
  },

  login: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.badRequest({ message: 'Thiếu thông tin đăng nhập' });

    if (!user) return res.status(404).json({ message: 'Email không tồn tại' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Sai mật khẩu' });

    const token = jwt.sign({ id: user.id }, 'secret-key', { expiresIn: '2h' });
    return res.json({ token, user });
  }
};
