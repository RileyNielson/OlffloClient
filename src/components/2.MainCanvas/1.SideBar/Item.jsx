import React from "react";
import DeleteItem from "./deleteItem";
import FeedsDisplay from "./feedsDisplay";

function Item(props) {

  const item = props.item

  function updateItem(event) {
    const { value } = event.target;
    console.log({ ...item, title: value });
    props.updateItem({ ...item, title: value });
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
      <FeedsDisplay feeds={item.feeds} item={item} allFeeds={props.itemList.map((i) => i.id)} updateItem={props.updateItem}/>
      {props.item.id !== 1 ? (
        <DeleteItem item={item} deleteItem={props.deleteItem} />
      ) : null}
    </div>
  );
}

export default Item;
