import React ,{useState,useRef}from "react";
import { Link , useLocation} from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { CiLogout } from "react-icons/ci"; 
import { IconContext } from "react-icons";
import { GiHamburgerMenu } from "react-icons/gi"
import '../styles/sidebar.scss';
import { useClickAway } from "react-use";

 const SellerSideBar:React.FC=()=>{
    const location=useLocation()
    const {pathname}=location;
    const splitLocation=pathname.split('/');
    const [open,setOpen]=useState(false);
    const ref=useRef(null)
    const toggleSideBar=()=>{
        setOpen(true)
    }
    useClickAway(ref,()=>{
        setOpen(false)
    })
    
     return(
       <>
      <button onClick={toggleSideBar}><IconContext.Provider value={{className:"side-bar-menu-icon"}}>
          <GiHamburgerMenu />
      </IconContext.Provider></button>
      <nav ref={ref} className="sellerSideBar">
        {open &&  <>
           <ul>
             <li><Link to={'/'}>
                <IconContext.Provider  value={{className:"side-bar-icons"}}><RiDashboardHorizontalFill/></IconContext.Provider>
                <span>Dashboard</span>
                 </Link></li>
                 <li ><Link to={'/'}>
                 <IconContext.Provider value={{className:"side-bar-icons"}}>
                     <IoIosHome />
                 </IconContext.Provider><span>Analytics</span>
                 </Link></li>
                 <li> <Link to={'/'}>
                 <IconContext.Provider value={{className:"side-bar-icons"}}>
                     <BsCart2 />
                 </IconContext.Provider><span>Collection</span>
                 </Link></li>
                 <li><Link to={'/'}>
                 <IconContext.Provider value={{className:"side-bar-icons"}}>
                     <FaShoppingBag />
                 </IconContext.Provider><span>Products</span>
                 </Link></li>
            </ul>
         <Link to={'/'}> <IconContext.Provider value={{className:"side-bar-icons"}}>
             <CiLogout />
         </IconContext.Provider> LogOut</Link>
         </>
 }
        </nav>
        </>
     )
}

export default SellerSideBar;