const express = require('express');
const cors = require('cors');
const db = require('');
const productRoutes = require('./models/routes/productRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Sync DB và chạy server
db.sequelize.sync({ force: false }).then(() => {
  console.log('✅ DB synced');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
