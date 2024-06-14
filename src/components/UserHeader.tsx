import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchUser, updateUser } from "../redux/slices/userSlices";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import account from "../assets/images/acc.png";
import "../styles/style.scss";
import { useParams } from "react-router-dom";

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const { id } = useParams<{ id?: string }>();
  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(
    (state: RootState) => state.user
  );
  const userRole = user?.role;
  const [firstName, setFirstName] = useState("");
  console.log(id)
  useEffect(() => {
    if (id) { // Check if id is defined before fetching user data
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);
  const logoSrc = logo.toString();
  const accountSrc = account.toString();

  return (
    <div className="nav">
      <div className="logo">
        <img src={logoSrc} alt='logo' />
        <hr />
        <h4>OnesAndZeros</h4>
      </div>
      <div className="myAccount">
        <div className="accountBadge">
         
            <div className="shopNow">
            <p>Start Buying</p>
          </div>
       
          <div className="badge">
            <img src={accountSrc} alt="Account" onClick={toggleVisibility} width={35} height={35}/>
          <h4 onClick={toggleVisibility}>MyAccount</h4>
          <img
          width={13}
          height={13}
            src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chevron-down.png"
            alt="chevron-down"
            onClick={toggleVisibility}
            className="arrow-down"
          />
          </div>
          
        </div>
      </div>
      <div className={`account-float ${isVisible ? "visible" : "hidden"}`}>
        <div className="chat-container">
          <div className="chat">
            <div className="profile">
              <img src={account} alt="Profile" />
            </div>
            <div className="name">
              <h4>Hello,</h4>
            </div>
            <div className="time">{user ? user.firstName : "Loading..."}</div>
            <div className="message">
            <Link to={`/MyAccount/${id}`} className="linkStyle">MyAccount</Link>
            </div>
            <div className="pin">Sign Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
