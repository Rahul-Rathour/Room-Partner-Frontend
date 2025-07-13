// frontend/src/components/ListingDetail.js
import { useLocation } from 'react-router-dom';

const ListingDetail = () => {
  const { state } = useLocation();
  const listing = state;

  if (!listing) {
    return <p className="p-6 text-center text-gray-600">No listing found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 " style={{paddingTop:'6rem'}}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={listing.imageUrl || "https://via.placeholder.com/1200x600"}
            alt={listing.name}
            className="w-full max-h-[400px] object-contain rounded-md"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 p-6 space-y-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <i className="bi bi-house-door-fill text-blue-500 mr-2"></i>
            Hi, I'm {listing.name}
          </h1>

          <p className="text-gray-600 flex items-center">
            <i className="bi bi-geo-alt-fill text-red-500 mr-2"></i>
            <span><strong>Location:</strong> {listing.location}</span>
          </p>

          <p className="text-gray-600 flex items-center">
            <i className="bi bi-currency-rupee text-green-600 mr-2"></i>
            <span><strong>Total Rent:</strong> ₹{listing.price}</span>
          </p>

          <p className="text-gray-600 flex items-center">
            <i className="bi bi-calendar-event-fill text-yellow-500 mr-2"></i>
            <span><strong>Listed On:</strong> {new Date(listing.createdAt).toLocaleString()}</span>
          </p>

          <p className="text-gray-600 flex items-center">
            <i className="bi bi-telephone-fill text-blue-400 mr-2"></i>
            <span><strong>Phone:</strong> {listing.phone}</span>
          </p>

          <p className="text-gray-600 flex items-center">
            <i className="bi bi-envelope-fill text-gray-500 mr-2"></i>
            <span><strong>Email:</strong> {listing.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
