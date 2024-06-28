import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import '../styles/sellerNavBar.scss';
import { IconContext } from "react-icons";
import SellerSideBar from "./SellerSideBar";
import { TiThMenu } from "react-icons/ti";
import { useClickAway } from 'react-use';
const SellerNavBar: React.FC = () => {
  return (
    <>
      <nav className="SellerNavBar">
      <SellerSideBar />
        <ul>
          <li>
          </li>
          <li>
            <Link to={'/'} className="start-buying-link">Start buying</Link>
          </li>
          <li>
            <a href="#" aria-label="Account">
              <IconContext.Provider value={{ className: 'profile-icon' }}>
                <FaUserCircle />
              </IconContext.Provider>
              <span>Account</span>
              <IconContext.Provider value={{ className: 'chevron-icon' }}>
                <FaChevronDown />
              </IconContext.Provider>
            </a>
          </li>
        </ul>
      </nav>
     
    </>
  );
};

export default SellerNavBar;
