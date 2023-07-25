import React, { useState } from "react";

function MakeItem(props) {
  const [newItem, setNewItem] = useState({
    key: "",
    id: "",
    title: "",
    subItems: [],
  });

  function UpdateItem(event) {
    const { value } = event.target;

    setNewItem((prevItems) => {
      const keyID = props.index + 1;
      return {
        ...prevItems,
        key: keyID.toString(),
        id: props.index + 1,
        title: value,
      };
    });
  }

  function submitNote(event) {
    props.createItem(newItem);
    event.preventDefault();
  }

  function deleteNote(event) {
    props.deleteItem(newItem);
    event.preventDefault();
  }

  return (
    <div>
      <input
        type="text"
        name={"item[" + props.index + "]"}
        id="sideBarItems"
        value={newItem[props.index]}
        onChange={UpdateItem}
        autoComplete="off"
      />
      <button type="submit" onClick={submitNote} id="submitButton">
        +
      </button>
      <button type="submit" onClick={deleteNote} id="submitButton">
        -
      </button>
    </div>
  );
}

export default MakeItem;
