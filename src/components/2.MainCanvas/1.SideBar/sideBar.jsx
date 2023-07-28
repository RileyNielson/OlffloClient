import React from "react";
import SideBarBody from "./sideBarBody";
import SideBarHeader from "./sideBarHeader";

function SideBar(props) {
  return (
    <div id="sideBar">
      <SideBarHeader />
      <SideBarBody
        selectItem={props.selectItem}
        addItem={props.addItem}
        updateItem={props.updateItem}
        deleteItem={props.deleteItem}
        itemList={props.itemList}
      />
    </div>
  );
}

export default SideBar;
