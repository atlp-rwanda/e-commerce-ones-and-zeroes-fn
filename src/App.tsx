import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup';
import IsVerified from './components/IsVerifiedModal/IsVerified';
import UserVerificationFailed from './components/IsVerifiedModal/UserVerificationFailed';
import ResetPassword from './Pages/resetPassword/ResetPassword';
import ResetPasswordPage from './Pages/resetPassword/ResetPasswordPage';
import Header from "./components/userDashHeader/UserHeader";


import FakeLogin from "./views/fakeLogin";
import BillingAddress from "./components/billingAddress/billingaddress";

import UserDash from "./views/userDash";
import MyAccount from "./views/MyAccount";
import UpdateProfile from "./views/updateprofile";
import UpdateBilling from "./views/updatebilling";
import SampleAdmin from './views/sampleAdmin';
import SampleSeller from './views/sampleSeller';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/:id" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route  path='/signup' element={<Signup />}/>
      <Route  path='/users/isVerified' element={<IsVerified />}/>
      <Route  path='/users/userVerifyFailed' element={<UserVerificationFailed />}/>
      <Route path='/reset' element={<ResetPassword/>} />
      <Route path='/reset/new-password' element={<ResetPasswordPage/>} />
      
      

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
