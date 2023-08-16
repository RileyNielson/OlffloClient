import React from "react";

function NewItem(props) {

  const blankItem = {
    key: crypto.randomUUID(),
    id: props.itemList.length + 1,
    title: "New Item",
    feeds: [],
    coords: [0, 0, 0, 0],
    subItems: [],
  };

  function addItem(event) {
    props.addItem(blankItem);
    event.preventDefault();
  }

  return (
    <div id="sideBarItem">
      New Item
      <button type="submit" onClick={addItem} id="submitButton">
        +
      </button>
    </div>
  );
}

export default NewItem;
