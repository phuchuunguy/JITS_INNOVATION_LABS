// config/bootstrap.js
module.exports.bootstrap = async function() {
  await Product.createEach([
    { name: 'Sản phẩm A', price: 100, description: 'Mô tả A' },
    { name: 'Sản phẩm B', price: 150, description: 'Mô tả B' },
    // ... thêm các sản phẩm khác ...
  ]);
};
