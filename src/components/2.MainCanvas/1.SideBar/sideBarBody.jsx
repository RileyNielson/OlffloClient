import * as React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import items from "../../Items";
import MakeItem from "./makeItem";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <KeyboardArrowDownIcon />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      <KeyboardArrowRightIcon />
    </SvgIcon>
  );
}

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
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

export default function ListTreeView(props) {
  return (
    <div id="sideBarBody">
      <TreeView
        aria-label="customized"
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        sx={{
          height: "100%",
          maxWidth: "100%",
          overflowX: "auto",
          backgroundColor: "white",
        }}
      >
        {props.itemList.map((item, index) => (
          <StyledTreeItem
            nodeId={item.key.toString()}
            label={
              <MakeItem
                createItem={props.newItems}
                deleteItem={props.deleteItem}
                index={index}
              />
            }
          >
            {item.subItems.map((subItem) => (
              <StyledTreeItem nodeId={subItem.key.toString()} label={subItem.title} />
            ))}
            <StyledTreeItem
              nodeId={(item.subItems.length + 1).toString()}
              label={"New Sub-Item"}
            ></StyledTreeItem>
          </StyledTreeItem>
        ))}
        <StyledTreeItem
          nodeId={(items.length + 1).toString()}
          label={"New Item"}
        ></StyledTreeItem>
      </TreeView>
    </div>
  );
}
