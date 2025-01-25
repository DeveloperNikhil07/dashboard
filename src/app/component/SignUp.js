"use client";
import { useState } from 'react';
import SuccessGreetPopup from '../component/SuccessGreetPopup'
import { UserSignUp } from '../api/UserLoginAuthenticationApi/route'

export default function SignUp({ setUserAuthentication }) {
    const [successPopup, setSuccessPopup] = useState(false);
    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [error, setError] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const [signUpUserData, setSignUpUserData] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
            setError((prevError) => ({
                ...prevError,
                password: passwordRegex.test(value)
                    ? ''
                    : 'Password must be at least 8 characters long and include both letters and numbers.',
            }));
        }

        if (name === 'fullname') {
            setError((prevError) => ({
                ...prevError,
                fullname: value.length >= 3 ? '' : 'Full name must be at least 3 characters.',
            }));
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setError({
            fullname: '',
            email: '',
            password: '',
        });

        // Validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailRegex.test(signUpUserData.email)) {
            setError((prevError) => ({
                ...prevError,
                email: 'Please enter a valid email address.',
            }));
            return;
        }

        if (!passwordRegex.test(signUpUserData.password)) {
            setError((prevError) => ({
                ...prevError,
                password: 'Password must be at least 8 characters long and include both letters and numbers.',
            }));
            return;
        }

        if (signUpUserData.fullname.length < 3) {
            setError((prevError) => ({
                ...prevError,
                fullname: 'Full name must be at least 3 characters.',
            }));
            return;
        }

        try {
            const response = await UserSignUp(signUpUserData);
            console.log(response);
            if (response.status === 200 || response.message === 'User created successfully') {
                setSuccessPopup(true);
            }
        } catch (err) {
            console.log(err);
            setUserAlreadyExists(true);
        }
    };

    // Greet popup close 
    const popupClose = () => {
        setSuccessPopup(false);
        setUserAlreadyExists(false);
        window.location.reload();
    }

    return (
        <section className="login-form-wrapper">
            <div className="container">
                <div className="row">
                    <div className="login-wrapper d-flex align-items-center justify-content-center">
                        <div className="login-card section-title">
                            <div className="user-icon text-center">
                                <i className="fa-solid fa-user-tie"></i>
                            </div>
                            <h2 className="text-center mb-2 fs-4 xl-line">Sign Up</h2>
                            <p className="text-center mb-4 fw-medium fs-6">Welcome to our platform!</p>
                            <form className="form-wrapper" onSubmit={handleSignUpSubmit}>
                                <div className="input-fields">
                                    <label htmlFor="fullname" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        placeholder="Enter Name"
                                        name="fullname"
                                        value={signUpUserData.fullname}
                                        onChange={signUpInputHandle}
                                        style={{ borderColor: error.fullname ? 'red' : 'initial' }}
                                    />
                                    <i className="fa fa-user-tie"></i>
                                </div>
                                {error.fullname && <p className="form-error">{error.fullname}</p>}

                                <div className="my-2 input-fields">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={signUpUserData.email}
                                        onChange={signUpInputHandle}
                                        style={{ borderColor: error.email ? 'red' : 'initial' }}
                                    />
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                {error.email && <p className="form-error">{error.email}</p>}

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
                                {error.password && <p className="form-error">{error.password}</p>}

                                <button type="submit" className="btn login-btn cm-button" id="signup">Sign Up</button>
                            </form>
                            <div className="input-fields signup-acc remember-text mt-3 text-center">
                                <p>You already have an account? <button onClick={() => setUserAuthentication("userlogin")}>Login</button></p>
                            </div>
                        </div>
                    </div>
                    {userAlreadyExists && (
                        <SuccessGreetPopup
                            popupClose={popupClose}
                            IconImage="/assets/images/confused.png"
                            Greetheading="Failed"
                            GreetDesc="User already exists. Please login!"
                        />
                    )}
                    {successPopup && (
                        <SuccessGreetPopup
                            popupClose={popupClose}
                            IconImage="/assets/images/check.png"
                            Greetheading="Success"
                            GreetDesc="Your Account has been successfully created!"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
