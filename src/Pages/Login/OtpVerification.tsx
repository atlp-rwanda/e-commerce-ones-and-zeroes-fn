import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyOtp } from "../../redux/slices/otpSlice";
import { RootState, AppDispatch } from "../../redux/store"; 
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";
import { decodeToken } from "react-jwt"; 
import "./Login.scss"

interface FormData {
  otp: string;
}

interface DecodedToken {
  userId: string;
  role: string;
}

const OtpVerification: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, isSucceeded, error } = useSelector((state: RootState) => state.otp);
  const [formData, setFormData] = useState<FormData>({ otp: "" });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const { otp } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!otp.trim()) errors.otp = "OTP is required";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    try {
      const resultAction = await dispatch(verifyOtp({ userId: userId || "", otp }));
      if (verifyOtp.fulfilled.match(resultAction)) {
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const decodedToken = decodeToken<DecodedToken>(token);
            if (decodedToken) {
              if (decodedToken.role === "buyer") {
                navigate(`/${decodedToken.userId}`);
              } else if (decodedToken.role === "seller") {
                navigate(`/sellerDash/${decodedToken.userId}`);
              } else if (decodedToken.role === "admin") {
                navigate(`/adminDash/${decodedToken.userId}`);
              }
            }
          } catch (error) {
            console.error("Invalid token", error);
          }
        } else {
          console.error("Token not found");
        }
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">OTP Verification</h2>
          <div className="form-group">
            <label htmlFor="otp"
            className="otpLabel">One Time Password (OTP) Have been sent Email, Enter The OTP below to </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              placeholder="Enter OTP"
              onChange={handleChange}
              className={`form-control ${formErrors.otp ? "is-invalid" : ""}`}
              required
            />
            {formErrors.otp && (
              <span className="errors">{formErrors.otp}</span>
            )}
          </div>
          <button
            type="submit"
            className={`btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
      <div className="left-wrapper">
      <h2>Welcome to OnesAndZeroes</h2>
      <img
        src="https://res.cloudinary.com/dyfw0di8x/image/upload/v1717535042/boproiezpxcdxmxs93rm.png"
        alt="This is vendor svg"
      />
      <h2>We Deliver Anywhere in the World</h2>
    
      </div>
      {loading && <Spinner />}
      {!loading && error && <Toast messageType={"error"} message={error.message} />}
    </div>
  );
};

export default OtpVerification;
