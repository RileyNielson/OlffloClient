import React from "react";
import { Link } from "react-router-dom";

function LoginMenu(){
    return(
        <div id="loginMenu">
            <Link to="/login"><button className="loginButton" type="submit">Login</button></Link>
            <button className="signUpButton" type="submit">Sign Up</button>
        </div>
    )
}

export default LoginMenu;