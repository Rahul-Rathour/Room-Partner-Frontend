// frontend/src/components/ListingDetail.js
import { useLocation } from 'react-router-dom';

const ListingDetail = () => {
  const { state } = useLocation();
  const listing = state;

  if (!listing) {
    return <p className="p-6">No listing found.</p>;
  }

  return (
    <div className="container my-5">
      <div className="card border-0 shadow-lg rounded-4 overflow-hidden d-flex align-items-center">
        <h1 className="card-title fw-bold mb-3 text-light d-flex align-items-center">
            <i className="bi bi-house-door-fill text-primary me-2"></i> Hii I'm {listing.name}
          </h1>
        {/* Image Section */}
        <div className="w-50 bg-light text-center">
          <img
            src={listing.imageUrl || "https://via.placeholder.com/1200x600"}
            alt={listing.name}
            className="img-fluid w-100"
            style={{
              maxHeight: 'auto',
              objectFit: 'contain', // Ensures full image fits without cropping
            }}
          />
        </div>

        {/* Content Section */}
        <div className="card-body p-4">
          {/* <h1 className="card-title fw-bold mb-3 text-dark d-flex align-items-center">
            <i className="bi bi-house-door-fill text-primary me-2"></i> {listing.name}
          </h1> */}

          <p className="text-muted mb-2 d-flex align-items-center">
            <i className="bi bi-geo-alt-fill text-danger me-2"></i>
            <strong>Location:</strong>&nbsp;{listing.location}
          </p>

          <p className="text-muted mb-2 d-flex align-items-center">
            <i className="bi bi-currency-rupee text-success me-2"></i>
            <strong>Total Rent:</strong>&nbsp;₹{listing.price}
          </p>

          <p className="text-muted mb-2 d-flex align-items-center">
            <i className="bi bi-calendar-event-fill text-warning me-2"></i>
            <strong>Listed On:</strong>&nbsp;{new Date(listing.createdAt).toLocaleString()}
          </p>

          <p className="text-muted mb-2 d-flex align-items-center">
            <i className="bi bi-telephone-fill text-info me-2"></i>
            <strong>Phone:</strong>&nbsp;{listing.phone}
          </p>

          <p className="text-muted d-flex align-items-center">
            <i className="bi bi-envelope-fill text-secondary me-2"></i>
            <strong>Email:</strong>&nbsp;{listing.email}
          </p>
        </div>
      </div>
    </div>

  );
};

export default ListingDetail;
