import React from "react";
import SellerForm from "../Pages/productManagement/productManagementSeller";
import NavBar from "../components/Navbar/Navbar";
import SellerSideBar from "../components/sellerSideBar";
import "../styles/sellerdash.scss";
const sellerDash: React.FC = () => {
  return (
    <div className="add-product">
      <NavBar sideBarActive={false} updateSideBarActive={function (state: boolean): void {
        throw new Error("Function not implemented.");
      } }/>
      <div className="main-container">
        <SellerSideBar />
        <SellerForm />
      </div>
    </div>
  );
};

export default sellerDash