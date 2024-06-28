import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { RootState } from "../../redux/store";
import { loginUser } from "../../redux/slices/loginSlice";
import { googleLoginUser } from "../../redux/slices/googleLoginSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./Login.scss";
import Spinner from "../../components/Spinner/Spinner";
import Toast from "../../components/Toast/Toast";
interface FormData {
  email: string;
  password: string;
}

const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const Login: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
  const { loading, isSucceeded, userInfo, error } = useSelector(
    (state: RootState) => state.login
  );
  const { isError, isSuccessfully } = useSelector(
    (state: RootState) => state.googleLogin
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};
    if (!password.trim()) errors.password = "Password is required";
    else if (!validatePassword(password))
      errors.password = "Password is not strong";
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
    dispatch(loginUser({ email, password }));
    
  };

  const loginViaGoogle = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`
          }
        });
        const { email, given_name, family_name } = userInfo.data;
        dispatch(googleLoginUser({ email, given_name, family_name }));
       
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    onError: errorResponse => {
      console.error('Google login failure:', errorResponse);
    },
  });

  useEffect(() => {
    if (isSuccessfully || isSucceeded) {
      navigate('/', { state: { from: { pathname: '/login' } } });
    }

}, [isSuccessfully, isSucceeded])

  return (
    <div className="container">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="form-title">Login into your account</h2>
          
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
               <Link to={'/reset'}>Forgot password?</Link>


          <button
            type="submit"
            className={`btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>

          <p className="or-with-google">Or</p>
          <div className="text-center">
            <button className="btn btn-google" type="button" onClick={() => loginViaGoogle()}>
              <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" className="google-icon" />
              Continue with Google
            </button>
          </div>
          <div className="text-right">
            <p>
              Don't have an account? <Link to={'/signup'}>Signup</Link>
            </p>
          </div>
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
      {!loading && isError && <Toast messageType={"error"} message={isError.message} />}
    </div>
  );
};

export default Login;
