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
    <div className="relative pt-16">
      {/* Hero Section */}
      <div className="relative w-full h-[600px]">
        <img
          src="https://images.pexels.com/photos/7578899/pexels-photo-7578899.jpeg"
          alt="Room"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 animate-fadeInDown">
            Find Your Perfect Room Partner
          </h1>
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-2">
              <input
                type="search"
                placeholder="Search by city or area..."
                className="w-full py-3 px-5 rounded-full bg-white/95 text-gray-800 focus:outline-none shadow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow"
              >
                <i className="bi bi-search mr-2" />Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Section */}
      <div className={`max-w-7xl mx-auto px-4 my-12 ${showModal ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}>
        {loading ? (
          <div className="text-center my-12">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-500">Loading listings...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome to Room-partner</h2>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Discover the easiest way to find a roommate or share your room. Whether you're looking for a cozy apartment or a spacious house, Room-partner connects you with verified users.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
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
                <div key={index} className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
                  <i className={`${item.icon} text-4xl text-blue-600 mb-4`} />
                  <h5 className="font-semibold mb-2">{item.title}</h5>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              to={isLoggedIn ? "/listings" : "/createuser"}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition"
            >
              {isLoggedIn ? "Browse Listings" : "Get Started"}
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-8">Available Listings</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                  onClick={() => handleCardClick(listing)}
                >
                  <img
                    src={listing.imageUrl || "https://via.placeholder.com/300x200"}
                    alt={listing.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h5 className="font-bold mb-2">{listing.name}</h5>
                    <p className="text-gray-500 mb-1">
                      <i className="bi bi-geo-alt mr-1" />
                      {listing.location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {listing.description?.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info after listings */}
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Room-partner?</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore verified listings, connect with potential roommates, and start your journey today.
              </p>
            <Link
              to={isLoggedIn ? "/listings" : "/createuser"}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition"
            >
              {isLoggedIn ? "Browse Listings" : "Get Started"}
            </Link>
            </div>
          </>
        )}
      </div>

      {/* Add Listing Button */}
      {isLoggedIn && !hasListing && (
        <button
          onClick={handleAddListing}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-[1050]"
          aria-label="Add listing"
          title="List Yourself"
        >
          <FaPlus />
        </button>
      )}

      {/* Modal Overlay */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-[1040]" />
          <LoginModal onClose={() => setShowModal(false)} />
        </>
      )}
    </div>
  </>
);

};

export default Home;
