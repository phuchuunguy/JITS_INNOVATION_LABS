const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret_cms_phuc'; 

module.exports = {
  register: async function (req, res) {
    
      const { username, password } = req.body;
      console.log('📥 Nhận đăng ký: ', username, password);

      if (!username || !password) {
        return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
      }
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Tên đăng nhập đã tồn tại' });
      }

      const hash = await bcrypt.hash(password, 10);
      console.log('🔐 Hash tạo ra: ', hash);
      const user = await User.create({ username, password: hash }).fetch();
      console.log('✅ Đã lưu user:', user);
      return res.json({ message: 'Đăng ký thành công', user });

    } catch (err) {
      console.error('Lỗi khi đăng ký:', err);
      return res.serverError(err);
    }
  },

  login: async function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Thiếu tên đăng nhập hoặc mật khẩu' });
    }

    try {
      const user = await User.findOne({ username });

      if (!user) {
        console.log('⚠️ Không tìm thấy tài khoản:', username);
        return res.status(401).json({ error: 'Tài khoản không tồn tại' });
      }

      // 🌐 In thông tin so sánh mật khẩu
      console.log('🟢 Input password:', password);
      console.log('🔐 Stored hash:', user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log('✅ Kết quả so sánh:', isMatch);
      

      if (!isMatch) {
        return res.status(401).json({ error: 'Sai mật khẩu' });
      }

      delete user.password;

      return res.json({ message: 'Đăng nhập thành công', user });

    } catch (err) {
      console.error('❌ Lỗi server khi đăng nhập:', err);
      return res.serverError(err);
    }
  }
};
