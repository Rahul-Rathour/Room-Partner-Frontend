import { useEffect, useState } from "react";
import axios from "axios";

const UpdateProfile = () => {
  const token = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    imageUrl: "",
    location: "",
    price: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/my-listing/${userId}`);
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };

    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "r_partner");
    formData.append("cloud_name", "deweyrf8v");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/deweyrf8v/image/upload",
        formData
      );
      setProfile({ ...profile, imageUrl: data.secure_url });
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/update-listing/${userId}`, profile);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
  };

 return (
  <div className="max-w-3xl mx-auto px-6 py-12 mt-12 pt-16 bg-gradient-to-b from-blue-50 to-white shadow-lg rounded-xl">
    <h2 className="text-3xl font-bold text-center mb-10 text-blue-700">Update Profile</h2>

    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Name</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Phone</label>
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Location</label>
        <input
          name="location"
          value={profile.location}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Price (INR/month)</label>
        <input
          type="number"
          name="price"
          value={profile.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Upload Image */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1">Upload Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition"
        />
        {uploading && <p className="text-sm text-blue-500 mt-2">Uploading image...</p>}
      </div>

      {/* Image Preview */}
      {profile.imageUrl && (
        <div className="flex justify-center mt-4">
          <img
            src={profile.imageUrl}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border border-blue-200 shadow"
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
      >
        Update Profile
      </button>
    </form>
  </div>
);

};

export default UpdateProfile;
