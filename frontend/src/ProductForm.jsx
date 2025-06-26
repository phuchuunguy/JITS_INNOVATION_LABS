import React, { useState, useEffect } from 'react';

function ProductForm({ onAddProduct, onUpdateProduct, editingProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Khi editingProduct thay đổi → cập nhật input
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
    } else {
      setName('');
      setPrice('');
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (editingProduct) {
      // Cập nhật
      onUpdateProduct({
        ...editingProduct,
        name,
        price: parseFloat(price),
      });
    } else {
      // Thêm mới
      onAddProduct({
        id: Date.now(),
        name,
        price: parseFloat(price),
      });
    }

    setName('');
    setPrice('');
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
