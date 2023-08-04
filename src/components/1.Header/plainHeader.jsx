import React from "react";
import { Link } from "react-router-dom";
import AccountMenu from "./accountMenu";
import HeaderMenu from "./headerMenu";
import LoginMenu from "./loginMenu";

function PlainHeader(props) {
  return (
    <div id="mainNavBar">
      <div id="logoBox">
        <Link id="logoBox" to="/">
          <img id="logoImg" src="./images/OlffloLogoWhite.png" alt="Olfflo" />
          <div>
            <h2 id="logoName">Olfflo</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PlainHeader;
