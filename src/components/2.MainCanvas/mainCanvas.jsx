import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";
import items from "../Items";

function MainCanvas() {
  const [itemList, setItemList] = useState(items)
  const [itemTitle, setItemTitle] = useState(items[0].title)

  function addItem(newItem) {
    const indexVal = newItem.id;
    console.log(indexVal);
    if (indexVal < 2) {
      items.shift();
      items.unshift(newItem);
    } else {
      const listLength = items.length;
      const backHalfArray = items.slice(indexVal, listLength);
      items.splice(indexVal - 1, listLength);
      items.push(newItem);
      items.push(...backHalfArray);
    }
    setItemList(items);
    setItemTitle(items[0].title)
    console.log(items);
  }

  function deleteItem(newItem) {
    const indexVal = newItem.id;
    console.log(indexVal);
    if (indexVal < 2) {
      items.shift();
    } else {
      const listLength = items.length;
      const backHalfArray = items.slice(indexVal, listLength);
      items.splice(indexVal - 1, listLength);
      items.push(...backHalfArray);
    }
    setItemList(items);
    setItemTitle(items[0].title)
    console.log(items);
  }

  return (
    <div id="mainCanvas">
      <SideBar changeItems={addItem} deleteItem={deleteItem} itemList={itemList}/>
      <MenuBar itemTitle={itemTitle}/>
      <CanvasSpace />
    </div>
  );
}

export default MainCanvas;
