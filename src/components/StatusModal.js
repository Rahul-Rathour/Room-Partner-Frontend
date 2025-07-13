import React from 'react';
import './StatusModal.css'; // Your glassmorphism CSS

const StatusModal = ({ show, onClose, type = "success", message }) => {
  if (!show) return null;

  const isSuccess = type === "success";
  const icon = isSuccess ? "✅" : "❌";
  const title = isSuccess ? "Success" : "Error";
  const defaultMsg = isSuccess
    ? "Operation completed successfully!"
    : "Something went wrong.";
  const btnClass = isSuccess ? "btn-success" : "btn-danger";
  const textClass = isSuccess ? "text-success" : "text-danger";

  return (
    <div className="status-modal-overlay">
      <div className="status-modal-box">
        <div className={`modal-icon ${textClass}`}>{icon}</div>
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message || defaultMsg}</p>
        <button className={`modal-button ${btnClass}`} onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
