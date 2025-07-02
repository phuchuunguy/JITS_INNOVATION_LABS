
import React from 'react';
export default function ModalConfirm({ show, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={onCancel}>Hủy</Button>
          <Button onClick={onConfirm} style={{ marginLeft: '0.5rem' }}>Xác nhận</Button>
        </div>
      </div>
    </div>
  );
}
