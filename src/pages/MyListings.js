import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import axios from "axios";

const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/my-listing/${userId}`);
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        alert("Error fetching your listings. Please try again.");
      }
    };

    fetchListings();
  }, [userId]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">My Profile</h2>
      {listings.length === 0 ? (
        <div>
          <p className="text-center">You have not listed.</p> <br/>
          <p className="text-center"> List your self by tapping on the plus icon, located on the bottom. </p>
          <button
            onClick={() => navigate('/add-listing')}
            className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px', zIndex: 1050 }}
            aria-label="Add listing"
            title="Add Listing"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <div className="row">
          {listings.map((listing) => (
            <div className="col-md-4 mb-4" key={listing._id}>
              <div className="card shadow-sm">
                <img
                  src={listing.imageUrl || "https://via.placeholder.com/400x200.png?text=No+Image"}
                  className="card-img-top"
                  alt={listing.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{listing.name}</h5>
                  <p className="card-text">{listing.location}</p>
                  <p className="card-text">{listing.phone}</p>
                  <p className="card-text">{listing.email}</p>
                  <p className="card-text fw-bold text-primary">₹{listing.price}/month</p>
                  <div className="d-flex justify-content-center">
                    <Link to="/update-profile" className="btn btn-sm btn-primary">
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
