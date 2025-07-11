import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasListing, setHasListing] = useState(false);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const isLoggedIn = !!authToken;
  const userId = localStorage.getItem("userId");

  // Fetch user's listings on mount
  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/my-listing/${userId}`);
        setHasListing(data.length > 0);
      } catch (err) {
        console.error("Error fetching user listings:", err);
        setHasListing(false);
      }
    };

    if (isLoggedIn && userId) {
      fetchMyListing();
    }
  }, [userId, isLoggedIn]);

  // Search handler
  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/listings/location?search=${search}`);
      setListings(res.data.slice(0, 10));
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (listing) => {
    if (isLoggedIn) {
      navigate(`/listing/${listing._id}`, { state: listing });
    } else {
      setShowModal(true);
    }
  };

  const handleAddListing = () => {
    navigate('/add-listing');
  };

  return (
    <>
      
      <div className="relative">
        {/* Hero Carousel */}
        <div className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.pexels.com/photos/7578899/pexels-photo-7578899.jpeg"
                className="d-block w-100"
                alt="Room"
                style={{ height: '600px', objectFit: 'cover', filter: 'brightness(50%)' }}
              />
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">
                <h1 className="display-4 fw-bold text-white mb-4 animate__animated animate__fadeInDown">
                  Find Your Perfect Room Partner
                </h1>
                <div className="col-md-8 col-lg-6 col-10">
                  <div className="input-group input-group-lg mb-3">
                    <input
                      type="search"
                      className="form-control rounded-pill py-3"
                      placeholder="Search by city or area..."
                      aria-label="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        border: 'none',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        color: '#111',
                      }}
                    />
                    <button
                      className="btn btn-primary rounded-pill px-4 ms-2 shadow-sm"
                      onClick={handleSearch}
                    >
                      <i className="bi bi-search me-2"></i>Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className={`container my-5 ${showModal ? 'opacity-50' : ''} transition-opacity duration-300`}>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" />
              <p className="mt-3 text-muted">Loading listings...</p>
            </div>
          ) : listings.length === 0 ? (
            <>
              {/* No Listings */}
              <div className="text-center mb-5">
                <h2 className="fw-bold fs-2 mb-4">Welcome to Room-partner</h2>
                <p className="text-muted fs-5 mb-4 col-md-8 mx-auto">
                  Discover the easiest way to find a roommate or share your room. Whether you're looking for a cozy apartment or a spacious house, Room-partner connects you with verified users.
                </p>
                <div className="row g-4 justify-content-center">
                  {/* Features Cards */}
                  {[
                    {
                      icon: "bi bi-search",
                      title: "Easy Search",
                      desc: "Find listings by location, budget, or preferences in seconds."
                    },
                    {
                      icon: "bi bi-shield-check",
                      title: "Verified Listings",
                      desc: "Browse trusted listings with verified hosts and detailed descriptions."
                    },
                    {
                      icon: "bi bi-chat-square-text",
                      title: "Secure Communication",
                      desc: "Connect safely with potential roommates through our platform."
                    }
                  ].map((item, index) => (
                    <div className="col-md-4 col-sm-6" key={index}>
                      <div className="card border-0 shadow-sm p-4 h-100">
                        <i className={`${item.icon} display-4 text-primary mb-3`}></i>
                        <h5 className="fw-bold">{item.title}</h5>
                        <p className="text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to={isLoggedIn ? "/listings" : "/createuser"}
                  className="btn btn-primary btn-lg mt-4 rounded-pill px-5"
                >
                  {isLoggedIn ? "Browse Listings" : "Get Started"}
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Listings Available */}
              <h2 className="text-center mb-5 fw-bold fs-3">Available Listings</h2>
              <div className="row g-4">
                {listings.map((listing) => (
                  <div className="col-md-4 col-sm-6" key={listing._id}>
                    <div
                      className="card h-100 border-0 shadow-sm overflow-hidden hover:shadow-lg"
                      onClick={() => handleCardClick(listing)}
                      style={{ cursor: 'pointer', borderRadius: '15px', transition: 'transform 0.3s' }}
                    >
                      <img
                        src={listing.imageUrl || "https://via.placeholder.com/300x200"}
                        className="card-img-top"
                        alt={listing.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body p-4">
                        <h5 className="card-title fw-bold mb-2">{listing.name}</h5>
                        <p className="text-muted mb-2">
                          <i className="bi bi-geo-alt me-1"></i>{listing.location}
                        </p>
                        <p className="card-text text-secondary">
                          {listing.description?.slice(0, 80)}...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Section After Listings */}
              <div className="text-center mt-5">
                <h2 className="fw-bold fs-2 mb-4">Why Choose Room-partner?</h2>
                <p className="text-muted fs-5 mb-4 col-md-8 mx-auto">
                  Explore verified listings, connect with potential roommates, and start your journey today.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Add Listing Button (Floating) */}
        {isLoggedIn && !hasListing && (
          <button
            onClick={handleAddListing}
            className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px', zIndex: 1050 }}
            aria-label="Add listing"
            title='List Your self'
          >
            <FaPlus />
          </button>
        )}

        {/* Modal Overlay */}
        {showModal && <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} />}
        {showModal && <LoginModal onClose={() => setShowModal(false)} />} 
      </div>
      
    </>
  );
};

export default Home;
