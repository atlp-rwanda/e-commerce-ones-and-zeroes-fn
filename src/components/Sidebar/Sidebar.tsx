import React, { useState, useRef, ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Sidebar.scss";
import { useClickAway } from "react-use";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/loginSlice";
import { resetToken } from "../../redux/slices/tokenSlice";

interface SideBarProps{
  children: ReactNode,
  className?: string | ''
}

const SideBar: React.FC<SideBarProps> = ({children,className}) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    setOpen(false);
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout(event: any){
    dispatch(logoutUser())
    dispatch(resetToken())
    navigate('/')
  }

  const { id } = useParams<{ id?: string }>();

  return (
    <>
      <nav ref={ref} className={`SideBar ${className}`}>
        <ul>
          {children}
        </ul>
        
        <Link to={"/"} className="logout-link" onClick={handleLogout}>
          {" "}
          <IconContext.Provider value={{ className: "side-bar-icons" }}>
            <CiLogout />
          </IconContext.Provider>{" "}
          LogOut
        </Link>
      </nav>
    </>
  );
};

export default SideBar;
