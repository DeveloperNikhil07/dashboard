"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function SignUp({ setUserAuthentication }) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [error, setError] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const [signUpUserData, setSignUpUserData] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const signUpInputHandle = (e) => {
        const { name, value } = e.target;
        setSignUpUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Real-time validation
        if (name === 'email') {
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            setError((prevError) => ({
                ...prevError,
                email: emailRegex.test(value) ? '' : 'Please enter a valid email address.',
            }));
        }

        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const passwordValid = passwordRegex.test(value);
            setError((prevError) => ({
                ...prevError,
                password: passwordValid ? '' : 'Password must be at least 8 characters long and include both letters and numbers.',
            }));
        }

        if (name === 'userName') {
            setError((prevError) => ({
                ...prevError,
                userName: value.length >= 3 ? '' : 'Full name must be at least 3 characters.',
            }));
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        // Reset error states before validating again
        setError({
            userName: '',
            email: '',
            password: '',
        });

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(signUpUserData.email)) {
            setError((prevError) => ({
                ...prevError,
                email: 'Please enter a valid email address.',
            }));
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(signUpUserData.password)) {
            setError((prevError) => ({
                ...prevError,
                password: 'Password must be at least 8 characters long and include both letters and numbers.',
            }));
            return;
        }

        // Full name validation
        if (signUpUserData.userName.length < 3) {
            setError((prevError) => ({
                ...prevError,
                userName: 'Full name must be at least 3 characters.',
            }));
            return;
        }

        alert('Form submitted successfully');
    };

    return (
        <>
            <section className="login-form-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="login-wrapper d-flex align-items-center justify-content-center">
                            <div className="login-card section-title">
                                <div className="user-icon text-center">
                                    <i className="fa-solid fa-user-tie"></i>
                                </div>
                                <h2 className='text-center mb-2 fs-4 xl-line'>Sign Up</h2>
                                <p className='text-center mb-4 fw-medium fs-6'>Welcome to our platform!</p>
                                <form className="form-wrapper" onSubmit={handleSignUpSubmit}>
                                    <div className="input-fields">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter Name"
                                            name="userName"
                                            value={signUpUserData.userName}
                                            onChange={signUpInputHandle}
                                            style={{ borderColor: error.userName ? 'red' : 'initial' }}
                                        />
                                        <i className="fa fa-user-tie"></i>
                                    </div>
                                    {error.userName && <p className='form-error'>{error.userName}</p>}

                                    <div className="my-2 input-fields">
                                        <label htmlFor="email_address" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email_address"
                                            placeholder="Enter Email"
                                            name="email"
                                            value={signUpUserData.email}
                                            onChange={signUpInputHandle}
                                            style={{ borderColor: error.email ? 'red' : 'initial' }}
                                        />
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    {error.email && <p className='form-error'>{error.email}</p>}

                                    <div className="input-fields">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter Password"
                                            name="password"
                                            value={signUpUserData.password}
                                            onChange={signUpInputHandle}
                                            style={{ borderColor: error.password ? 'red' : 'initial' }}
                                        />
                                        {showPassword ? (
                                            <i className="fa-solid fa-eye-slash eye" onClick={togglePasswordVisibility}></i>
                                        ) : (
                                            <i className="fa-solid fa-eye eye" onClick={togglePasswordVisibility}></i>
                                        )}
                                    </div>
                                    {error.password && <p className='form-error'>{error.password}</p>}

                                    <button type="submit" className="btn login-btn cm-button" id="signup">Sign Up</button>
                                </form>

                                <div className="input-fields signup-acc remember-text mt-3 text-center">
                                    <p>You already have an account? <button onClick={() => setUserAuthentication("userlogin")}>Login</button></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
