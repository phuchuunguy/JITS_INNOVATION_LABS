module.exports.routes = {
  'GET    /products':            'ProductController.find',
  'GET    /products/:id':        'ProductController.findOne',
  'POST   /products':            'ProductController.create',
  'PUT    /products/:id':        'ProductController.update',
  'DELETE /products/:id':        'ProductController.destroy',
  'POST   /register':            'AuthController.register',
  'POST   /login':               'AuthController.login',
};