import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { FaPlus } from 'react-icons/fa';

const DisplayListings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  });

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');
  const [hasListing, setHasListing] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/listings`);
        setListings(response.data);
        setFilteredListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/my-listing/${userId}`);
        setHasListing(data.length > 0);
      } catch (err) {
        console.error('Error fetching user listings:', err);
        setHasListing(false);
      }
    };
    if (isLoggedIn && userId) fetchMyListing();
  }, [userId, isLoggedIn]);

  useEffect(() => {
    const { name, location, minPrice, maxPrice } = searchQuery;
    const filtered = listings.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(name.toLowerCase());
      const matchesLocation = item.location.toLowerCase().includes(location.toLowerCase());
      const matchesMinPrice = minPrice ? item.price >= parseInt(minPrice) : true;
      const matchesMaxPrice = maxPrice ? item.price <= parseInt(maxPrice) : true;
      return matchesName && matchesLocation && matchesMinPrice && matchesMaxPrice;
    });
    setFilteredListings(filtered);
  }, [searchQuery, listings]);

  const goToDetailPage = (listing) => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    navigate(`/listing/${listing._id}`, { state: listing });
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginModal onClose={() => setShowModal(false)} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-10 pt-16">
          {/* Filters */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-600 mb-4">🔍 Filter Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Search by name"
                  value={searchQuery.name}
                  onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Search by location"
                  value={searchQuery.location}
                  onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                />
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Min price"
                  value={searchQuery.minPrice}
                  onChange={(e) => setSearchQuery({ ...searchQuery, minPrice: e.target.value })}
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Max price"
                  value={searchQuery.maxPrice}
                  onChange={(e) => setSearchQuery({ ...searchQuery, maxPrice: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <div
                  key={item._id}
                  onClick={() => goToDetailPage(item)}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/400x250'}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item.location}</p>
                    <p className="text-blue-600 font-bold">₹ {item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 text-lg">
                No listings match your search.
              </p>
            )}
          </div>

          {/* Floating Add Button */}
          {isLoggedIn && !hasListing && (
            <button
              onClick={() => navigate('/add-listing')}
              className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
              aria-label="Add listing"
            >
              <FaPlus size={20} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default DisplayListings;
