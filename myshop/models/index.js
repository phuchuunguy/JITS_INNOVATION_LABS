const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('myshop', 'root', '22042003', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Product = require('./models/product.model')(sequelize, Sequelize);

module.exports = db;
