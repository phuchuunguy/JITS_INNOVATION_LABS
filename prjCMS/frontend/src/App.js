// src/App.js
import React, { useState, useEffect } from 'react';
import ProductModal from './ProductModal';
import { Container, Table, Button, Form, Pagination } from 'react-bootstrap';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const productsPerPage = 5;

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    fetch('http://localhost:1337/product')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // quay về trang 1 khi tìm kiếm
  };

  // Lọc sản phẩm theo searchTerm (theo name và description)
  const filteredProducts = products.filter(p => {
    const term = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(term) ||
      (p.description && p.description.toLowerCase().includes(term))
    );
  });

  // Tính toán phân trang
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Sự kiện chuyển trang
  const paginate = (pageNum) => setCurrentPage(pageNum);

  // Bật/tắt Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
    } else {
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  // Xử lý lưu (create hoặc update)
  const handleSaveProduct = (product) => {
  const method = product.id ? 'PUT' : 'POST';
  const url = product.id 
    ? `http://localhost:1337/products/${product.id}` 
    : 'http://localhost:1337/products';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
  })
    .then(res => res.json())
    .then(data => {
      if (product.id) {
        setProducts(products.map(p => p.id === data.id ? data : p));
      } else {
        setProducts([data, ...products]);
      }
      setShowModal(false);
    })
    .catch(err => console.error(err));
};

  // Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
      })
      .catch(err => console.error(err));
  };

  // Render phần phân trang
  const renderPagination = (
    <Pagination className="mt-3">
      {[...Array(totalPages)].map((_, idx) => (
        <Pagination.Item
          key={idx+1}
          active={currentPage === idx+1}
          onClick={() => paginate(idx+1)}
        >
          {idx+1}
        </Pagination.Item>
      ))}
    </Pagination>
  );

  return (
    <Container className="p-3">
      <h1 className="mb-4">Quản lý Sản phẩm</h1>

      <div className="d-flex justify-content-between mb-3">
        {/* Tìm kiếm */}
        <Form.Control
          style={{ width: '300px' }}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Nút Thêm sản phẩm */}
        <Button onClick={() => { setEditingProduct(null); setShowModal(true); }}>
          Thêm sản phẩm
        </Button>

        {/* Toggle Dark Mode */}
        <Form.Switch 
          id="dark-mode-switch"
          label="Chế độ tối"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      {/* Bảng danh sách sản phẩm */}
      <Table striped bordered hover responsive variant={darkMode ? 'dark' : ''}>
        <thead>
          <tr>
            <th>#</th><th>Tên</th><th>Giá</th><th>Mô tả</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((prod, idx) => (
            <tr key={prod.id}>
              <td>{indexOfFirst + idx + 1}</td>
              <td>{prod.name}</td>
              <td>{Number(prod.price).toLocaleString('vi-VN')} VNĐ</td>
              <td>{prod.description}</td>
              <td>
                <Button size="sm" onClick={() => { setEditingProduct(prod); setShowModal(true); }}>
                  Sửa
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(prod.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Phân trang */}
      {renderPagination}

      {/* Modal Thêm/Sửa sản phẩm */}
      {showModal && (
        <ProductModal
          show={showModal}
          onHide={() => setShowModal(false)}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      )}
    </Container>
  );
}

export default App;
