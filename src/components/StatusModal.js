import React from 'react';

const StatusModal = ({ show, onClose, type = "success", message }) => {
  const isSuccess = type === "success";

  const icon = isSuccess ? "✅" : "❌";
  const title = isSuccess ? "Success" : "Error";
  const defaultMsg = isSuccess ? "Operation completed successfully!" : "Something went wrong.";
  const btnClass = isSuccess ? "btn-success" : "btn-danger";
  const textClass = isSuccess ? "text-success" : "text-danger";

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center p-4">
          <div className="modal-body">
            <div className={`display-4 mb-3 ${textClass}`}>{icon}</div>
            <h5 className="modal-title mb-2">{title}</h5>
            <p className="text-muted">{message || defaultMsg}</p>
            <button className={`btn mt-3 ${btnClass}`} onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusModal;
