import React from "react";
import MenuBar from "../3.CanvasMenuBar/menuBar";
import SideBar from "../2.SideBar/sideBar";
import CanvasSpace from "./canvasSpace";

function MainCanvas() {
  return (
    <div id="mainCanvas">
      <SideBar />
      <MenuBar />
      <CanvasSpace />
    </div>
  );
}

export default MainCanvas;
