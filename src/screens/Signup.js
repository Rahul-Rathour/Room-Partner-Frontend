import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StatusModal from '../components/StatusModal';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const [modal, setModal] = useState({ show: false, type: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        })
      });

      const data = await response.json();

      if (data.success) {
        setCredentials({ name: "", email: "", password: "" });
        setModal({ show: true, type: "success", message: "Registered successfully!" });
        setTimeout(() => {
          setModal({ ...modal, show: false });
          navigate('/login');
        }, 2000);
      } else {
        setModal({ show: true, type: "error", message: data.message || "Enter valid credentials..." });
      }
    } catch (error) {
      console.error(error);
      setModal({ show: true, type: "error", message: "Something went wrong. Please try again later." });
    }
  };

  const change = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100 px-2">
      <div
        className="card p-3 p-sm-4 p-md-5 w-100"
        style={{
          maxWidth: '500px',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}
      >
        <h2 className="text-center fw-bold mb-4 text-white" style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)' }}>
          Sign Up for Room-partner
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium text-white">Name</label>
            <input
              type="text"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="name"
              name="name"
              value={credentials.name}
              onChange={change}
              required
              placeholder="Enter your name"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium text-white">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="email"
              name="email"
              value={credentials.email}
              onChange={change}
              required
              placeholder="Enter your email"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
            <div id="emailHelp" className="form-text text-white-50 mt-2">We'll never share your email.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-medium text-white">Password</label>
            <input
              type="password"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="password"
              name="password"
              value={credentials.password}
              onChange={change}
              required
              placeholder="Enter your password"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary rounded-pill px-4 py-2 shadow-sm transition-transform duration-200 hover:scale-105 w-100 w-sm-auto"
            >
              Sign Up
            </button>
            <Link
              to="/login"
              className="btn btn-outline-light rounded-pill px-4 py-2 shadow-sm transition-transform duration-200 hover:scale-105 w-100 w-sm-auto"
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