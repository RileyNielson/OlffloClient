import React, { useState } from "react";

function UpdateItem(props) {
  const [newItem, setNewItem] = useState(props.item);
  const [isSelected, setIsSelected] = useState(false);

  function updateItem(event) {
    const { value } = event.target;
    setIsSelected(true);
    setNewItem((prevItems) => {
      return {
        ...prevItems,
        title: value,
      };
    });
  }

  function unfocusItem() {
    props.updateItem(newItem);
    setIsSelected(false);
  }

  function unfocusItemEnter(event) {
    if (event.key === "Enter" && isSelected) {
      props.updateItem(newItem);
      setIsSelected(false);
    }
    event.preventDefault();
  }

  function deleteItem(event) {
    props.deleteItem(props.item);
    event.preventDefault();
  }

  return (
    <div>
      <input
        type="text"
        name={"item[" + props.index + "]"}
        id="sideBarItems"
        value={isSelected? newItem.title:props.item.title}
        onChange={updateItem}
        onKeyUp={unfocusItemEnter}
        onFocus={props.selectItem(props.item)}
        onBlur={unfocusItem}
        autoComplete="off"
      />
      <button type="submit" onClick={deleteItem} id="submitButton">
        -
      </button>
    </div>
  );
}

export default UpdateItem;
