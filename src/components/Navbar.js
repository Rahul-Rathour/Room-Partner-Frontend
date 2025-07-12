import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
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
    <nav className="navbar navbar-expand-lg bg-dark bg-opacity-90 shadow-sm">
      <div className="container-fluid">
        <Link
          className="navbar-brand fs-2 fw-bold fst-italic text-white animate__animated animate__fadeIn"
          to="/"
        >
          Room-partner
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link fs-5 text-white px-3 py-2 hover:text-primary hover:bg-gray-700 rounded"
                to="/"
              >
                Homee
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <Link
                  className="btn btn-outline-light mx-2 px-4 py-2 rounded-pill hover:scale-105"
                  to="/listings"
                >
                  <i className="bi bi-house-door me-2"></i>Explore Listings
                </Link>

                {/* Profile Dropdown */}
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle px-4 py-2 rounded-pill"
                    type="button"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle me-2"></i>Profile
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                    <li>
                      <Link className="dropdown-item" to="/my-listings">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/update-profile">
                        Update Profile
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light mx-2 px-4 py-2 rounded-pill hover:scale-105"
                  to="/login"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>Login
                </Link>
                <Link
                  className="btn btn-primary mx-2 px-4 py-2 rounded-pill hover:scale-105"
                  to="/createuser"
                >
                  <i className="bi bi-person-plus me-2"></i>Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
