import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    // remove email phone
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("phone");
    // TODO check the logic - if it was saved in DB? if not maybe should keep it
    // localStorage.removeItem("storageAppointmentData");
    // localStorage.removeItem("reviewData");
    // another version to clean review from ls, if reviews are stored as diff files:
    // for (let i = 0; i < localStorage.length; i++) {
    //   const key = localStorage.key(i);
    //   if (key.startsWith("reviewFormData_")) {
    //     localStorage.removeItem(key);
    //   }
    // }
    setIsLoggedIn(false);
    setUsername("");
    window.location.reload();
  };
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  useEffect(() => {
    const storedemail = sessionStorage.getItem("name");

    if (storedemail) {
      setIsLoggedIn(true);
      setUsername(storedemail);
    }
  }, []);

  return (
    <nav>
      <div className="nav__logo">
        <Link to="/">
          StayHealthy{" "}
          <i style={{ color: "#2190FF" }} className="fa fa-user-md"></i>
        </Link>
        <span></span>
      </div>
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
      </div>
      <ul className={click ? "nav__links active" : "nav__links"}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/search-doctors">Book Consultation</Link>
        </li>       
        <li className="link">
          <Link to="/healthblog">Health Blog</Link>
        </li>
        <li className="link">
          <Link to="/reviews">Reviews</Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="link welcome-user" onClick={handleDropdown}>
              {"Welcome, " + username}
              <div className="dropdown-menu">
                {showDropdown && (
                  <ul>
                    <li>
                      <Link to="/profile">Your Profile</Link>
                    </li>
                    <li>
                      <Link to="/reports">Your Reports</Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li className="link">
              <button className="btn2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
