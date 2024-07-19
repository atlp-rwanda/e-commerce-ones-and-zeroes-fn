import React from "react";
import SellerForm from "../Pages/sellerSingleProduct/sellerSingleProduct";
import SellerNavBar from "../components/userDashHeader/UserHeader";
import SellerSideBar from "../components/sellerSideBar";
import "../styles/sellerdash.scss";
const SingleProduct: React.FC = () => {
  return (
    <div className="add-product">
      <SellerNavBar/>
      <div className="main-container">
        <SellerSideBar />
        <SellerForm />
      </div>
    </div>
  );
};

export default SingleProduct