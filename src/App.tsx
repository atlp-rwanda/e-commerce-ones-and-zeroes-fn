import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Signup from './Pages/Signup/Signup';


const App: React.FC = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route  path='/signup' element={<Signup />}/>
    </Routes>
  </Router>
);

export default App;
