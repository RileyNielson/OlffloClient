import React from "react";
import FileMenu from "./fileMenu";
import EditMenu from "./editMenu";
import PrintMenu from "./printMenu";

function MenuBar(props) {
  return (
    <div id="menuBar">
      <h2>{props.itemTitle}</h2>
      <FileMenu />
      <EditMenu />
      <PrintMenu />
    </div>
  );
}

export default MenuBar;
