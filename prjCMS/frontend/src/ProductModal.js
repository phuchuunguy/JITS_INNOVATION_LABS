// src/ProductModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ProductModal({ show, onHide, onSave, product }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Khi edit, điền trước dữ liệu
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
    } else {
      setName('');
      setPrice('');
      setDescription('');
    }
  }, [product]);

  const handleSave = () => {
    const prodData = {
      name,
      price: parseFloat(price),
      description,
    };
    // Nếu đang sửa thì thêm id
    if (product && product.id) {
      prodData.id = product.id;
    }
    onSave(prodData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="prodName">
            <Form.Label>Tên sản phẩm</Form.Label>
            <Form.Control
              type="text" value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="prodPrice">
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="number" value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="prodDesc">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Hủy</Button>
        <Button variant="primary" onClick={handleSave}>
          {product ? 'Lưu' : 'Tạo mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
