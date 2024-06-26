import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IsVerified.scss';

const IsVerified: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <img src='https://res.cloudinary.com/dyfw0di8x/image/upload/v1718780876/success_check_ipk7cc.png' alt=""  className='success-check'/>
        <h2 className="modal-title">Your email has been successfully verified</h2>
        <p className="modal-message">
          Click button below to navigate to login page to start using your account
        </p>
        <button className="modal-login btn" onClick={handleLoginRedirect}>Navigate to Login</button>
      </div>
    </div>
  );
}

export default IsVerified;
