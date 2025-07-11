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

  // Fetch user listing/profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/my-listing/${userId}`); 
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
    formData.append("upload_preset", "r_partner"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "deweyrf8v");       // Replace with your Cloudinary name

    try {
      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/deweyrf8v/image/upload',
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
      await axios.put(`http://localhost:5000/api/update-listing/${userId}`, profile);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Update Profile</h2>
      <form className="col-md-6 offset-md-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" value={profile.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={profile.email} onChange={handleChange} className="form-control" type="email" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" value={profile.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input name="location" value={profile.location} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Price (INR/month)</label>
          <input name="price" value={profile.price} onChange={handleChange} className="form-control" type="number" />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Profile Image</label>
          <input type="file" className="form-control" onChange={handleFileUpload} accept="image/*" />
        </div>
        {uploading && <p>Uploading image...</p>}
        {profile.imageUrl && (
          <div className="mb-3 text-center">
            <img src={profile.imageUrl} alt="Profile" className="img-fluid rounded" style={{ maxWidth: "150px" }} />
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
