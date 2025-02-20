"use client";
import { useState } from "react";
import { login } from "../../../pages/api/route";
import SuccessGreetPopup from "./SuccessGreetPopup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';


export default function Login({ setUserAuthentication }) {
  const router = useRouter();
  const LoginNotify = () => toast("Wow so easy!");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserData, setLoginUserData] = useState({ email: "", password: "" });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginInputHandle = (e) => {
    const { name, value } = e.target;
    setLoginUserData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "email") {
      setError((prev) => ({
        ...prev,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? "" : "Please enter a valid email address."
      }));
    }
    if (name === "password") {
      setError((prev) => ({
        ...prev,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? "" : "Password must be 8+ characters, with letters and numbers."
      }));
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (error.email || error.password) return;
    try {
      setLoading(true);
      const response = await login(loginUserData.email, loginUserData.password);
      console.log(response)
      if (response?.isLoginSuccess) {
        const expiresInMinutes = 60;
        Cookies.set("sessionId", response.data.token, { expires: expiresInMinutes / 1440 });
        Cookies.set("LoginUser", JSON.stringify(response.data?.user), { expires: expiresInMinutes / 1440 });
        router.push("/dashboard");
        setTimeout(() => {
          router.push("/login");
        }, expiresInMinutes * 60 * 1000);

      } else {
        alert("Login Failed");
        Object.keys(Cookies.get()).forEach((cookie) => Cookies.remove(cookie));
      }
    } catch (error) {
      console.log(error);
      setUserNotFound(true)
    } finally {
      setLoading(false);
    }
  };

  const popupClose = () => {
    setUserNotFound(false);
    window.location.reload();
  }

  return (
    <section className="login-form-wrapper">
      <div className="container">
        <div className="row">
          <div className="login-wrapper d-flex align-items-center justify-content-center">
            <div className="login-card section-title">
              <div className="user-icon text-center">
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>
              <h2 className="text-center mb-2 fs-4 xl-line">Welcome!</h2>
              <p className="text-center mb-4 fw-medium">Log in to your account</p>
              <form className="form-wrapper position-relative" onSubmit={handleLoginSubmit}>
                <div className="input-fields">
                  <label htmlFor="email" className="form-label">Email*</label>
                  <input type="email" className="form-control" id="email" placeholder="Enter Email*" name="email" value={loginUserData.email} onChange={loginInputHandle} style={{ borderColor: error.email ? "red" : "initial" }} />
                  {error.email && <p className="form-error">{error.email}</p>}
                </div>
                <div className="input-fields my-2">
                  <label htmlFor="password" className="form-label">Password*</label>
                  <input type={showPassword ? "text" : "password"} className="form-control" id="password" placeholder="Enter Password*" name="password" value={loginUserData.password} onChange={loginInputHandle} style={{ borderColor: error.password ? "red" : "initial" }} />
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} eye`} onClick={togglePasswordVisibility}></i>
                </div>
                <div className="input-fields remember-text mt-2 text-end">
                  <button type="button" onClick={() => setUserAuthentication("forgotPassword")}>Forgot Password?</button>
                </div>
                {error.password && <p className="form-error">{error.password}</p>}
                <button type="submit" className="btn login-btn cm-button">{loading ? "Logging in..." : "Login"}</button>
              </form>
              <div className="signup-acc mt-3 text-center">
                <p>Don't have an account? <button type="button" onClick={() => setUserAuthentication("userSignup")}>Create an account</button></p>
              </div>
              {userNotFound && (
                <SuccessGreetPopup
                  popupClose={popupClose}
                  IconImage="/assets/images/confused.png"
                  Greetheading="Failed"
                  GreetDesc="User not found please try again !!"
                />
              )}
              {loginSuccess && (
                <SuccessGreetPopup popupClose={() => setLoginSuccess(false)} IconImage="/assets/images/check.png" Greetheading="Success" GreetDesc="Welcome Back!" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
