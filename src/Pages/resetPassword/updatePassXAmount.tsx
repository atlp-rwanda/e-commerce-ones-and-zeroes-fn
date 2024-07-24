import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.scss";
import Header from "../../components/Header";
import { BACKEND_URL } from "../../constants/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePasswordAfterXAmountOfTime: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("q");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const updateToast = (
    toastId: any,
    message: string,
    type: "success" | "error"
  ) => {
    toast.update(toastId, {
      render: message,
      type: type,
      isLoading: false,
      autoClose: 5000,
      closeOnClick: true,
      hideProgressBar: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Changing Password...");

    if (password !== newPassword) {
      setError(true);
      setNotification("Passwords must match!");
      updateToast(toastId, "Passwords must match!", "error");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/users/reset-password/${token}`, {
        newPassword,
      });
      updateToast(
        toastId,
        "Password changed successfully, please log in",
        "success"
      );
      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/login");
      }, 2000); // 2 second delay
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || `Error: ${err.message}`;
        updateToast(toastId, message, "error");
      } else {
        updateToast(
          toastId,
          "Failed to send the email, please try again",
          "error"
        );
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordStrength(getPasswordStrength(value));
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
    setPasswordsMatch(password === value);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.info("Copying and pasting is not allowed in this field.");
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  const getPasswordStrength = (password: string): string => {
    if (validatePassword(password)) return "Strong";
    return "Weak";
  };

  return (
    <>
      <div className="resetPasswordContainer">
        <div style={{color:'#0F1848', position:'absolute', top:'10px',fontSizeAdjust:'small', display:'flex'}} className="alert">
         
        <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/228BE6/error--v1.png" alt="error--v1"/>
          <p> <b>It's been a while since you last updated your password. For your
            security, please take a moment to change it now. Keeping your
            password up-to-date helps protect your account from unauthorized
            access. Thank you for your cooperation!
          </b>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label>New password: </label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
              value={password}
              placeholder="Enter new password"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          {passwordStrength && (
            <p
              className={`password-strength ${passwordStrength.toLowerCase()}`}
            >
              Password strength: {passwordStrength}
            </p>
          )}
          <br />
          <label>Confirm New Password</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              onChange={handleNewPasswordChange}
              onPaste={handlePaste}
              value={newPassword}
              placeholder="Confirm password"
              required
            />
            <span
              className="password-toggle-icon"
              onClick={toggleConfirmPasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </span>
          </div>
          {!passwordsMatch && (
            <p className="passwords-match-error">Passwords must match!</p>
          )}
          <br />
          <button type="submit" className="btn-change">
            Change
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdatePasswordAfterXAmountOfTime;
