import React, { useState, useRef } from "react";
import zoomVar from "../../zoomVar";
import { Stage, Layer, Rect, Text, Arrow, Group } from "react-konva";

function CanvasSpace(props) {
  const [subItems, setSubItems] = useState([]);
  const [itemWithSubs, setItemWithSubs] = useState();
  const [oldSubItems, setOldSubItems] = useState([]);
  var arrows = [];

  props.itemList.map((item, index) => {
    item.subItems.map((s, ind) => {
      drawFillRect(s, ind, item.subItems.length, item.coords);
      return s;
    });
    drawFillRect(item, index, props.itemList.length, [
      0,
      0,
      5100 * zoomVar * 1.55,
      0,
    ]);
    return item;
  });

  props.itemList.map((item) => {
    item.feeds.map((suc, sucIndex) => {
      suc !== null &&
        drawArrow(item, suc, sucIndex) &&
        suc.subItems.feeds.map((suc2, suc2Index) => {
          suc2 !== null &&
            drawArrow(item, suc2, suc2Index) &&
            suc2.subItems.feeds.map((suc3, suc3Index) => {
              suc3 !== null && drawArrow(item, suc3, suc3Index);
              return suc3;
            });
          return suc2;
        });
      return suc;
    });
    return item;
  });

  // draw rectangle with background
  function drawFillRect(info, ind, arrayLength, coords) {
    const totalWidth = coords[2];
    const totalHeight = 3300 * zoomVar * 1.55;
    const itemCount = arrayLength;
    const spacesCount = itemCount * 1.618 - 0.618;
    const canvasBorderWidth = 200;
    const spaceWidth = (totalWidth - canvasBorderWidth) / spacesCount;

    var x = ind * spaceWidth * 1.618 + canvasBorderWidth / 2;
    var w = spaceWidth;
    const h = 500 * zoomVar;
    var y = totalHeight / 2 - h / 2;

    if (typeof info.id === "string" && info.id.includes(".")) {
      x = (ind * totalWidth) / (2 * arrayLength) + coords[0];
      y = y + 200;
      w = totalWidth / (2 * arrayLength) + totalWidth / 2;
    }

    info.coords = [x, y, w, h];
  }

  function drawArrow(fromItem, toID, sucIndex) {
    const toItem = props.itemList[toID - 1];
    //variables to be used when creating the arrow
    const totalHeight = 3300 * zoomVar * 1.55;

    const x = fromItem.coords[0];
    var y = totalHeight / 2;
    const w = fromItem.coords[2];

    var fromx = x + w,
      fromy = y,
      tox = toItem.coords[0] - fromx - 4,
      toy = 0,
      tox1 = 0,
      toy1 = 0,
      tox2 = 0,
      toy2 = 0;
    if (fromItem.id + 1 < toID) {
      fromx = x + (w * 3) / 4;
      fromy = y + fromItem.coords[3] / 2;
      tox1 = 0;
      toy1 = 50 + 15 * (props.itemList.length - fromItem.id - 1);
      tox2 = toItem.coords[0] + w / 3 - fromx;
      toy2 = toy1;
      tox = tox2;
      toy = 0 + 4;
    } else if (fromItem.id + 1 > toID) {
      fromx = x + w / 3;
      fromy = y - fromItem.coords[3] / 2;
      tox1 = 0;
      toy1 = 0 - 20 - 15 * (props.itemList.length - toID);
      tox2 = toItem.coords[0] + (w * 2) / 3 - fromx;
      toy2 = toy1;
      tox = tox2;
      toy = 0 - 4;
    }

    if (typeof toItem.id === "string" && toItem.id.includes(".")) {
      y = y * 1.75;
    }

    var strokeStyle;

    if (fromItem.id + 1 === toID) {
      strokeStyle = "rgb(255, 188, 66)";
    } else if (fromItem.id + 1 < toID) {
      strokeStyle =
        "rgb(" +
        (4 +
          Math.floor((255 - 4) / (props.itemList.length - 2)) *
            (fromItem.id - 1)) +
        ", " +
        (150 +
          Math.floor((188 - 150) / (props.itemList.length - 2)) *
            (fromItem.id - 1)) +
        ", " +
        (255 -
          Math.floor((255 - 66) / (props.itemList.length - 2)) *
            (fromItem.id - 1)) +
        ")";
    } else {
      strokeStyle =
        "rgb(" +
        (216 +
          Math.floor((255 - 216) / (props.itemList.length - 1)) * (toID - 1)) +
        ", " +
        (17 +
          Math.floor((188 - 17) / (props.itemList.length - 1)) * (toID - 1)) +
        ", " +
        (89 -
          Math.floor((89 - 66) / (props.itemList.length - 1)) * (toID - 1)) +
        ")";
    }

    const arrowSpecs = {
      x: fromx,
      y: fromy,
      points: [0, 0, tox1, toy1, tox2, toy2, tox, toy],
      stroke: strokeStyle,
    };

    arrows = [...arrows, arrowSpecs];
  }

  const layerRef = useRef(null);

  function handleStageClick(e) {
    console.log(e.target);
    if (e.target.attrs.id === "canvas") {
      console.log("worked");
      setSubItems([]);
      setItemWithSubs();
    }
  }

  function handlePointerLeave() {
    setSubItems([]);
    setItemWithSubs();
  }

  function handleClick(item) {
    console.log("working");
    setSubItems(item.subItems);
    setItemWithSubs(item);
  }

  function handleEnter(subItem, ind) {
    setOldSubItems(JSON.parse(JSON.stringify(subItems)));
    const subArray = JSON.parse(JSON.stringify(subItems));
    subArray.splice(ind, 1);
    subArray.push(subItem);
    console.log(subArray);
    setSubItems(subArray);
  }

  function handleExit() {
    setSubItems(oldSubItems.sort((a, b) => a.id - b.id));
  }

  console.log(itemWithSubs);

  return (
    <div id="canvasSpace">
      <Stage
        id="canvas"
        ref={props.canvasRef}
        width={5100 * zoomVar * 1.55}
        height={3300 * zoomVar * 1.55}
        onClick={handleStageClick}
        onMouseLeave={handlePointerLeave}
      >
        <Layer ref={layerRef}>
          {props.itemList.map((item, index) => (
            <Group>
              <Rect
                x={item.coords[0]}
                y={item.coords[1]}
                width={item.coords[2]}
                height={item.coords[3]}
                fill="white"
                stroke="rgb(4, 150, 255)"
                cornerRadius={10}
              />
              <Text
                x={item.coords[0]}
                y={item.coords[1]}
                width={item.coords[2]}
                height={item.coords[3]}
                fontSize={20}
                fill="rgb(4, 150, 255)"
                text={item.title}
                verticalAlign="middle"
                align="center"
                onClick={() => handleClick(item)}
              />
              {subItems.map((s, ind) => (
                <Group>
                  <Rect
                    x={s.coords[0]}
                    y={s.coords[1]}
                    width={s.coords[2]}
                    height={s.coords[3]}
                    fill="white"
                    stroke="rgb(4, 150, 255)"
                    cornerRadius={10}
                  />
                  <Text
                    x={s.coords[0]}
                    y={s.coords[1]}
                    width={s.coords[2]}
                    height={s.coords[3]}
                    fontSize={20}
                    fill="rgb(4, 150, 255)"
                    text={s.title}
                    verticalAlign="middle"
                    align="center"
                    onPointerEnter={(e) => handleEnter(s, ind)}
                    onPointerLeave={handleExit}
                  />
                </Group>
              ))}
            </Group>
          ))}
          {arrows.map((arr) => (
            <Arrow
              x={arr.x}
              y={arr.y}
              points={arr.points}
              pointerLength={10}
              pointerWidth={10}
              stroke={arr.stroke}
              strokeWidth={4}
            />
          ))}
          {itemWithSubs && itemWithSubs.subItems.length > 0 && (
            <Arrow
              x={itemWithSubs.coords[0] + itemWithSubs.coords[2] / 2}
              y={itemWithSubs.coords[1] + itemWithSubs.coords[3]}
              points={[0, 0, 0, 111]}
              pointerLength={10}
              pointerWidth={10}
              stroke={"rgb(4, 150, 255)"}
              strokeWidth={4}
            />
          )}
        </Layer>
        <Layer name="top-layer" />
      </Stage>
    </div>
  );
}

export default CanvasSpace;
