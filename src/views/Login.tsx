import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => (
  <div>
    <h1>Login Page</h1>
    <p>Please login to continue.</p>

    <p>You dont have account, please clieck here to   <Link to='/signup'>Signup</Link></p>

   
  </div>
);

export default Login;
