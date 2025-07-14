import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/LoginModal.css"; // Keep for the glassmorphic styles

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  // prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <>
      {/* Blur Overlay */}
      <div className="modal-blur-background" />

      {/* Modal Container */}
      <div className="login-modal fixed inset-0 flex items-center justify-center z-[1050]">
        <div className="modal-content animate-modal w-full max-w-md mx-4 sm:mx-0 p-6">
          {/* Modal Header */}
          <div className="modal-header flex justify-between items-center border-b border-white/20 mb-4">
            <h5 className="modal-title text-lg font-semibold text-white">
              Authentication Required
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body text-center text-gray-200 mb-6">
            <p>Please log in to access this feature.</p>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer flex justify-center gap-4">
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
    </>
  );
};

export default LoginModal;
