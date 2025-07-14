import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StatusModal from '../components/StatusModal'; 

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: '',
    message: '',
  });

  const navigate = useNavigate();

  const handleReset = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/reset-password`,
        formData
      );

      setModal({
        show: true,
        type: 'success',
        message: res.data.message || 'Password reset successfully!',
      });

      // Navigate after 2 seconds
      setTimeout(() => {
        setModal({ ...modal, show: false });
        navigate('/login');
      }, 2000);
    } catch (err) {
      setModal({
        show: true,
        type: 'error',
        message: err.response?.data?.message || 'Password reset failed.',
      });
    } finally {
      setLoading(false);
      setFormData({ email: '', otp: '', newPassword: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white px-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-8 shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

        {['email', 'otp', 'newPassword'].map((field, idx) => (
          <input
            key={idx}
            type={field === 'newPassword' ? 'password' : 'text'}
            placeholder={`Enter ${field}`}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            disabled={loading}
          />
        ))}

        <button
          onClick={handleReset}
          disabled={loading}
          className={`w-full py-2 rounded-lg transition font-semibold ${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>

        {/* Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center rounded-xl z-10">
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* Status Modal */}
      <StatusModal
        show={modal.show}
        onClose={() => setModal({ ...modal, show: false })}
        type={modal.type}
        message={modal.message}
      />
    </div>
  );
};

export default ResetPassword;
