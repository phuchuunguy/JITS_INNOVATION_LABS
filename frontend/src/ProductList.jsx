import React from 'react';

function ProductList({ products }) {
  return (
    <div>
      <h3>📦 Danh sách sản phẩm:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              backgroundColor: '#fff',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            }}
          >
            <strong>{product.name}</strong> —{' '}
            <span style={{ color: '#27ae60' }}>
              {product.price.toLocaleString()} VNĐ
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
