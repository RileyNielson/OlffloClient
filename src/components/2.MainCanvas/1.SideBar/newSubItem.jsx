import React from "react";

function NewSubItem(props) {

const item = props.item

  const blankSubItem = {
    key: crypto.randomUUID(),
    id: item.id + "." + (item.subItems.length + 1),
    title: "New SubItem",
    feeds: [],
    coords: [0, 0, 0, 0],
    subItems: [],
  };

  function updateItem(event) {
    props.updateItem({ ...item, subItems: [...item.subItems, blankSubItem]});
    event.preventDefault();
  }

  return (
    <div id="sideBarItem">
      New Item
      <button type="submit" onClick={updateItem} id="submitButton">
        +
      </button>
    </div>
  );
}

export default NewSubItem;
