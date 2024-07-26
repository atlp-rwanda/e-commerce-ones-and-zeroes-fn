import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/slices/userSlices";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import account from "../../assets/images/acc.png";
import "./styles.scss";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { logoutUser } from "../../redux/slices/loginSlice";
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<{ id?: string }>();
  // Function to toggle the visibility
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const userRole = user?.role;
  const [firstName, setFirstName] = useState("");
  console.log("ID:", id);
  useEffect(() => {
    if (id) {
      // Check if id is defined before fetching user data
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);
  const logoSrc = logo.toString();
  const accountSrc = account.toString();
  const navigate = useNavigate();
  const logout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      dispatch(logoutUser());
      setIsLoading(false);
      navigate("/");
    }, 2000); // 2 second delay
  };

  return (
    <div className="nav">
      {isLoading ? (
        <div className="spinerloader" onClick={logout}>
          <Oval
            height={40}
            width={40}
            color="red"
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="darkblue"
            strokeWidth={2}
          />
          <p>Removing your account....</p>
        </div>
      ) : (
        <div className="spinerloader" onClick={logout}></div>
      )}
      <div className="logodash">
        <img src={logoSrc} alt="logo" />
        <hr />
        <h4>OnesAndZeros</h4>
      </div>
      <div className="myAccount">
        <div className="accountBadge">
          <Link to={`/${id}`} className="linkStyle">
            <div className="shopNow">
              <p>Start Buying</p>
            </div>
          </Link>
          <div className="badge">
            <img
              src={accountSrc}
              alt="Account"
              onClick={toggleVisibility}
              width={35}
              height={35}
            />
            <h4 onClick={toggleVisibility}>{user ? user.firstName : "Loading..."}</h4>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
