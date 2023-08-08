import React from "react";
import SideBarBody from "./sideBarBody";
import SideBarHeader from "./sideBarHeader";

function SideBar(props) {
  return (
    <div id="sideBar">
      <SideBarHeader setProject={props.setProject} project={props.project} setUser={props.setUser} user={props.user}/>
      <SideBarBody
        selectItem={props.selectItem}
        addItem={props.addItem}
        updateItem={props.updateItem}
        deleteItem={props.deleteItem}
        itemList={props.itemList}
        itemIDs={props.itemIDs}
      />
    </div>
  );
}

export default SideBar;
