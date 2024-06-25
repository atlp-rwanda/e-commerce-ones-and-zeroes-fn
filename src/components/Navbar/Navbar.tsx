import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import logoSrc from "../../assets/images/logo.jpg"
import "./Navbar.scss";
import { IconContext } from "react-icons";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchUser } from "../../redux/slices/userSlices";
import { logoutUser } from "../../redux/slices/loginSlice";
import { resetToken } from "../../redux/slices/tokenSlice";

interface Props{
  sideBarActive: boolean,
  updateSideBarActive: ((state:boolean)=>void)
}


const NavBar: React.FC<Props> = ({sideBarActive,updateSideBarActive}) => {

  const [profileActive, setProfileActive] = useState<boolean>(false)  

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const token: string | null = localStorage.getItem('token')

  const { id } = useParams<{ id?: string | undefined }>();

  if(!id || id==="undefined"){
    navigate('/login')
  }

  function handleResize() {
    if (window.innerWidth >= 1000) {
      updateSideBarActive(false)
    }
  }

  function handleLogout() {
    dispatch(logoutUser())
    dispatch(resetToken())
    navigate("/");
  }

  function handleProfileClick(event: any){
    setProfileActive(prev=>!prev)
  }

  function handleProfileRedirect(event: any){
    navigate(`/MyAccount/${id}`)
  }

  function handleClickOutsideProfile(event: any){
    if(!event.target.closest(".accountContainer")) setProfileActive(false)
  }

  interface User {
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    passwordLastChanged: string,
    isVerified: boolean
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutsideProfile)
    const decodedUser: User | null = token ? decodeToken(token) : null
    if (decodedUser) {
      dispatch(fetchUser(decodedUser.userId))
    }
  }, [])

  const { user } = useSelector((state: RootState) => state.user);
  

  return (
    <>
      <nav className="adminNavBar">
        <FontAwesomeIcon className="menuBars" icon={faBars} onClick={() => updateSideBarActive(!sideBarActive)}></FontAwesomeIcon>
        <div className="logo">
          <img src={logoSrc} alt="logo" />
          <hr />
          <h4>OnesAndZeros</h4>
        </div>
        <Link to={`/${id}`} className="start-buying-link">
          Start buying
        </Link>
        <div className="accountContainer">
          <div className="account" onClick={handleProfileClick}>
            <IconContext.Provider value={{ className: "profile-icon" }}>
              <FaUserCircle />
            </IconContext.Provider>
            <span>{user ? user.firstName : 'Account'}</span>
            <IconContext.Provider value={{ className: "chevron-icon" }}>
              <FaChevronDown />
            </IconContext.Provider>
          </div>
          {
            profileActive ?
              <div className="profileContainer">
                <div className="userDetails" onClick={handleProfileRedirect}>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                  <p>{user ? `${user.firstName}` : `Account`}</p>
                </div>
                <button onClick={handleLogout}>Logout</button>
              </div>
              : ''
          }
        </div>
      </nav>
    </>
  );
};

export default NavBar;
