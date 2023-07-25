import React from "react";
import SideBarBody from "./sideBarBody";
import SideBarHeader from "./sideBarHeader";

function SideBar(props) {
  return (
    <div id="sideBar">
      <SideBarHeader />
      <SideBarBody newItems={props.changeItems} deleteItem={props.deleteItem} itemList={props.itemList}/>
    </div>
  );
}

export default SideBar;
