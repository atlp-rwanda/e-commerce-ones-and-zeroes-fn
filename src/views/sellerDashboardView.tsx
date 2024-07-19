import React from "react";
import Seller from "../Pages/sellerDashboard/sellerDashbord";
import SellerNavBar from "../components/sellerNavBar";
import SellerSideBar from "../components/sellerSideBar";
import "../styles/sellerdash.scss";
const sellerDashboard: React.FC = () => {
  return (
    <div className="add-product">
      <SellerNavBar/>
      <div className="main-container">
        <SellerSideBar />
        <Seller userId={""}/>
      </div>
    </div>
  );
};

export default sellerDashboard