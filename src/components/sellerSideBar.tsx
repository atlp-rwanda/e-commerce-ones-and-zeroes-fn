import React, { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { BsCart2 } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux";
import { resetToken } from "../redux/slices/tokenSlice";
import "../styles/sellerSideBar.scss";
import { jwtDecode } from "jwt-decode";

interface User {
  userId: string;
}

const SellerSideBar: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(true);
  const ref = useRef(null);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const decodedToken: User = jwtDecode(token || "");

  const handleLogout = () => {
    dispatch(resetToken());
  };

  return (
    <nav className="sellerSideBar" ref={ref}>
      <ul>
        <li className={pathname === `/seller/${decodedToken.userId}` && open ? "active" : ""}>
          <Link to={`/seller/${decodedToken.userId}`}>
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <RiDashboardHorizontalFill />
            </IconContext.Provider>
            {open && <span>Dashboard</span>}
          </Link>
        </li>
        {/* <li className={pathname === "/analytics" && open ? "active" : ""}>
          <Link to="/analytics">
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <IoIosHome />
            </IconContext.Provider>
            {open && <span>Analytics</span>}
          </Link>
        </li> */}
        <li className={pathname === "/collection" && open ? "active" : ""}>
          <Link to="/collection">
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <BsCart2 />
            </IconContext.Provider>
            {open && <span>Collection</span>}
          </Link>
        </li>
        <li className={pathname === `/productManagement/${decodedToken.userId}` && open ? "active" : ""}>
          <Link to={`/productManagement/${decodedToken.userId}`}>
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <FaShoppingBag />
            </IconContext.Provider>
            {open && <span>Products</span>}
          </Link>
        </li>
      </ul>
      <Link to="/" onClick={handleLogout} className="logout-button">
        <IconContext.Provider value={{ className: "side-bar-icons" }}>
          <CiLogout />
        </IconContext.Provider>
        LogOut
      </Link>
    </nav>
  );
};

export default SellerSideBar;
