import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RootState } from "../../redux/store";
import { loginUser } from "../../redux/slices/loginSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
   
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});

  const {  email, password} = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);

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
    dispatch(loginUser({  email, password }));
  };

  useEffect(() => {
    if(isSucceeded) {
      navigate('/')
    }
  }, [isSucceeded])




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
         


          <button
            type="submit"
            className={`btn ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Login"}
          </button>

          <p className="or-with-google">Or</p>
          <div className="text-center">
            <button className="btn btn-google" type="button">
            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" className="google-icon"/>

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
      {!loading && error && <Toast messageType={"error"} message={error.message} />
        }
    </div>
  );
};

export default Login;
