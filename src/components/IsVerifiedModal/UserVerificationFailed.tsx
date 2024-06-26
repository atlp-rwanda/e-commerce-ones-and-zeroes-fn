import React from 'react';
import './IsVerified.scss';

const UserVerificationFailed: React.FC = () => {


  return (
    <div className="modal">
      <div className="modal-content">
        <img src='https://res.cloudinary.com/dyfw0di8x/image/upload/v1718955832/onesAndzeroes/error_failure_icon_jrj9xi.jpg' alt=""  className='success-check'/>
        <h2 className="modal-title">Your verrification process was not successfully</h2>
        <p className="modal-message">
          Go in your email and click verify button again. <br /> <strong> If this problem persist , Please contact us on email</strong>
        </p>
      </div>
    </div>
  );
}

export default UserVerificationFailed;
