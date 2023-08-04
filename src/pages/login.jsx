import React from "react";
import "./login.css";
import { GoogleLogin } from "@react-oauth/google";
import PlainHeader from "../components/1.Header/plainHeader";
import Footer from "../components/3.Footer/footer";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";

function Login(props) {

    const navigate = useNavigate();

  const responseGoogle = (response) => {
    //console.log(response);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, email, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      email: email,
      image: picture,
    };
    console.log(doc.email);
    props.setUser(doc);
    navigate("/");
  };

  return (
    <div>
      <PlainHeader />
      <div id="loginBody">
        <div id="loginContainer">
          <h1 style={{ marginBottom: 0 }}>Login</h1>
          <hr style={{ width: "60%" }}></hr>
          <div>
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className=""
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
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
