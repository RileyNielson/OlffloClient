import React from "react";

function DeleteItem(props) {
  function deleteItem() {
    props.deleteItem(props.item);
    console.log(props.item);
  }

  return (
    <button type="submit" onClick={deleteItem} id="submitButton">
      x
    </button>
  );
}

export default DeleteItem;
