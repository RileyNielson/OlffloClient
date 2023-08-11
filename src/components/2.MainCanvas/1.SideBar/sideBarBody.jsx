import * as React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NewItem from "./newItem";
import ItemTree from "./itemTree";

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

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
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
    marginLeft: 5,
    paddingLeft: 5,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

function ListTreeView(props) {
  return (
    <div id="sideBarBody">
      <div id="sideBarLables">
        <div id="sideBarID">ID</div>
        <div id="sideBarTitle">Name</div>
        <div id="sideBarSuc">Feeds</div>
        <div id="sideBarDelete">-</div>
      </div>
      <div id="sideBarItems">
        <TreeView
          aria-label="customized"
          defaultExpanded={["1"]}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          sx={{
            height: "100%",
            maxWidth: "100%",
            backgroundColor: "white",
          }}
        >
          {props.itemList.map((item, index) => (
            <ItemTree
              selectItem={props.selectItem}
              updateItem={props.updateItem}
              deleteItem={props.deleteItem}
              itemList={props.itemList}
              index={index}
              item={item}
            ></ItemTree>
          ))}
          <StyledTreeItem
            nodeId={"Adder"}
            label={
              <NewItem
                itemList={props.itemList}
                addItem={props.addItem}
                itemKeys={props.itemKeys}
              />
            }
          ></StyledTreeItem>
        </TreeView>
      </div>
    </div>
  );
}

export default ListTreeView;
