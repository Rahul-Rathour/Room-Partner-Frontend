import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../components/LoginModal';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const DisplayListings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  });

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("authToken");

  const [hasListing, setHasListing] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/listings');
        setListings(response.data);
        setFilteredListings(response.data); // initially show all
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/my-listing/${userId}`);
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
        <div className="container py-5">
          {/* Search Filters */}
          {/* Search Filters */}
          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body">
              <h5 className="fw-bold text-primary mb-4">
                <i className="bi bi-funnel-fill me-2"></i>Filter Listings
              </h5>
              <div className="row g-3">
                <div className="col-lg-3 col-md-6 col-12">
                  <label htmlFor="name" className="form-label">Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-person"></i></span>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Search by name"
                      value={searchQuery.name}
                      onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <label htmlFor="location" className="form-label">Location</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-geo-alt-fill"></i></span>
                    <input
                      type="text"
                      id="location"
                      className="form-control"
                      placeholder="Search by location"
                      value={searchQuery.location}
                      onChange={(e) => setSearchQuery({ ...searchQuery, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <label htmlFor="minPrice" className="form-label">Min Price</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-cash-coin"></i></span>
                    <input
                      type="number"
                      id="minPrice"
                      className="form-control"
                      placeholder="Min price"
                      value={searchQuery.minPrice}
                      onChange={(e) => setSearchQuery({ ...searchQuery, minPrice: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-12">
                  <label htmlFor="maxPrice" className="form-label">Max Price</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light"><i className="bi bi-cash-stack"></i></span>
                    <input
                      type="number"
                      id="maxPrice"
                      className="form-control"
                      placeholder="Max price"
                      value={searchQuery.maxPrice}
                      onChange={(e) => setSearchQuery({ ...searchQuery, maxPrice: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Listings Grid */}
          <div className="row g-4">
            {filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <div
                  key={item._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 border border-light"
                  style={{margin:'5px'}}
                  onClick={() => goToDetailPage(item)}
                >
                  <div className="card h-100 border-0 shadow-sm hover-shadow transition" style={{ cursor: 'pointer' }}>
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/400x250'}
                      className="card-img-top ma"
                      alt={item.name}
                      style={{ height: '180px', objectFit: 'cover', marginTop: '10px', borderRadius:'10px' }}
                    />
                    <div className="card-body ">
                      <h5 className="card-title text-truncate">{item.name}</h5>
                      <p className="card-text text-muted mb-1">
                        <i className="bi bi-geo-alt-fill me-1"></i>{item.location}
                      </p>
                      <p className="fw-bold text-primary mb-0">₹ {item.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-center text-muted fs-5">No listings match your search.</p>
              </div>
            )}
          </div>

          {/* Add Listing Floating Button */}
          {isLoggedIn && !hasListing && (
            <button
              onClick={() => navigate('/add-listing')}
              className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center shadow"
              style={{ width: '60px', height: '60px', zIndex: 1050 }}
              aria-label="Add listing"
            >
              <FaPlus size={22} />
            </button>
          )}
        </div>
      )}
    </>
  );

};

export default DisplayListings;
