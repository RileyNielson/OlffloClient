import React from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DeleteItem(props) {
  function deleteItem() {
    props.deleteItem(props.item);
    // console.log(props.item);
  }

  return (
    <button type="submit" onClick={deleteItem} id="submitButton">
      <DeleteForeverIcon fontSize="small"/>
    </button>
  );
}

export default DeleteItem;
