import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Toast from "./Toast/Toast";
import "../styles/Header.scss";

interface NavbarProps {
  loggedInSuccessfuly: boolean;
  isSuccessfully: boolean;
  token: string;
}

const Navbar: React.FC<NavbarProps> = ({
  loggedInSuccessfuly,
  isSuccessfully,
  token,
}) => {
  const { id } = useParams<{ id: string }>();
  const [clicked, setClicked] = useState(false);

  
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setClicked(!clicked);
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">
            <img
              src="https://www.logomaker.com/api/main/images/1j_ojFVGOMkX9W_reBe4hGfW0KPDt0YRzAWngnw0KSYV9wIZw39w26cppqgtdkRU7FAPhhEHd8U5jjI7CNQYjAw7qniAOJ0GBSc...i38JVu4GHHYpehbWHujK8Qhpnt9h3c0P7BueBX6hC3KbdNk5MITMxah4C49ppG...NPjY6uWd3XrdQMpbWBZRsgJeoSLVU5m3CGc1XcrTRRN...zHGAc"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <ul className={clicked ? "menu open" : "menu"}>
          <li>
            <Link to="/" onClick={() => setClicked(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => setClicked(false)}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/pages" onClick={() => setClicked(false)}>
              Pages
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-cart-shopping"></i>
            <Link to="/cart" onClick={() => setClicked(false)}>
              Cart
            </Link>
          </li>
          <li>
            <i className="fa-solid fa-user"></i>
            {loggedInSuccessfuly || token ? (
              <Link to={`/MyAccount/${id}`} onClick={() => setClicked(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/login" onClick={() => setClicked(false)}>
                Login
              </Link>
            )}
          </li>
          {(loggedInSuccessfuly || token || isSuccessfully) && (
            <li onClick={handleLogout} className="link">
              Logout
            </li>
          )}
        </ul>
      </nav>
      {loggedInSuccessfuly && (
        <Toast messageType={"success"} message={`Logged in successfully`} />
      )}
    </header>
  );
};

const mapStateToProps = (state: any) => ({
  loggedInSuccessfuly: state.login.isSucceeded,
  isSuccessfully: state.googleLogin.isSuccessfully,
  token: state.token.token,
});

export default connect(mapStateToProps)(Navbar);
