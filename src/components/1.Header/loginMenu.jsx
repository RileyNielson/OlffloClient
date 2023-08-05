import React from "react";
import { Link } from "react-router-dom";

function LoginMenu(){
    return(
        <div id="loginMenu">
            <Link to="/login"><button className="loginButton" type="submit">Login</button></Link>
            <Link to="/signUp"><button className="signUpButton" type="submit">Sign Up</button></Link>
        </div>
    )
}

export default LoginMenu;