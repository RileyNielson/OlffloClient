import React, { useState } from "react";
import DeleteItem from "./deleteItem";

function Item(props) {

  const item = props.itemList[props.index]

  function updateItem(event) {
    const { name, value } = event.target;
    props.updateItem({ ...item, [name]: value });
  }

  function focusItem() {
    props.selectItem(item);
  }

  return (
    <div className="sideBarItem">
      <div className="itemIDTag">{item.id} </div>
      <input
        type="text"
        name="title"
        className="sideBarTitle"
        value={item.title}
        onChange={updateItem}
        onFocus={focusItem}
        autoComplete="off"
      />
      <input
        type="text"
        name="successors"
        className="sideBarSuc"
        value={item.successors.join(", ")}
        onChange={updateItem}
        onFocus={focusItem}
        autoComplete="off"
      />
      {props.index !== 0 ? (
        <DeleteItem item={item} deleteItem={props.deleteItem} />
      ) : null}
    </div>
  );
}

export default Item;
