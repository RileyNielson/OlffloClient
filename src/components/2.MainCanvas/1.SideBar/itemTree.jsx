import * as React from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import Item from "./Item";

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
              updateItem={props.updateItem}
              deleteItem={props.deleteItem}
              itemList={props.itemList}
              index={index}
              item={subItem}
            />
          );
        })}
    </StyledTreeItem>
  );
}

export default ItemTree;
