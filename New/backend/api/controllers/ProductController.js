module.exports = {
  // GET /product
  find: async function (req, res) {
    try {
      const products = await Product.find().sort('id DESC');
      return res.json(products);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // POST /product
  create: async function (req, res) {
    try {
      const { name, price, description } = req.body;
      if (!name || !price) {
        return res.badRequest({ error: 'Name và price là bắt buộc.' });
      }

      const newProduct = await Product.create({ name, price, description }).fetch();
      return res.status(201).json(newProduct);
    } catch (err) {
      return res.serverError(err);
    }
  }
}