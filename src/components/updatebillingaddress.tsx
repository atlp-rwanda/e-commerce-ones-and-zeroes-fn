import React from "react";
import "../styles/style.scss";

import updateaddressimg from "../assets/images/address.png";
import { Link } from "react-router-dom";

const UpdateBillingAddress: React.FC = () => {
  return (
    <div className="edit-page">
      <div className="back">
        <Link to="/MyAccount">
          <img
            width="64"
            height="64"
            src="https://img.icons8.com/glyph-neue/64/FFFFFF/circled-left-2.png"
            alt="circled-left-2"
          />
        </Link>
      </div>
      <div className="left-side-edit">
        <h2>Welcome to OnesAndZeroes</h2>
        <img src={updateaddressimg} alt="" />
        <h2>We Deliver Anywhere in the World</h2>
      </div>
      <div className="right-side-edit">
        <form action="">
          <h2>Update Billing Address</h2>
          <hr />
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" />
          <label htmlFor="province">Province</label>
          <input type="text" name="province" id="province" />
          <label htmlFor="district">District</label>
          <input type="text" name="district" id="district" />
          <label htmlFor="sector">Sector</label>
          <input type="text" name="sector" id="sector" />
          <label htmlFor="street">Street</label>
          <input type="text" name="street" id="street" />

          <button type="button">UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBillingAddress;
