import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";
import project from "../project";

var itemIDs = project.items.length + 1;

function MainCanvas() {
  const [itemList, setItemList] = useState(project.items);
  const [itemTitle, setItemTitle] = useState(itemList[0].title);

  function selectItem(item) {
    setItemTitle(item.title);
  }

  function addItem(newItem) {
    setItemList((prevItems) => {
      const newList = [ ...prevItems];
      newList[newItem.id - 2].feeds.push(newItem.id);
      newList.push(newItem)
      console.log(newList);
      return newList;
    });
    itemIDs++;
  }

  function updateItem(item) {
    setItemList(
      itemList.map((i) => {
        if (i.key === item.key) {
          return item;
        } else {
          return i;
        }
      })
    );
    setItemTitle(item.title);
  }

  function deleteItem(item) {
    itemList.map((i) => {
      if (i.id > item.id) {
        updateItem({ ...i, id: i.id - 1 });
      }
      i.feeds.map((suc, ind) => {
        if (suc === item.id) {
          updateItem({ ...i, feeds: i.feeds.filter((suc) => suc !== item.id) });
        } else if (suc > item.id) {
          updateItem({ ...i, feeds: [...i.feeds, i.feeds[ind]--] });
        }
      });
    });

    const newArray = itemList.filter((eachItem) => eachItem.key !== item.key);
    newArray.map((i, index) => {
      i.id = index + 1;
    });
    setItemList(newArray);
    setItemTitle(itemList[0].title);
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
        itemIDs={itemIDs}
      />
      <MenuBar itemTitle={itemTitle} />
      <CanvasSpace itemList={itemList} />
    </div>
  );
}

export default MainCanvas;
