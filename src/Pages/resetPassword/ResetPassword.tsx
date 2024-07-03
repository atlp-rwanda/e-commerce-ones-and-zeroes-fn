import React, { useState } from 'react';
import axios from 'axios';
import "./ResetPassword.scss";
import Header from '../../components/Header';
import { BACKEND_URL } from '../../constants/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const toastId = toast.loading("Verifying your email...");
    
    try {
      await axios.post(`${BACKEND_URL}/api/users/forgot-password`, { email });
      toast.update(toastId, {
        render: "Check your email to follow the reset the password",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeOnClick: true,
        hideProgressBar: false,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.update(toastId, {
          render: err.response?.data?.message || `Error: ${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          hideProgressBar: false,
        });
      } else {
        toast.update(toastId, {
          render: "Failed to send reset email. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeOnClick: true,
          hideProgressBar: false,
        });
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container_reset">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Resend</button>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default ResetPassword;
