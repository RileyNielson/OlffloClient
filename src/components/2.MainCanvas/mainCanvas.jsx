import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";

function MainCanvas(props) {
  const project = props.project;
  const [itemTitle, setItemTitle] = useState(project.items[0].title);

  var itemIDs = project.items.length + 1;

  function selectItem(item) {
    setItemTitle(item.title);
  }

  function addItem(newItem) {
    // console.log(props.project);
    props.setProject((prev) => {
      const newList = project.items;
      newList[newItem.id - 2].feeds.push(newItem.id);
      newList.push(newItem);
      return { ...prev, items: newList };
    });

    itemIDs++;
  }

  function updateItem(item) {
    props.setProject((prev) => {
      return {
        ...prev,
        items: project.items.map((i) => {
          if (i.key === item.key) {
            return { item };
          } else {
            return { i };
          }
        }),
      };
    });
    setItemTitle(item.title);
  }

  function deleteItem(item) {
    project.items.map((i) => {
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

    const newArray = project.items.filter(
      (eachItem) => eachItem.key !== item.key
    );
    newArray.map((i, index) => {
      i.id = index + 1;
    });

    props.setProject((prev) => {
      console.log({ ...prev, items: newArray });
      return { ...prev, items: newArray };
    });
    setItemTitle(project.items[0].title);
  }

  return (
    <div id="mainCanvas">
      <SideBar
        selectItem={selectItem}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
        itemList={project.items}
        project={project}
        setProject={props.setProject}
        setUser={props.setUser}
        user={props.user}
        itemIDs={itemIDs}
      />
      <MenuBar itemTitle={itemTitle} project={project} user={props.user} setUser={props.setUser}/>
      <CanvasSpace itemList={project.items} />
    </div>
  );
}

export default MainCanvas;
