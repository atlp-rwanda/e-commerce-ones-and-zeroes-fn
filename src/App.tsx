import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import IsVerified from './components/IsVerifiedModal/IsVerified';
import UserVerificationFailed from './components/IsVerifiedModal/UserVerificationFailed';
import ResetPassword from './Pages/resetPassword/ResetPassword';
import ResetPasswordPage from './Pages/resetPassword/ResetPasswordPage';
import WishlistPage from './components/wishlist/wishlistPage'
import Header from "./components/userDashHeader/UserHeader";
import RecommendProduct from './components/productReco/productRecommand';
import BillingAddress from "./components/billingAddress/billingaddress";
import OtpVerification from './Pages/Login/OtpVerification';
import UserDash from "./views/userDash";
import MyAccount from "./views/MyAccount";
import UpdateProfile from "./views/updateprofile";
import UpdateBilling from "./views/updatebilling";
import SampleAdmin from './views/sampleAdmin';
import SampleSeller from './views/sampleSeller';

import ProductPage from "./Pages/Product/productPage";


import Cart from './components/cart/cart';
import FakeProduct from './components/cart/fakeproduct';
import FakeLogin from './views/fakeLogin';

import Checkout from './Pages/Checkout/Checkout';
import Orders from './components/Orders/Orders';
import SingleProductPage from './Pages/SingleProductPage/SingleProductPage';
import BuySingleItem from './Pages/BuySingleItem/BuySingleItem';
import AddProduct from './Pages/BuyerDashboard/BuyerDashboard';
import UpdatePasswordAfterXAmountOfTime from './Pages/resetPassword/updatePassXAmount';


const App: React.FC = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/:id" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:userId" element={<OtpVerification />} />
      <Route  path='/signup' element={<Signup />}/>
      <Route  path='/users/isVerified' element={<IsVerified />}/>
      <Route  path='/users/userVerifyFailed' element={<UserVerificationFailed />}/>
      <Route  path='/users/dashboard' element={<AddProduct />}/>
      <Route path='/product/:productId/checkout' element={<BuySingleItem />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/order' element={<Orders />} />
      <Route path='/reset' element={<ResetPassword/>} />
      <Route path='/reset/new-password' element={<ResetPasswordPage />} />
      <Route path='/update/new-password' element={<UpdatePasswordAfterXAmountOfTime />} />

      <Route path='/wishlist' element={<WishlistPage />} />
      <Route path='/product/:productId' element={<ProductPage/>}/>
      

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users/isVerified" element={<IsVerified />} />
      <Route
        path="/users/userVerifyFailed"
        element={<UserVerificationFailed />}
      />
      <Route path="/UserDash/:id" element={<UserDash />} />

      <Route path="/MyAccount/:id" element={<MyAccount />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
      <Route path="/updatebilling" element={<UpdateBilling />} />
      <Route path='/adminDash/:id' element={<SampleAdmin/>} />
      <Route path='/sellerDash/:id' element={<SampleSeller/>} />

    </Routes>
  </Router>
);

export default App;
