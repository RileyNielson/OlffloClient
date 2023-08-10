import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";

function MainCanvas(props) {
  const project = props.project;
  const [itemTitle, setItemTitle] = useState(project.items[0].title);

  var imageURL;
  console.log(project);

  var itemIDs = project.items.length + 1;

  function selectItem(item) {
    setItemTitle(item.title);
  }

  function addItem(newItem) {
    imageURL = document.getElementById("canvas").toDataURL();
    props.setProject((prev) => {
      const newList = project.items;
      var feedAlreadyExists = false;
      newList[newItem.id - 2].feeds.map((f) => {
        if (f === newItem.id) {
          feedAlreadyExists = true;
        }
      });
      !feedAlreadyExists &&
        (newList[newItem.id - 2].feeds = [
          ...newList[newItem.id - 2].feeds,
          newItem.id,
        ]);
      console.log(newList);
      return { ...prev, image: imageURL, items: [...newList, newItem] };
    });

    itemIDs++;
  }

  function updateItem(item) {
    imageURL = document.getElementById("canvas").toDataURL();
    props.setProject((prev) => {
      return {
        ...prev,
        image: imageURL,
        items: project.items.map((i) => {
          if (i.key === item.key) {
            return { ...item };
          } else {
            return { ...i };
          }
        }),
      };
    });

    console.log("done");
    setItemTitle(item.title);
  }

  function deleteItem(item) {
    imageURL = document.getElementById("canvas").toDataURL();
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
      console.log({ ...prev, image: imageURL, items: newArray });
      return { ...prev, image: imageURL, items: newArray };
    });
    setItemTitle(project.items[0].title);
  }

  console.log(props.project);

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
      <MenuBar
        itemTitle={itemTitle}
        project={project}
        setProject={props.setProject}
        user={props.user}
        setUser={props.setUser}
      />
      <CanvasSpace itemList={project.items} />
    </div>
  );
}

export default MainCanvas;
