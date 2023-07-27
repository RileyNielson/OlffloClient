import React, { useState } from "react";

function MakeItem(props) {
  const [newItem, setNewItem] = useState(props.itemList[props.index]);

  function UpdateItem(event) {
    const { value } = event.target;
    setNewItem((prevItems) => {
      const keyID = props.index + 1;
      return {
        ...prevItems,
        key: keyID.toString(),
        id: keyID,
        title: value,
      };
    });

    props.createItem(newItem);
  }

  function submitItem(event) {
    props.createItem(newItem);
    event.preventDefault();
  }

  function deleteItem(event) {
    props.deleteItem(newItem);
    event.preventDefault();
  }

  return (
    <div>
      <input
        type="text"
        name={"item[" + props.index + "]"}
        id="sideBarItems"
        value={newItem.title}
        onChange={UpdateItem}
        autoComplete="off"
      />
      <button type="submit" onClick={submitItem} id="submitButton">
        +
      </button>
      <button type="submit" onClick={deleteItem} id="submitButton">
        -
      </button>
    </div>
  );
}

export default MakeItem;
