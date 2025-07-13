import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusModal from '../components/StatusModal';
import axios from 'axios';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [modal, setModal] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (credentials.password.length < 5) {
      return setModal({ show: true, type: 'error', message: 'Password must be at least 5 characters long.' });
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, credentials);

      if (response.data.success) {
        setCredentials({ name: "", email: "", password: "" });
        setModal({ show: true, type: "success", message: "Registered successfully!" });

        setTimeout(() => {
          setModal({ ...modal, show: false });
          navigate('/login');
        }, 2000);
      } else {
        setModal({
          show: true,
          type: "error",
          message: response.data.message || "Enter valid credentials...",
        });
      }
    } catch (error) {
      console.error(error);
      setModal({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const change = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-gray-900 to-slate-800">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 sm:p-8">
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-6">
          <span className="text-green-400">Sign Up</span> for Room-partner
        </h2>
        {loading && (
          <div className="mb-4 text-center">
            <div className="inline-block w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-2">signing up...</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={credentials.name}
              onChange={change}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 sm:py-3 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={change}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 sm:py-3 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
            <p className="text-xs text-white/60 mt-1">We'll never share your email.</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={change}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 sm:py-3 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            />
            {credentials.password.length > 0 && credentials.password.length < 5 && (
              <p className="text-xs text-red-400 mt-1">Password must be at least 5 characters</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-6">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition transform hover:scale-105"
            >
              Sign Up
            </button>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-gray-800 font-semibold shadow-md transition transform hover:scale-105 text-center"
            >
              Already a user
            </Link>
          </div>
        </form>

        <StatusModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ ...modal, show: false })}
        />
      </div>
    </div>
  );
};

export default Signup;
