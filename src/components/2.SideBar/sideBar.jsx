import React from "react";
import SideBarBody from "./sideBarBody";
import SideBarHeader from "./sideBarHeader";

function SideBar() {
  return (
    <div id="sideBar">
      <SideBarHeader />
      <SideBarBody />
    </div>
  );
}

export default SideBar;
