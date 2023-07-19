import React from "react";
import FileMenu from "./fileMenu";
import EditMenu from "./editMenu";
import PrintMenu from "./printMenu";

function MenuBar() {
  return (
    <div id="menuBar">
      <FileMenu />
      <EditMenu />
      <PrintMenu />
    </div>
  );
}

export default MenuBar;
