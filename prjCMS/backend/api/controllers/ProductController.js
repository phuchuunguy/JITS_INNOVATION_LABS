module.exports = {
  find: async (req, res) => {
    try {
      const products = await Product.find();
      return res.json(products);
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async (req, res) => {
    try {
      const product = await Product.findOne({ id: req.params.id });
      if (!product) return res.notFound();
      return res.json(product);
    } catch (err) {
      return res.serverError(err);
    }
  },

  create: async (req, res) => {
    try {
      const newProduct = await Product.create(req.body).fetch();
      return res.status(201).json(newProduct);
    } catch (err) {
      return res.serverError(err);
    }
  },

  update: async (req, res) => {
    try {
      const updatedProduct = await Product.updateOne({ id: req.params.id })
                                         .set(req.body);
      if (!updatedProduct) return res.notFound();
      return res.json(updatedProduct);
    } catch (err) {
      return res.serverError(err);
    }
  },

  destroy: async (req, res) => {
    try {
      const deletedProduct = await Product.destroyOne({ id: req.params.id });
      if (!deletedProduct) return res.notFound();
      return res.json({ message: 'Product deleted' });
    } catch (err) {
      return res.serverError(err);
    }
  }
};
