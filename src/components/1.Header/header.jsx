import React from "react";
import { Outlet, Link } from "react-router-dom";
import AccountMenu from "./accountMenu";
import HeaderMenu from "./headerMenu";
import LoginMenu from "./loginMenu";

function Header(props) {
  return (
    <div id="mainNavBar">
      <div id="logoBox">
        <Link id="logoBox" to="/">
          <img id="logoImg" src="./images/OlffloLogoWhite.png" alt="Olfflo" />
          <div>
            <h2 id="logoName">Olfflo</h2>
          </div>
        </Link>
        <div id="headerContentContainer">
          <div>
            <HeaderMenu menuTitle="Templates" />
          </div>
          <div>
            <HeaderMenu menuTitle="Marketplace" />
          </div>
          <div>
            <HeaderMenu menuTitle="Company" />
          </div>
          <div>
            <HeaderMenu menuTitle="Contact" />
          </div>
        </div>
      </div>
      <div id="accountMenu">
        {props.loggedIn ? <AccountMenu setUser={props.setUser} user={props.user}/> : <LoginMenu />}
      </div>
    </div>
  );
}

export default Header;
