import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Toast from "./Toast/Toast";
import "../styles/Header.scss";
import { toast } from "react-toastify";
import { fetchProductsInCart } from "../redux/slices/cartSlice";
import { AppDispatch, RootState } from "../redux/store";
import Cart from "./cart/cart";
import CartModal from "./cartModal/modal";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "../Pages/Login/Login";

interface NavbarProps {
  loggedInSuccessfuly: boolean;
  isSuccessfully: boolean;
  token: string;
  products: any[];
  fetchProductsInCart: () => void;
 
  
}
interface decodedToken {
  userId: string;
  role: string;
}

const Navbar: React.FC<NavbarProps> = ({
  loggedInSuccessfuly,
  isSuccessfully,
  token,
}) => {
  const  id  = localStorage.getItem('userId');
  const dispatch = useDispatch<AppDispatch>();
  const { products = [], loading } = useSelector(
    (state: RootState) => state.cart
  );
  const [clicked, setClicked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [products, setProducts] = useState([]);

  const userInfo: DecodedToken | null = decodeToken(token)

  function redirectUrl(role: string, id: string) {
    if (role === "admin") return `adminDash/${id}`
    else return `sellerDash/${id}`
  }

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
    localStorage.removeItem("userId");

    window.location.href = "/";
  };

  const toggleMenu = () => {
    setClicked(!clicked);
  };

  const handleShopClick = () => {
    window.location.hash = 'product-page';
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
            <Link to="" onClick={handleShopClick}>
              Shop
            </Link>
          </li>
          <li>
            {loggedInSuccessfuly || token || isSuccessfully ? (
              <>
                <Link to="/" onClick={openModal}>
                  <i className="fa-solid fa-cart-shopping">
                    <div className="cartbadge">{products.length}</div>
                  </i>
                  <span>Cart</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={handleToast}>
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>Cart</span>
                </Link>
              </>
            )}
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/wishlist" onClick={() => setClicked(false)}>
                <i className="fa-solid fa-heart"></i>
                <span>MyWishlist</span>
              </Link>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <Link to={`/MyAccount/${id}`} onClick={() => setClicked(false)}>
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
              </Link>
            ) : (
              <Link to="/login" onClick={() => setClicked(false)}>
                <i className="fa-solid fa-user"></i>
                <span>Login</span>
              </Link>
            )}
          </li>
          {
            userInfo && userInfo.role !== "buyer" ?
              <li>
                <Link to={`/${redirectUrl(userInfo.role, userInfo.userId)}`}>
                  Dashboard
                </Link>
              </li>
              : ''
          }
          {isLoggedIn && (
            <li onClick={handleLogout}>
              <Link to={''}>
                Logout
              </Link>
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

const mapStateToProps = (state: RootState) => ({
  loggedInSuccessfuly: state.login.isSucceeded,
  isSuccessfully: state.googleLogin.isSuccessfully,
  token: state.token.token,
  products: state.cart.products,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchProductsInCart: () => dispatch(fetchProductsInCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
