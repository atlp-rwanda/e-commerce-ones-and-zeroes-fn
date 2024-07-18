import React from "react";
import SellerNavBar from "../../components/BuyerNavbar/BuyerNavbar"
import SellerSideBar from "../../components/BuyerSidebar/BuyerSidebar";
import "./BuyerDashboard.scss";
import Orders from "../../components/Orders/Orders";

const AddProduct: React.FC = () => {
  return (
    <div className="add-product">
      <SellerNavBar />
      <div className="main-container">
        <SellerSideBar />
      <Orders />
      </div>
    </div>
  );
};

export default AddProduct;