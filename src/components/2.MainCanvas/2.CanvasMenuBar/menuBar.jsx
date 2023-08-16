import React from "react";
import FileMenu from "./fileMenu";
import EditMenu from "./editMenu";
import PrintMenu from "./printMenu";
import SaveButton from "./saveButton";

function MenuBar(props) {
  return (
    <div id="menuBar">
      <h2>{props.itemTitle}</h2>
      <FileMenu />
      <EditMenu />
      <PrintMenu />
      <SaveButton
        user={props.user}
        setUser={props.setUser}
        project={props.project}
        setProject={props.setProject}
        imageURL={props.imageURL}
        canvasRef={props.canvasRef}
      />
    </div>
  );
}

export default MenuBar;
