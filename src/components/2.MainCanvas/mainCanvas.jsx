import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";
import items from "../Items";

var itemIDs = items.length + 1;

function MainCanvas() {
  const [itemList, setItemList] = useState(items);
  const [itemTitle, setItemTitle] = useState(itemList[0].title);

  function selectItem(item) {
    setItemTitle(item.title);
  }

  function addItem(newItem) {
    setItemList((prevItems) => [...prevItems, newItem])
    itemIDs++;
  }

  function updateItem(item) {
    setItemList(
      itemList.map((i) => {
        if (i.id === item.id) {
          return item;
        } else {
          return i;
        }
      })
    );
    setItemTitle(item.title);
  }

  function deleteItem(item) {
    const newArray = itemList.filter((eachItem) => eachItem.id !== item.id)
    newArray.map((item, index) => {
      item.id = index + 1;
    })
    setItemList(newArray);
    setItemTitle(itemList[0].title);
  }

  return (
    <div id="mainCanvas">
      <SideBar
        selectItem={selectItem}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        itemList={itemList}
        itemIDs={itemIDs}
      />
      <MenuBar itemTitle={itemTitle} />
      <CanvasSpace itemList={itemList} />
    </div>
  );
}

export default MainCanvas;
