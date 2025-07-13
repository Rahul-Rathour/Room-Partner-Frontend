import React, { useState } from 'react';
import axios from 'axios';
import StatusModal from '../components/StatusModal';

const AddUser = () => {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState({ show: false, type: '', message: '' });

  const handleUpload = async () => {
    try {
      setLoading(true); // start loader

      if (!image || !name || !location || !price || !phone || !email) {
        setModal({ show: true, type: 'error', message: 'Please fill all fields and select an image' });
        setLoading(false); // stop loader
        return;
      }

      const ImageData = new FormData();
      ImageData.append('file', image);
      ImageData.append('upload_preset', 'r_partner');
      ImageData.append('cloud_name', 'deweyrf8v');

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/deweyrf8v/image/upload',
        ImageData
      );

      setUrl(data.secure_url);

      const userId = localStorage.getItem('userId');

      await axios.post(`${process.env.REACT_APP_BASE_URL}/partner/create-listing`, {
        name,
        location,
        phone,
        price,
        imageUrl: data.secure_url,
        email,
        userId
      });

      setModal({ show: true, type: 'success', message: 'Room partner registered successfully!' });

      setTimeout(() => {
        setModal({ ...modal, show: false });
        setName('');
        setLocation('');
        setPrice('');
        setPhone('');
        setEmail('');
        setImage(null);
        setUrl('');
      }, 2000);
    } catch (err) {
      console.error(err);
      setModal({ show: true, type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false); // stop loader
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8 pt-20 bg-gradient-to-br from-[#2c2d35] via-[#4d4d5d] to-[#1f1f2b] animate-gradient"
      style={{
        backgroundSize: '300% 300%',
        animation: 'gradientShift 15s ease infinite',
      }}
    >
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-white bg-opacity-5 backdrop-blur-lg border border-white border-opacity-20 transition-all duration-300">
        <h2 className="text-center text-3xl font-semibold text-white mb-8 tracking-wide">
          Register a Room Partner
        </h2>

        <form className="space-y-5">
          {[
            { id: 'name', label: 'Name', type: 'text', state: name, setter: setName },
            { id: 'location', label: 'Full Room Address', type: 'text', state: location, setter: setLocation },
            { id: 'phone', label: 'Phone Number', type: 'tel', state: phone, setter: setPhone },
            { id: 'email', label: 'Email Address', type: 'email', state: email, setter: setEmail },
            { id: 'price', label: "Room Price (you'll pay)", type: 'number', state: price, setter: setPrice }
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-white mb-1 font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.id}
                value={field.state}
                onChange={(e) => field.setter(e.target.value)}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </div>
          ))}

          <div>
            <label htmlFor="image" className="block text-white mb-1 font-medium">Upload Room Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className={`w-full mt-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-md'
              }`}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </form>

        {/* {url && (
          <div className="mt-6 text-center">
            <h3 className="text-white font-semibold mb-2">Uploaded Image:</h3>
            <img src={url} alt="Uploaded" className="mx-auto max-w-xs rounded-xl shadow-md border border-white border-opacity-10" />
          </div>
        )} */}

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
