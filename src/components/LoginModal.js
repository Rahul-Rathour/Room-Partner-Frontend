import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/LoginModal.css"; // custom CSS

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  // prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <>
      {/* Blur Overlay */}
      <div className="modal-blur-background" />

      {/* Modal */}
      <div
        className="modal show fade login-modal"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content animate-modal">
            <div className="modal-header">
              <h5 className="modal-title">Authentication Required</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>Please log in to access this feature.</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
