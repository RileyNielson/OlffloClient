import React from "react";
import MenuBar from "../3.CanvasMenuBar/menuBar";
import SideBar from "../2.SideBar/sideBar";

function MainCanvas() {
  return (
    <div id="mainCanvas">
      <SideBar />
      <MenuBar />
    </div>
  );
}

export default MainCanvas;
