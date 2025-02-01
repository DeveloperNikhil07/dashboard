"use client";
import { useState } from 'react';
import UserLogin from '../component/UserLogin';
import UserSignUp from '../component/SignUp';
import UserForgotPass from '../component/ForgetPassword';
export default function AuthenticationController() {
  const [userAuthentication, setUserAuthentication] = useState("UserLogin");
  const RenderAuthenticationForm = () => {
    switch (userAuthentication) {
      case "userLogin":
        return <UserLogin setUserAuthentication={setUserAuthentication} />;
      case "userSignup":
        return <UserSignUp setUserAuthentication={setUserAuthentication} />;
      case "forgotPassword":
        return <UserForgotPass setUserAuthentication={setUserAuthentication} />;
      default:
        return <UserLogin setUserAuthentication={setUserAuthentication} />;
    }
  }
  return (
    <>
      <section className="authentication-wrapper">
        <div className="container-fluid">
          <div className="row">
            {RenderAuthenticationForm()}
          </div>
        </div>
      </section>
    </>
  )
}
