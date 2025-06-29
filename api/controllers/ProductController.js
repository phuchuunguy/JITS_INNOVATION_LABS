
module.exports = {
  // GET /api/products
  find: async function (req, res) {
    const products = await Product.find();
    return res.json(products);
  },

  // POST /api/products
  create: async function (req, res) {
    const { name, price } = req.body;

    if (!name || typeof price === 'undefined') {
      return res.badRequest({ message: 'Thiếu tên hoặc giá' });
    }

    const product = await Product.create({ name, price }).fetch();
    return res.json(product);
  },

  // PUT /api/products/:id
  update: async function (req, res) {
    const id = req.params.id;
    const { name, price } = req.body;

    const updated = await Product.updateOne({ id }).set({ name, price });
    if (!updated) return res.notFound({ message: 'Không tìm thấy sản phẩm' });

    return res.json(updated);
  },

  // DELETE /api/products/:id
  delete: async function (req, res) {
    const id = req.params.id;
    const deleted = await Product.destroyOne({ id });

    if (!deleted) return res.notFound({ message: 'Không tìm thấy sản phẩm' });
    return res.json({ message: 'Đã xoá thành công' });
  },
};
