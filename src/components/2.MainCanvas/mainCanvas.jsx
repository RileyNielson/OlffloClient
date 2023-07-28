import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";
import items from "../Items";

function MainCanvas() {
  const [itemList, setItemList] = useState(items);
  const [itemTitle, setItemTitle] = useState(items[0].title);

  function selectItem(item) {
    setItemTitle(items[item.id - 1].title);
  }

  function addItem(newItem) {
    const indexVal = newItem.id;
    items.push(newItem);
    setItemList(items);
    setItemTitle(items[indexVal - 1].title);
  }

  function updateItem(item) {
    const indexVal = item.id;
    console.log(indexVal);
    if (indexVal < 2) {
      items.shift();
      items.unshift(item);
    } else if (indexVal <= items.length) {
      const listLength = items.length;
      const backHalfArray = items.slice(indexVal, listLength);
      items.splice(indexVal - 1, listLength);
      items.push(item);
      items.push(...backHalfArray);
    }
    items.map((itemVal, index) => {
      itemVal.key = (index + 1).toString();
      itemVal.id = index + 1;
    });
    setItemList(items);
    setItemTitle(items[indexVal - 1].title);
  }

  function deleteItem(newItem) {
    const indexVal = newItem.id;
    console.log(indexVal);
    setItemList(itemList.filter((item) => item.id !== newItem.id));
    setItemTitle("Select Item");
  }

  console.log(itemList);

  return (
    <div id="mainCanvas">
      <SideBar
        selectItem={selectItem}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        itemList={itemList}
      />
      <MenuBar itemTitle={itemTitle} />
      <CanvasSpace itemList={itemList} />
    </div>
  );
}

export default MainCanvas;
