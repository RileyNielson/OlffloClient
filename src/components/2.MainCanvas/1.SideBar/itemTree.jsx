import * as React from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import Item from "./Item";
import NewSubItem from "./newSubItem";

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 5,
    paddingLeft: 5,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ItemTree(props) {
  function updateItem(item) {
    props.updateItem({
      ...props.item,
      subItems: props.item.subItems.map((s) => {
        if (s.key === item.key) {
          return { ...item };
        } else {
          return { ...s };
        }
      }),
    });
  }

  function deleteItem(subItem) {
    var newArray = props.item.subItems.filter(
      (eachItem) => eachItem.key !== subItem.key
    );
    const mappedArray = newArray.map((i) => {
      var feedsArray = i.feeds;
      var filterFeeds = false;
      var reduceFeeds = false;
      var reduceFeedIndex;
      i.feeds.map((suc, ind) => {
        if (suc === subItem.id) {
          filterFeeds = true;
        } else if (suc > subItem.id) {
          reduceFeeds = true;
          reduceFeedIndex = ind;
        }
        return;
      });
      if (filterFeeds) {
        feedsArray = i.feeds.filter((suc) => suc !== subItem.id);
      }
      if (reduceFeeds) {
        feedsArray = [i.feeds[reduceFeedIndex] - 1];
      }
      if (i.id > subItem.id) {
        return { ...i, id: i.id - 1, feeds: feedsArray };
      }
      console.log({ ...i, feedsArray });

      return { ...i, feeds: feedsArray };
    });

    mappedArray.map((i, index) => {
      i.id = props.item.id + "." + (index + 1);
      return;
    });

    props.updateItem({ ...props.item, subItems: mappedArray });
  }

  return (
    <StyledTreeItem
      nodeId={props.item.key}
      label={
        <Item
          selectItem={props.selectItem}
          updateItem={props.updateItem}
          deleteItem={props.deleteItem}
          itemList={props.itemList}
          index={props.index}
          item={props.item}
        />
      }
    >
      {Array.isArray(props.item.subItems) &&
        props.item.subItems.map((subItem, index) => {
          return (
            <ItemTree
              selectItem={props.selectItem}
              updateItem={updateItem}
              deleteItem={deleteItem}
              itemList={props.itemList}
              index={index}
              item={subItem}
            />
          );
        })}
      <StyledTreeItem
        nodeId={"Adder" + props.item.id}
        label={
          <NewSubItem
            itemList={props.itemList}
            updateItem={props.updateItem}
            item={props.item}
          />
        }
      ></StyledTreeItem>
    </StyledTreeItem>
  );
}

export default ItemTree;
