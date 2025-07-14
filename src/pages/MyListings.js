import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";

const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_BASE_URL;
        const { data } = await axios.get(`${apiBaseUrl}/my-listing/${userId}`); 
        setListings(data);
        // console.log(data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        alert("Error fetching your listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchListings();
    } else {
      alert("User not logged in!");
      navigate("/login");
    }
  }, [userId, navigate]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        My Listings
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <p className="mt-2 text-gray-600">Loading your listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-700">You haven’t listed anything yet.</p>
          <p className="text-sm text-gray-500 mt-2">
            Tap the <FaPlus className="inline text-blue-500" /> button below to add your first listing.
          </p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-all duration-300 max-w-4xl mx-auto"
              >
                {/* Image Section */}
                <div className="md:w-1/3 w-full">
                  <img
                    src={listing.imageUrl || "https://via.placeholder.com/600x400.png?text=No+Image"}
                    alt={listing.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                {/* Details Section */}
                <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">{listing.name}</h3>
                    <div className="space-y-2">
                      <p className="text-base text-gray-600"><span className="font-medium">📍 Location:</span> {listing.location}</p>
                      <p className="text-base text-gray-600"><span className="font-medium">📞 Phone:</span> {listing.phone}</p>
                      <p className="text-base text-gray-600"><span className="font-medium">✉️ Email:</span> {listing.email}</p>
                      <p className="text-lg font-bold text-green-600 mt-3">₹{listing.price}/month</p>
                    </div>
                  </div>
                  {/* Button */}
                  <div className="mt-4">
                    <Link
                      to="/update-profile"
                      className="inline-block bg-blue-600 text-white text-sm px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      Update Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


      )}

      {!loading && listings.length === 0 && (
        <button
          onClick={() => navigate("/add-listing")}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Add listing"
          title="Add Listing"
        >
          <FaPlus />
        </button>
      )}
    </div>
  );

};

export default MyListings;
