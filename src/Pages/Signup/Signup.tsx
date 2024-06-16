import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RootState } from "../../redux/store";
import { signupUser } from "../../redux/slices/SignupSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import "./Signup.scss";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const Signup: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { loading, isSucceeded, userInfo, error } = useSelector(
    (state: RootState) => state.signup
  );
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!firstName.trim()) errors.firstName = "First name is required";
    if (!lastName.trim()) errors.lastName = "Last name is required";
    if (!password.trim()) errors.password = "Password is required";
    else if (!validatePassword(password))
      errors.password = "Password is not strong";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    dispatch(signupUser({ firstName, lastName, email, password }));
  };

  useEffect(() => {
    if (isSucceeded) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [isSucceeded]);

  return (
    <div className="container">
      <div className="left-wrapper">
        <h2>Welcome to OnesAndZeroes</h2>
        <img
          src="https://res.cloudinary.com/dyfw0di8x/image/upload/v1717535042/boproiezpxcdxmxs93rm.png"
          alt="This is vendor svg"
        />
        <h2>We Deliver Anywhere in the World</h2>
      </div>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Create new account</h2>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="First Name"
              onChange={handleChange}
              className={`form-control ${
                formErrors.firstName ? "is-invalid" : ""
              }`}
              required
            />
            {formErrors.firstName && (
              <span className="errors">{formErrors.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              onChange={handleChange}
              className={`form-control ${
                formErrors.lastName ? "is-invalid" : ""
              }`}
              required
            />
            {formErrors.lastName && (
              <span className="errors">{formErrors.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
              className={`form-control`}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
                className={`form-control ${
                  formErrors.password ? "is-invalid" : ""
                }`}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {formErrors.password && (
              <span className="errors">{formErrors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className={`form-control ${
                  formErrors.confirmPassword ? "is-invalid" : ""
                }`}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {formErrors.confirmPassword && (
              <span className="errors">{formErrors.confirmPassword}</span>
            )}
          </div>

          <button
            type="submit"
            className={`btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          <p className="or-with-google">Or</p>
          <div className="text-center">
            <button className="btn btn-google" type="button">
              <img
                src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                alt=""
                className="google-icon"
              />
              Continue with Google
            </button>
          </div>
          <div className="text-right">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
      {loading && <Spinner />}
      {!loading &&
        (isSucceeded ? (
          <Toast
            messageType={"success"}
            message={`${userInfo?.message} Go and check your email to veify your account`}
          />
        ) : (
          error && <Toast messageType={"error"} message={error.message} />
        ))}
    </div>
  );
};

export default Signup;
