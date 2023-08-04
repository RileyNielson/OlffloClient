import React from "react";
import "./login.css";
import { useGoogleLogin } from "@react-oauth/google";
import PlainHeader from "../components/1.Header/plainHeader";
import Footer from "../components/3.Footer/footer";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      props.setUser(tokenResponse);
      navigate("/home");
    },
  });

  return (
    <div>
      <PlainHeader />
      <div id="loginBody">
        <div id="loginContainer">
          <h1 style={{ marginBottom: 0 }}>Login</h1>
          <hr style={{ width: "60%" }}></hr>
          <div>
            <button
              id="googleLoginButton"
              style={{ marginTop: "20px" }}
              onClick={() => login()}
            >
              Sign in with Google{" "}
            </button>
          </div>
        </div>
      </div>
      <div id="homeFooter">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
