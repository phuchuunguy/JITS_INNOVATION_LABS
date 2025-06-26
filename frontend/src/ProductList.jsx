import React from 'react';

function ProductList({ products, onDeleteProduct, onEditProduct }) {
  return (
    <div>
      <h3>📦 Danh sách sản phẩm:</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fff',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <span>
              <strong>{product.name}</strong> —{' '}
              <span style={{ color: '#27ae60' }}>
                {product.price.toLocaleString()} VNĐ
              </span>
            </span>
            <div>
              <button
                onClick={() => onEditProduct(product)}
                style={{
                  marginRight: '10px',
                  backgroundColor: '#f39c12',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '6px 10px',
                }}
              >
                Sửa
              </button>
              <button
                onClick={() => onDeleteProduct(product.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '6px 10px',
                }}
              >
                Xoá
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
