import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import "../pages/login.css";
import { GoogleLogin } from "@react-oauth/google";
import PlainHeader from "../components/1.Header/plainHeader";
import Footer from "../components/3.Footer/footer";
import { FcGoogle } from "react-icons/fc";
import jwt_decode from "jwt-decode";


export default function SignUp(props) {
  const [form, setForm] = useState({
    projects: [],
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  const updateForm = (value) => {
    setForm((prev) => {
      console.log(value);
      onSubmit({ ...prev, ...value })
      return { ...prev, ...value };
    })
  }

  // This function will handle the submission.
  async function onSubmit(newPerson) {
    // When a post request is sent to the create url, we'll add a new record to the database.
    //const newPerson = { ...form };
    props.setUser(newPerson);
    console.log(newPerson);

    await fetch("http://localhost:5050/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ projects: [] });
    navigate("/");
  }

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    //console.log(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, email, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      email: email,
      image: picture,
    };
    updateForm(doc);
    navigate("/");
  };

  return (
    <div>
      <PlainHeader />
      <div id="loginBody">
        <div id="loginContainer">
          <h1 style={{ marginBottom: 0 }}>Sign Up</h1>
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
                  <FcGoogle className="" /> Sign up with google
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
