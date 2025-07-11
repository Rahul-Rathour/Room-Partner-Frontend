import React, { useState } from 'react';
import axios from 'axios';
import StatusModal from '../components/StatusModal';

const AddUser = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('')
  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleUpload = async () => {
    try {
      if (!image || !name || !location || !price || !phone || !email) {
        setModal({ show: true, type: 'error', message: 'Please fill all fields and select an image' });
        return;
      }

      // Upload image to Cloudinary
      const ImageData = new FormData();
      ImageData.append('file', image);
      ImageData.append('upload_preset', 'r_partner');
      ImageData.append('cloud_name', 'deweyrf8v');

      // Save image on Cloudinary
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/deweyrf8v/image/upload',
        ImageData
      );

      setUrl(data.secure_url);

      const userId = localStorage.getItem('userId');
      // Send data to backend
      await axios.post('http://localhost:5000/api/partner/create-listing', {
        name: name,
        location: location,
        phone: phone,
        price: price,
        imageUrl: data.secure_url,
        email: email,
        userId: userId
      });

      setModal({ show: true, type: 'success', message: 'Room partner registered successfully!' });
      setTimeout(() => {
        setModal({ ...modal, show: false });
        setName('');
        setLocation('');
        setPrice('');
        setPhone('');
        setImage(null);
        setUrl('');
      }, 2000);
    } catch (err) {
      console.error(err);
      setModal({ show: true, type: 'error', message: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100 px-2"
      style={{
        background: 'linear-gradient(135deg, rgba(60, 61, 70, 0.8), rgba(168, 148, 158, 0.8), rgba(31, 35, 43, 0.8))',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
      <div
        className="card p-3 p-sm-4 p-md-5 w-100"
        style={{
          maxWidth: '500px',
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="text-center fw-bold mb-4 text-white" style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)' }}>
          Room Partner Registration
        </h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium text-white">Name</label>
            <input
              type="text"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label fw-medium text-white">Location</label>
            <input
              type="text"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter location"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-medium text-white">Phone</label>
            <input
              type="tel"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Enter phone number"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium text-white">Email</label>
            <input
              type="email"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter mail address"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label fw-medium text-white">Room Price (you'll pay)</label>
            <input
              type="number"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="Enter room price"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="form-label fw-medium text-white">Upload Image</label>
            <input
              type="file"
              className="form-control rounded-pill py-2 py-sm-3 shadow-sm"
              id="image"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              style={{ border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
            />
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3">
            <button
              type="button"
              onClick={handleUpload}
              className="btn btn-primary rounded-pill px-4 py-2 shadow-sm transition-transform duration-200 hover:scale-105 w-100 w-sm-auto"
            >
              Submit
            </button>
          </div>
        </form>

        {url && (
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-white">Uploaded Image:</h3>
            <img
              src={url}
              alt="Uploaded"
              className="w-full max-w-xs mx-auto mt-2 rounded-lg shadow-sm"
            />
          </div>
        )}

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

export default AddUser;