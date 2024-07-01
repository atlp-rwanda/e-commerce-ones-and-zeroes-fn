import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './Pages/Login/Login'
import Signup from './Pages/Signup/Signup';
import IsVerified from './components/IsVerifiedModal/IsVerified';
import UserVerificationFailed from './components/IsVerifiedModal/UserVerificationFailed';


import './styles/index.scss';
import Product from './components/AvailableProduct/product';
import ProductsPage from './components/AvailableProduct/productPage';

const App: React.FC = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={< Home/>} />
      <Route path="/login" element={<Login />} />
      <Route  path='/signup' element={<Signup />}/>
      <Route  path='/users/isVerified' element={<IsVerified />}/>
      <Route  path='/users/userVerifyFailed' element={<UserVerificationFailed />}/>
      <Route path=""/>
    </Routes>
  </Router>
);

export default App;
