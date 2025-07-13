import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, [localStorage.getItem("authToken")]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-white text-xl sm:text-2xl font-semibold italic tracking-wide whitespace-nowrap hover:text-blue-400"
          >
            Room<span className="text-blue-400 hover:text-white">Partner</span>
          </Link>

          {/* Hamburger Button */}
          <button
            className="text-white lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor"
              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-blue-400 transition">Home</Link>

            {isLoggedIn ? (
              <>
                <Link to="/listings" className="border border-white text-white px-4 py-2 rounded-full hover:scale-105 transition">Explore Listings</Link>
                <div
                  className="relative"
                  onMouseEnter={() => setShowDropdown(true)} 
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button className="border border-white text-white px-4 py-2 rounded-full flex items-center">
                    <i className="bi bi-person-circle me-2" />Profile
                  </button>
                  {showDropdown && (
                    <ul className="absolute right-0 mt-1 w-48 bg-white text-gray-800 rounded shadow-md z-50">
                      <li>
                        <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-100">
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/update-profile" className="block px-4 py-2 hover:bg-gray-100">
                          Update Profile
                        </Link>
                      </li>
                      <li><hr className="my-1" /></li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>

              </>
            ) : (
              <>
                <Link to="/login" className="border border-gray-500 text-white px-4 py-2 rounded-full transition hover:bg-blue-600">Login</Link>
                <Link to="/createuser" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:scale-105 transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Slide-in Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-5">
          {/* Close Button */}
          <button
            className="text-white text-xl mb-6"
            onClick={() => setMobileOpen(false)}
          >
            &times;
          </button>

          {/* Mobile Links */}
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-white text-lg" onClick={() => setMobileOpen(false)}>Home</Link>

            {isLoggedIn ? (
              <>
                <Link to="/listings" className="text-white" onClick={() => setMobileOpen(false)}>Explore Listings</Link>
                <Link to="/my-listings" className="text-white" onClick={() => setMobileOpen(false)}>View Profile</Link>
                <Link to="/update-profile" className="text-white" onClick={() => setMobileOpen(false)}>Update Profile</Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-red-500 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/createuser" className="text-white" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
