import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        background: '#f0f4f8',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#34495e' }}>🎉 Welcome to My CMS</h1>
      <ProductForm onAddProduct={addProduct} />
      <ProductList products={products} />
    </div>
  );
}

export default App;
