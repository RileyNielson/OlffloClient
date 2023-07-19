import React from "react";
import AccountMenu from "./accountMenu";

function Header() {
  return (
    <div id="mainNavBar">
      <div id="logoBox">
        <img id="logoImg" src="./images/OlffloLogoWhite.png" alt="Olfflo" />
        <div>
          <h2 id="logoName">Olfflo</h2>
        </div>
      </div>
      <div id="accountMenu">
        <AccountMenu />
      </div>
    </div>
  );
}

export default Header;
