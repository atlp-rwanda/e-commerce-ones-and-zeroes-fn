import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup';
import IsVerified from './components/IsVerifiedModal/IsVerified';
import UserVerificationFailed from './components/IsVerifiedModal/UserVerificationFailed';
import Cart from './components/cart/cart';
import FakeProduct from './components/cart/fakeproduct';
import FakeLogin from './views/fakeLogin';


const App: React.FC = () => (
  <Router>
    
    <Routes>
    <Route path="/" element={<Home />} />
    {/* <Route path="/" element={<FakeProduct />} /> */}

      {/* <Route path="/" element={<Cart />} /> */}
      <Route path="/login" element={<FakeLogin />} />
      <Route  path='/signup' element={<Signup />}/>
      <Route  path='/users/isVerified' element={<IsVerified />}/>
      <Route  path='/users/userVerifyFailed' element={<UserVerificationFailed />}/>
    </Routes>
  </Router>
);

export default App;
