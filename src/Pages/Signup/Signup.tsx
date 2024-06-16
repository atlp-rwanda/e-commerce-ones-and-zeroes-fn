import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser, googleLoginUser } from '../../redux/slices/AuthSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './Signup.scss';
import Spinner from '../../components/Spinner/Spinner';
import Toast from '../../components/Toast/Toast';
import { BACKEND_URL } from '../../constants/api';
// import reactsvg from '../../assets/images/'

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const Signup: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();
    const { loading, isSucceeded, userInfo, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
    const navigate =  useNavigate();

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors: Partial<FormData> = {};
        if (!firstName.trim()) errors.firstName = 'First name is required';
        if (!lastName.trim()) errors.lastName = 'Last name is required';
        if (!email.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        if (!password.trim()) errors.password = 'Password is required';
        else if (!validatePassword(password)) errors.password = 'Password is not strong';
        if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';
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
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        }
    }, [isSucceeded]);

    const loginViaGoogle = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const userInfo = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                });
                console.log(tokenResponse.access_token)
                
                console.log('Google login success:', userInfo.data);
                dispatch(googleLoginUser(userInfo.data));
                navigate('/')
                
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
        onError: errorResponse => {
            console.error('Google login failure:', errorResponse);
        },
    });
       
    return (
        <div className="container">
            <div className="left-wrapper">
                <h2>Welcome to OnesAndZeroes</h2>
                <img src='https://res.cloudinary.com/dyfw0di8x/image/upload/v1717535042/boproiezpxcdxmxs93rm.png' alt="This is vendor svg" />
                <h2>We Deliver Anywhere in the World</h2>
            </div>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit} className="form">
                    <h2 className='form-title'>Create new account</h2>
                    <div className="form-group">
    <label htmlFor="firstName">First Name</label>
    <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        placeholder='First Name'
        onChange={handleChange}
        className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
        required
    />
    {formErrors.firstName && <span className="errors">{formErrors.firstName}</span>}
</div>
<div className="form-group">
    <label htmlFor="lastName">Last Name</label>
    <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        placeholder='Last Name'
        onChange={handleChange}
        className={`form-control ${formErrors.lastName ? 'is-invalid' : ''}`}
        required
    />
    {formErrors.lastName && <span className="errors">{formErrors.lastName}</span>}
</div>
<div className="form-group">
    <label htmlFor="email">Email</label>
    <input
        type="email"
        id="email"
        name="email"
        value={email}
        placeholder='Email'
        onChange={handleChange}
        className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
        required
    />
    {formErrors.email && <span className="errors">{formErrors.email}</span>}
</div>
<div className="form-group">
    <label htmlFor="password">Password</label>
    <input
        type="password"
        id="password"
        name="password"
        value={password}
        placeholder='Password'
        onChange={handleChange}
        className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
        required
    />
    {formErrors.password && <span className="errors">{formErrors.password}</span>}
</div>
<div className="form-group">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        placeholder='Confirm Password'
        onChange={handleChange}
        className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
        required
    />
    {formErrors.confirmPassword && <span className="errors">{formErrors.confirmPassword}</span>}
</div>

                    <button type="submit" className={`btn ${loading ? 'loading' : ''}`} disabled={loading}>
                        {loading ? 'Processing...' : 'Sign Up'}
                    </button>
                    <p className='or-with-google'>Or</p>
                    <div className="text-center">
                    <button className="btn btn-google" type='button' onClick={() => loginViaGoogle()} >
                            Continue with Google
                        </button>
                    </div>
                    <div className="text-right">
                        <p>Already have an account? <Link to={"/login"} className='link'>Login</Link></p>
                    </div>
                </form>
            </div>
            {loading && <Spinner />}
            {!loading && (isSucceeded ? 
            <Toast messageType={'success'} message={userInfo?.message} /> : 
            error && <Toast messageType={'error'} message={error.message} />)}
        </div>
    );
};

export default Signup;
