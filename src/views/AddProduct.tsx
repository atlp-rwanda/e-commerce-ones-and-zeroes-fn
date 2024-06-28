import React from "react";
import SellerForm from "../components/SellerAddProductForm";
import SellerNavBar from "../components/SellerNavBar";
import SellerSideBar from "../components/SellerSideBar";
import '../styles/AddProduct.scss';
const AddProduct:React.FC=()=>{
    return(
        <div className="add-product">
        <SellerNavBar/>
        <SellerForm/>
        </div>

    )
}



export default AddProduct;