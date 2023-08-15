import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function FeedsDisplay(props) {
  function dropDown() {
    document
      .getElementById("dropdown" + props.item.id)
      .classList.toggle("show");
    document
      .getElementById("feedItem" + props.item.id)
      .classList.add("displayItems");
  }

  function feedSelect(e) {
    const value = e.target.getAttribute("value");

    props.updateItem({
      ...props.item,
      feeds: [...props.item.feeds, Number(value)].sort((a, b) => a - b),
    });
    document
      .getElementById("dropdown" + props.item.id)
      .classList.toggle("show");
    document
      .getElementById("feedItem" + props.item.id)
      .classList.remove("displayItems");
  }

  function deleteFeed(e) {
    const filteredArray = props.item.feeds.filter(
      (eachItem) => eachItem != e.target.getAttribute("value")
    );
    if (props.item.feeds.length > 1) {
      props.updateItem({
        ...props.item,
        feeds: filteredArray,
      });
    } else {
      props.updateItem({
        ...props.item,
        feeds: [],
      });
    }
  }

  function searchFunction() {
    var input, filter, div, a, i;
    input = document.getElementById("myInput" + props.item.id);
    filter = input.value;
    div = document.getElementById("dropdown" + props.item.id);
    a = div.getElementsByTagName("div");
    for (i = 0; i < a.length; i++) {
      var txtValue = a[i].textContent || a[i].innerText;
      // console.log(filter);
      if (txtValue.indexOf(filter) > -1 || filter === "") {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  return (
    <div className="feedContainer" id={"feedContainer" + props.item.id}>
      <div className="feedItems" id={"feedItem" + props.item.id}>
        {props.feeds.map((f) => (
          <div className="feedChip">
            {f}
            <div className="feedDelete">
              <ClearIcon fontSize="x-small" onClick={deleteFeed} value={f} />
            </div>
          </div>
        ))}
      </div>
      <ArrowDropDownIcon fontSize="x-small" onClick={dropDown} />
      <div id={"dropdown" + props.item.id} className="dropDownContent">
        <input
          type="text"
          placeholder="Search.."
          id={"myInput" + props.item.id}
          className="myInput"
          onKeyUp={searchFunction}
        />
        {props.allFeeds.map((feed) => {
          var itemAvailable = true;
          props.feeds.map((itemFeed) => {
            if (feed === itemFeed) {
              itemAvailable = false;
            }
          });
          if (itemAvailable && feed !== props.item.id) {
            itemAvailable = true;
            return (
              <div onClick={feedSelect} value={feed}>
                {feed}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default FeedsDisplay;
