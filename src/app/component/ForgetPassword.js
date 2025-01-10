"use client";
import { useState } from 'react';

export default function ForgetPassword({ setUserAuthentication }) {
  const [ViewNewPassword, setViewNewPassword] = useState(false);
  const toggleNewPassPasswordVisibility = () => {
    setViewNewPassword(!ViewNewPassword);
  };

  const [viewConfPassword, setViewConfPassword] = useState(false);
  const toggleConfPasswordVisibility = () => {
    setViewConfPassword(!viewConfPassword);
  };

  const [error, setError] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [forgotUserData, setForgotUserData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const forgotInputHandle = (e) => {
    const { name, value } = e.target;
    setForgotUserData((prevData) => ({
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

    if (name === 'newPassword') {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      setError((prevError) => ({
        ...prevError,
        newPassword: passwordRegex.test(value)
          ? ''
          : 'Password must be at least 8 characters long and include both letters and numbers.'
      }));
    }

    if (name === 'confirmPassword') {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: value === forgotUserData.newPassword
          ? ''
          : 'Confirm password does not match the new password.'
      }));
    }
  };

  const handleforgotSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(forgotUserData.email)) {
      setError((prevError) => ({
        ...prevError,
        email: 'Please enter a valid email address.'
      }));
      return;
    }

    const NewpasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!NewpasswordRegex.test(forgotUserData.newPassword)) {
      setError((prevError) => ({
        ...prevError,
        newPassword: 'Password must be at least 8 characters long and include both letters and numbers.'
      }));
      return;
    }

    if (forgotUserData.newPassword !== forgotUserData.confirmPassword) {
      setError((prevError) => ({
        ...prevError,
        confirmPassword: 'Confirm password does not match the new password.'
      }));
      return;
    }

    // If all validations pass
    alert('Password reset successfully');
    // You can add your password reset logic here
  };

  return (
    <>
      <section className="login-form-wrapper forget-wrap">
        <div className="container">
          <div className="row">
            <div className="login-wrapper d-flex align-items-center justify-content-center">
              <div className="login-card section-title">
                <div className="user-icon text-center">
                  <i className="fa-solid fa-user-lock"></i>
                </div>
                <h2 className='text-center mb-2 fs-4 xl-line'>Forgot Password</h2>
                <p className='text-center mb-4 fw-medium fs-6'>Enter the email address associated with your account</p>
                <form className="form-wrapper" onSubmit={handleforgotSubmit}>
                  <div className="input-fields">
                    <label htmlFor="email" className="form-label">Enter Your Email</label>
                    <input
                      type='email'
                      placeholder='Enter Email'
                      className='form-control'
                      name="email"
                      value={forgotUserData.email}
                      onChange={forgotInputHandle}
                      style={{ borderColor: error.email ? 'red' : 'initial' }}
                    />
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  {error.email && <p className='form-error'>{error.email}</p>}

                  <div className="input-fields my-2">
                    <label htmlFor="new_password" className="form-label">New Password</label>
                    <input
                      type={ViewNewPassword ? 'text' : 'password'}
                      className="form-control"
                      id="new_password"
                      placeholder="New Password"
                      name="newPassword"
                      value={forgotUserData.newPassword}
                      onChange={forgotInputHandle}
                      style={{ borderColor: error.newPassword ? 'red' : 'initial' }}
                    />
                    {ViewNewPassword ? (
                      <i className="fa-solid fa-eye-slash eye" onClick={toggleNewPassPasswordVisibility}></i>
                    ) : (
                      <i className="fa-solid fa-eye eye" onClick={toggleNewPassPasswordVisibility}></i>
                    )}
                  </div>
                  {error.newPassword && <p className='form-error'>{error.newPassword}</p>}

                  <div className="input-fields">
                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                    <input
                      type={viewConfPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirm_password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={forgotUserData.confirmPassword}
                      onChange={forgotInputHandle}
                      style={{ borderColor: error.confirmPassword ? 'red' : 'initial' }}
                    />
                    {viewConfPassword ? (
                      <i className="fa-solid fa-eye-slash eye" onClick={toggleConfPasswordVisibility}></i>
                    ) : (
                      <i className="fa-solid fa-eye eye" onClick={toggleConfPasswordVisibility}></i>
                    )}
                  </div>
                  {error.confirmPassword && <p className='form-error'>{error.confirmPassword}</p>}

                  <button type="submit" className="btn login-btn cm-button" id="signup">Reset Password</button>
                </form>

                <div className="input-fields signup-acc remember-text mt-3 text-center">
                  <p>Please go back and log in again <button onClick={() => setUserAuthentication("userLogin")}>Login</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
