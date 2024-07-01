import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { faShippingFast, faLock, faUndo, faHeadset, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/Home.scss';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toast from '../components/Toast/Toast';
import { useLocation } from 'react-router-dom';
import FakeProduct from '../components/cart/fakeproduct';

const Home: React.FC = () => {
  const location = useLocation();

  const { isSuccessfully } = useSelector(
    (state: RootState) => state.googleLogin
  );
  const { isSucceeded } = useSelector(
    (state: RootState) => state.login
  );

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const state = location.state as { from?: { pathname: string } };
    const previousRoute = state?.from?.pathname;
    if (previousRoute === '/login') {
      
      
      setShowToast(true)
    }

  }, [location, isSuccessfully, isSucceeded]);

  return (
    <div>
      <Header />
      <div className="home">
        <div className="main-content">
          <div className="sidebar">
            <div className="search-box-wrapper">
              <input type="text" placeholder="Search..." className='search-box' />
              <button className="search-button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="new-arrivals">
              <h2>New Arrivals</h2>
            </div>
            <div className="carousel-wrapper">
              <Carousel />
            </div>
          </div>
        </div>
        <div className="badges">
          <div className="badge">
            <FontAwesomeIcon icon={faShippingFast} size="2x" />
            <p>FREE SHIPPING</p>
          </div>
          <div className="badge">
            <FontAwesomeIcon icon={faLock} size="2x" />
            <p>SECURE PAYMENT</p>
          </div>
          <div className="badge">
            <FontAwesomeIcon icon={faUndo} size="2x" />
            <p>30 DAY RETURN</p>
          </div>
          <div className="badge">
            <FontAwesomeIcon icon={faHeadset} size="2x" />
            <p>24/7 SUPPORT</p>
          </div>
        </div>
        {showToast && isSuccessfully || isSucceeded && <Toast messageType={"success"} message={'Successfully logged in'} />}
      </div>
       <FakeProduct />
    </div>
  );
};
   
 


export default Home;
