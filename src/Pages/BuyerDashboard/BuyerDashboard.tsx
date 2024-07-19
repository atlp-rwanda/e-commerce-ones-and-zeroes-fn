import React, { useState, useRef } from "react";
import SellerNavBar from "../../components/BuyerNavbar/BuyerNavbar";
import "./BuyerDashboard.scss";
import Orders from "../../components/Orders/Orders";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import "./BuyerSidebar.scss";
import { useClickAway } from "react-use";

const AddProduct: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <div>Dashboard Content</div>;
      case "orders":
        return <Orders />;
      case "collection":
        return <div>Collection Content</div>;
      case "products":
        return <div>Products Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  return (
    <div className="add-product">
      <SellerNavBar />
      <div className="main-container">
        <nav ref={ref} className="sellerSideBar">
          <ul>
            <li>
              <a 
                className={activeComponent === "dashboard" ? "active" : ""}
                onClick={() => setActiveComponent("dashboard")}
              >
                <IconContext.Provider value={{ className: "side-bar-icons" }}>
                  <RiDashboardHorizontalFill />
                </IconContext.Provider>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a 
                className={activeComponent === "orders" ? "active" : ""}
                onClick={() => setActiveComponent("orders")}
              >
                <IconContext.Provider value={{ className: "side-bar-icons" }}>
                  <IoIosHome />
                </IconContext.Provider>
                <span>My Orders</span>
              </a>
            </li>
            <li>
              <a 
                className={activeComponent === "collection" ? "active" : ""}
                onClick={() => setActiveComponent("collection")}
              >
                <IconContext.Provider value={{ className: "side-bar-icons" }}>
                  <BsCart2 />
                </IconContext.Provider>
                <span>Collection</span>
              </a>
            </li>
            <li>
              <a 
                className={activeComponent === "products" ? "active" : ""}
                onClick={() => setActiveComponent("products")}
              >
                <IconContext.Provider value={{ className: "side-bar-icons" }}>
                  <FaShoppingBag />
                </IconContext.Provider>
                <span>Products</span>
              </a>
            </li>
          </ul>
          <a onClick={() => console.log("Logout action")}>
            <IconContext.Provider value={{ className: "side-bar-icons" }}>
              <CiLogout />
            </IconContext.Provider>
            LogOut
          </a>
        </nav>
        <div className="content">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
