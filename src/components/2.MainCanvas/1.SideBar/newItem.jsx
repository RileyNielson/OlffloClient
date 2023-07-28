import React from "react";

function NewItem(props) {
  return (
    <div id="sideBarItems">
      New Item
      <button type="submit" onClick={props.addItem} id="submitButton">
        +
      </button>
    </div>
  );
}

export default NewItem;
