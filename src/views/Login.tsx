import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () =>{
  const userId="ff27da2d-a47f-4798-b278-419c9a6fc905" 
  return (

  <div>
    <h1>Login Page</h1>
    <p>Please login to continue.</p>
    <Link to={`/UserDash/${userId}`}>login</Link>
  </div>
);
}
export default Login;
