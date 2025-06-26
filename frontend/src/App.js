import React, { useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (updatedProduct) => {
    const updatedList = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedList);
    setEditingProduct(null); // clear editing state
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    if (editingProduct && editingProduct.id === id) {
      setEditingProduct(null);
    }
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
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
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#34495e' }}>
        🎉 Welcome to My CMS
      </h1>

      <ProductForm
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        editingProduct={editingProduct}
      />

      <ProductList
        products={products}
        onDeleteProduct={deleteProduct}
        onEditProduct={startEditProduct}
      />
    </div>
  );
}

export default App;
