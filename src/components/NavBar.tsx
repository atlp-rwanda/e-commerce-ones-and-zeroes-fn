import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Toast from "./Toast/Toast";
import "../styles/Header.scss";
import { toast } from "react-toastify";
import { fetchProductsInCart } from "../redux/slices/cartSlice";
import { AppDispatch, RootState } from "../redux/store";
import Cart from "./cart/cart";
import CartModal from "./cartModal/modal";

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
  const dispatch = useDispatch<AppDispatch>();
  const { products = [], loading } = useSelector(
    (state: RootState) => state.cart
  );
  const [clicked, setClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [products, setProducts] = useState([]);

  const openModal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleToast = () => {
    toast.error("Login to see your Cart");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    dispatch(fetchProductsInCart())
    
  }, [dispatch]);

  const isLoggedIn = loggedInSuccessfuly || token;

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
            {loggedInSuccessfuly || token || isSuccessfully ? (
              <>
                <i className="fa-solid fa-cart-shopping">
                  <div className="cartbadge">{products.length}</div>
                </i>
                <Link to="/" onClick={openModal}>
                  Cart
                </Link>
              </>
            ) : (
              <>
                <i className="fa-solid fa-cart-shopping"></i>
                <Link to="/" onClick={handleToast}>
                  Cart
                </Link>
              </>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <i className="fa-solid fa-heart"></i>
              <Link to="/wishlist" onClick={() => setClicked(false)}>
                MyWishlist
              </Link>
            </li>
          )}
          <li>
            <i className="fa-solid fa-user"></i>
            {isLoggedIn ? (
              <Link to={`/MyAccount/${id}`} onClick={() => setClicked(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/login" onClick={() => setClicked(false)}>
                Login
              </Link>
            )}
          </li>
          {isLoggedIn && (
            <li onClick={handleLogout} className="link">
              Logout
            </li>
          )}
        </ul>
      </nav>
      {loggedInSuccessfuly && (
        <Toast messageType={"success"} message={`Logged in successfully`} />
      )}
      {isModalVisible && (
        <CartModal onClose={closeModal} children={<Cart />} />
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
