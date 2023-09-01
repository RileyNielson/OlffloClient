import React, { useRef, useState } from "react";
import MenuBar from "./2.CanvasMenuBar/menuBar";
import SideBar from "./1.SideBar/sideBar";
import CanvasSpace from "./3.CanvasSpace/canvasSpace";

function MainCanvas(props) {
  const project = props.project;
  const [itemTitle, setItemTitle] = useState(project.items[0].title);
  const [imageURL, setImageURL] = useState("");

  const canvasRef = useRef(null);

  function selectItem(item) {
    setItemTitle(item.title);
  }

  function addItem(newItem) {
    props.setProject((prev) => {
      const newList = project.items;
      var feedAlreadyExists = false;
      newList[newItem.id - 2].feeds.map((f) => {
        if (f === newItem.id) {
          feedAlreadyExists = true;
        }
        return f;
      });
      !feedAlreadyExists &&
        (newList[newItem.id - 2].feeds = [
          ...newList[newItem.id - 2].feeds,
          newItem.id,
        ]);

      newList.splice(newItem.id - 1, 1, newItem);
      return { ...prev, items: newList };
    });

    setImageURL(canvasRef.current.toDataURL());
    setItemTitle(newItem.title);
  }

  function updateItem(item) {
    props.setProject((prev) => {
      return {
        ...prev,
        items: project.items.map((i) => {
          if (i.key === item.key) {
            return { ...item };
          } else {
            return { ...i };
          }
        }),
      };
    });

    setImageURL(canvasRef.current.toDataURL());
    setItemTitle(item.title);
  }

  function deleteItem(item) {
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
        if (suc === item.id) {
          filterFeeds = true;
        } else if (suc > item.id) {
          reduceFeeds = true;
          reduceFeedIndex = ind;
        }
        return suc;
      });
      if (filterFeeds) {
        feedsArray = i.feeds.filter((suc) => suc !== item.id);
      }
      if (reduceFeeds) {
        feedsArray = [i.feeds[reduceFeedIndex] - 1];
      }
      if (i.id > item.id) {
        return { ...i, id: i.id - 1, feeds: feedsArray };
      }
      console.log({ ...i, feedsArray });
      return { ...i, feeds: feedsArray };
    });

    mappedArray.map((i, index) => {
      i.id = index + 1;
      return i;
    });

    props.setProject((prev) => {
      return { ...prev, items: mappedArray };
    });

    setItemTitle(project.items[0].title);
    setImageURL(canvasRef.current.toDataURL());
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
      />
      <MenuBar
        itemTitle={itemTitle}
        project={project}
        setProject={props.setProject}
        user={props.user}
        setUser={props.setUser}
        imageURL={imageURL}
        canvasRef={canvasRef}
      />
      <CanvasSpace
        itemList={props.project.items}
        canvasRef={canvasRef}
        project={project}
        updateItem={updateItem}
      />
    </div>
  );
}

export default MainCanvas;
