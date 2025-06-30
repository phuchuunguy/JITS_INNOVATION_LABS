import React, { useState, useEffect } from 'react';

function ProductForm({ onAddProduct, onUpdateProduct, editingProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
    } else {
      setName('');
      setPrice('');
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !price) {
    alert('Vui lòng nhập đầy đủ thông tin');
    return;
  }

  try {
    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        name,
        price: parseFloat(price),
      });
    } else {
      const res = await fetch('http://localhost:1337/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
        }),
      });

      const newProduct = await res.json();
      onAddProduct(newProduct); 
    }

    setName('');
    setPrice('');
  } catch (err) {
    console.error('Lỗi khi gửi API:', err);
  }
};


  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '10px', marginRight: '10px', borderRadius: '5px' }}
      />
      <input
        type="number"
        placeholder="Giá"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: '10px', marginRight: '10px', borderRadius: '5px' }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 15px',
          backgroundColor: editingProduct ? '#f39c12' : '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {editingProduct ? 'Cập nhật' : 'Thêm'}
      </button>
    </form>
  );
}

export default ProductForm;
  