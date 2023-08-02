import React from "react";
import AccountMenu from "./accountMenu";
import HeaderMenu from "./headerMenu";

function Header() {
  return (
    <div id="mainNavBar">
      <div id="logoBox">
        <img id="logoImg" src="./images/OlffloLogoWhite.png" alt="Olfflo" />
        <div>
          <h2 id="logoName">Olfflo</h2>
        </div>
        <div id="headerContentContainer">
          <div><HeaderMenu menuTitle="Spotlight"/></div>
          <div><HeaderMenu menuTitle="Business"/></div>
          <div><HeaderMenu menuTitle="Education"/></div>
          <div><HeaderMenu menuTitle="Learn"/></div>
        </div>
      </div>
      <div id="accountMenu">
        <AccountMenu />
      </div>
    </div>
  );
}

export default Header;
