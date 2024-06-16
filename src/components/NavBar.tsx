import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { decodeToken } from "react-jwt";
import Toast from "./Toast/Toast";
import "../styles/Header.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

interface NavbarProps {
  loggedInSuccessfuly: boolean;
  isSuccessfully: boolean;
  token: string;
}

interface NavbarState {
  clicked: boolean;
}

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  toggleMenu = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const { loggedInSuccessfuly,isSuccessfully, token } = this.props;

    // let userId;
    const decodedToken = decodeToken<{ userId: string,role:string }>(token);
    let userId = decodedToken?.userId;
    let userRole = decodedToken?.role
   
    console.log("Decoded userId:", userRole);

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
          <div className="hamburger" onClick={this.toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <ul className={this.state.clicked ? "menu open" : "menu"}>
            <li>
              <Link to="/" onClick={() => this.setState({ clicked: false })}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                onClick={() => this.setState({ clicked: false })}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/pages"
                onClick={() => this.setState({ clicked: false })}
              >
                Pages
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-cart-shopping"></i>
              <Link
                to="/cart"
                onClick={() => this.setState({ clicked: false })}
              >
                Cart
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-user"></i>
              {loggedInSuccessfuly || token ? (
                <Link
                  to={`/UserDash/${userId}`}
                  onClick={() => this.setState({ clicked: false })}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => this.setState({ clicked: false })}
                >
                  Login
                </Link>
              )}
            </li>
              {(loggedInSuccessfuly || token || isSuccessfully) && 
            <li onClick={handleLogout} className='link'>Logout</li>
              }
          </ul>
        </nav>
        {loggedInSuccessfuly && (
          <Toast messageType={"success"} message={`Logged in successfully`} />
        )}
      </header>
    );
  }
}

const mapStateToProps = (state: any) => ({
  loggedInSuccessfuly: state.login.isSucceeded,
  isSuccessfully: state.googleLogin.isSuccessfully,
  token: state.token.token,
});

export default connect(mapStateToProps)(Navbar);
