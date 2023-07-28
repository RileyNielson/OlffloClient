import React, { useState } from "react";

function MakeItem(props) {
  const [newItem, setNewItem] = useState(props.item);
  const [isSelected, setIsSelected] = useState(false);

  function updateItem(event) {
    const { value } = event.target;
    setIsSelected(true);
    setNewItem((prevItems) => {
      const keyID = props.index + 1;
      return {
        ...prevItems,
        key: keyID.toString(),
        id: keyID,
        title: value,
      };
    });
  }

  function unfocusItem() {
    props.createItem(newItem);
    setIsSelected(false);
  }

  function focusItem(){
  }

  function unfocusItemEnter(event) {
    if (event.key === "Enter" && isSelected) {
      props.createItem(newItem);
      setIsSelected(false);
    }
    event.preventDefault();
  }

  function deleteItem(event) {
    setIsSelected(true);
    setIsSelected(false);
    props.deleteItem(props.item);
    event.preventDefault();
  }

  var itemTitle = props.item.title;
  if (isSelected) {
    itemTitle = newItem.title;
  } else {
    itemTitle = props.item.title;
  }

  return (
    <div>
      <input
        type="text"
        name={"item[" + props.index + "]"}
        id="sideBarItems"
        value={itemTitle}
        onChange={updateItem}
        onKeyUp={unfocusItemEnter}
        onBlur={unfocusItem}
        autoComplete="off"
      />
      <button type="submit" onClick={deleteItem} id="submitButton">
        -
      </button>
    </div>
  );
}

export default MakeItem;
