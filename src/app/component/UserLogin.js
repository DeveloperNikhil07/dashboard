"use client";
import { useState } from 'react';

export default function Login({ setUserAuthentication }) {
  const [error, setError] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserData, setLoginUserData] = useState({
    email: '',
    password: ''
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginInputHandle = (e) => {
    const { name, value } = e.target;
    setLoginUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    // Real-time validation
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setError((prevError) => ({
        ...prevError,
        email: emailRegex.test(value) ? '' : 'Please enter a valid email address.'
      }));
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      const passwordValid = passwordRegex.test(value);
      setError((prevError) => ({
        ...prevError,
        password: passwordValid ? '' : 'Password must be 8+ characters, with letters and numbers.'
      }));
    }
    
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError({ email: '', password: '' });

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(loginUserData.email)) {
      setError((prevError) => ({
        ...prevError,
        email: 'Please enter a valid email address.'
      }));
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(loginUserData.password)) {
      setError((prevError) => ({
        ...prevError,
        password: 'Password must be at least 8 characters long and include both letters and numbers.'
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
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <h2 className='text-center mb-2 fs-4 xl-line'>Welcome!</h2>
                <p className='text-center mb-4 fw-medium'>Sign in to your account</p>
                <form className="form-wrapper position-relative" onSubmit={handleLoginSubmit}>
                  <div className="input-fields">
                    <label htmlFor="email" className="form-label">Email*</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email*"
                      name="email"
                      value={loginUserData.email}
                      onChange={loginInputHandle}
                      style={{ borderColor: error.email ? 'red' : 'initial' }}
                    />
                    {error.email && <p className='form-error'>{error.email}</p>}
                  </div>

                  <div className="input-fields my-2">
                    <label htmlFor="password" className="form-label">Password*</label>
                    <input
                      type={!showPassword ? 'password' : 'text'}
                      className="form-control"
                      id="password"
                      placeholder="Enter Password*"
                      name="password"
                      value={loginUserData.password}
                      onChange={loginInputHandle}
                      style={{ borderColor: error.password ? 'red' : 'initial' }}
                    />
                    {showPassword ? (
                      <i className="fa-solid fa-eye-slash eye" onClick={togglePasswordVisibility}></i>
                    ) : (
                      <i className="fa-solid fa-eye eye" onClick={togglePasswordVisibility}></i>
                    )}
                  </div>

                  <div className="input-fields remember-text mt-2 text-end">
                    <button type="button" onClick={() => setUserAuthentication("forgotPassword")}>
                      Forgot Password?
                    </button>
                  </div>

                  {error.password && <p className='form-error'>{error.password}</p>}

                  <button type="submit" className="btn login-btn cm-button">Login</button>
                </form>

                {/* Sign Up */}
                <div className="signup-acc mt-3 text-center">
                  <p>Don't have an account? <button type="button" onClick={() => setUserAuthentication("userSignup")}>Create an account</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
