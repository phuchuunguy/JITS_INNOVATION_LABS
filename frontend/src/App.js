import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = (newProduct) => {
  const isDuplicate = products.some(
    (p) =>
      p.name.trim().toLowerCase() === newProduct.name.trim().toLowerCase() &&
      p.price === newProduct.price
  );

  if (isDuplicate) {
    alert(`Sản phẩm "${newProduct.name}" với giá ${newProduct.price} VNĐ đã tồn tại.`);
    return;
  }

  setProducts([...products, newProduct]);
};


  useEffect(() => {
    fetch('http://localhost:1337/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Lỗi tải sản phẩm:', err));
  }, []);

  const updateProduct = (updatedProduct) => {
    const updatedList = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedList);
    setEditingProduct(null); 
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
