import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import StatusModal from '../components/StatusModal';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/loginuser`, credentials);

      console.log("Login response:", data);

      if (data.success && data.authToken) {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("userId", data.userId);
        setCredentials({ email: "", password: "" });

        setModal({ show: true, type: "success", message: "Login successful!" });

        setTimeout(() => {
          setModal({ show: false, type: '', message: '' });
          navigate("/listings");
        }, 2000);
      } else {
        setModal({
          show: true,
          type: "error",
          message: "Invalid credentials. Please try again."
        });

        setTimeout(() => {
          setModal({ show: false, type: '', message: '' });
        }, 2000);
      }
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        "Server error. Please try again later.";

      setModal({
        show: true,
        type: "error",
        message: message
      });

      setTimeout(() => {
        setModal({ show: false, type: '', message: '' });
      }, 3000);
    }
    finally {
      setLoading(false); // Stop loading
    }
  };


  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-green-400/70 shadow-xl rounded-xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl text-center font-bold text-white mb-6">
          <span className="text-green-400">Login to</span> Room-partner
        </h2>
        {loading && (
          <div className="mb-4 text-center">
            <div className="inline-block w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-2">Logging in...</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full rounded-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border-none shadow-inner focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            <p className="text-xs text-white/60 mt-1">We'll never share your email.</p>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full rounded-full px-4 py-2 bg-white/20 text-white placeholder-white/70 border-none shadow-inner focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-md transform transition duration-200 hover:scale-105 text-center"
                >
                  Login
                </button>

                <Link
                  to="/createuser"
                  className="w-full sm:w-auto border border-green-400 text-green-400 hover:bg-green-400 hover:text-white font-semibold px-6 py-2 rounded-full shadow-md transform transition duration-200 hover:scale-105 text-center"
                >
                  I'm a new user
                </Link>
              </div>

              <div className="sm:ml-auto text-center sm:text-right w-full sm:w-auto">
                <Link
                  to="/request-otp"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>


        </form>

        {/* Status Modal */}
        <StatusModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onClose={() => setModal({ show: false, type: '', message: '' })}
        />
      </div>
    </div>
  );
};

export default Login;
