import React, { useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";

function MainCanvas(props) {
  const project = props.project;
  const [itemTitle, setItemTitle] = useState(project.items[0].title);
  const [itemKeys, setItemKeys] = useState(
    Math.max(
      project.items.map((i) => {
        return Number(i.key);
      })
    )
  );

  var imageURL;
  // console.log(project);

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

    setItemKeys(itemKeys + 1);
  }

  function updateItem(item) {
    imageURL = document.getElementById("canvas").toDataURL();
    console.log(item);
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

    setItemTitle(item.title);
  }

  function deleteItem(item) {
    imageURL = document.getElementById("canvas").toDataURL();

    var newArray = project.items.filter(
      (eachItem) => eachItem.key !== item.key
    );

    console.log(newArray);
    const mappedArray = newArray.map((i) => {
      var feedsArray = i.feeds;
      var filterFeeds = false;
      var reduceFeeds = false;
      var reduceFeedIndex;
      i.feeds.map((suc, ind) => {
        console.log(suc, item.id);
        if (suc === item.id) {
          filterFeeds = true;
        } else if (suc > item.id) {
          reduceFeeds = true;
          reduceFeedIndex = ind;
        }
      });
      if (filterFeeds) {
        feedsArray = i.feeds.filter((suc) => suc != item.id);
      }
      if (reduceFeeds) {
        feedsArray = [i.feeds[reduceFeedIndex] - 1];
        console.log([i.feeds[reduceFeedIndex] - 1]);
      }
      console.log(feedsArray);
      if (i.id > item.id) {
        console.log({ ...i, id: i.id - 1, feedsArray });
        // updateItem({ ...i, id: i.id - 1 });
        return { ...i, id: i.id - 1, feeds: feedsArray };
      }
      console.log({ ...i, feedsArray });
      return { ...i, feeds: feedsArray };
    });

    console.log(mappedArray);

    mappedArray.map((i, index) => {
      i.id = index + 1;
    });

    props.setProject((prev) => {
      console.log({ ...prev, image: imageURL, items: mappedArray });
      return { ...prev, image: imageURL, items: mappedArray };
    });

    setItemTitle(project.items[0].title);
  }

  // console.log(props.project);

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
        itemKeys={itemKeys}
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
