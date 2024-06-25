import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Users from './views/Users';

const App: React.FC = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Users" element={<Users />} />
    </Routes>
  </Router>
);

export default App;
