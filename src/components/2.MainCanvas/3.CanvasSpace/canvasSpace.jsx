import React, { useState, useEffect } from "react";
import zoomVar from "../../zoomVar";
import { Stage, Layer, Rect, Text, Arrow } from "react-konva";
// import { update } from "@react-spring/web";

function CanvasSpace(props) {
  // const [arrows, setArrows] = useState([]);
  var arrows = [];

  console.log(props.itemList);

  props.itemList.map((item) => {
    item.subItems.map((s) => {
      drawFillRect(s);
    });
    drawFillRect(item);
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
            });
        });
    });
  });

  // draw rectangle with background
  function drawFillRect(info) {
    const totalWidth = 5100 * zoomVar * 1.55;
    const totalHeight = 3300 * zoomVar * 1.55;
    const itemCount = props.itemList.length;
    const spacesCount = itemCount * 1.618 - 0.618;
    const canvasBorderWidth = 200;
    const spaceWidth = (totalWidth - canvasBorderWidth) / spacesCount;

    var x = (info.id - 1) * spaceWidth * 1.618 + canvasBorderWidth / 2;
    const w = spaceWidth;
    const h = 500 * zoomVar;
    var y = totalHeight / 2 - h / 2;

    if (typeof info.id === "string" && info.id.includes(".")) {
      y = y +100;
    }

    info.coords = [x, y, w, h];
  }

  function drawArrow(fromItem, toID, sucIndex) {
    const toItem = props.itemList[toID - 1];
    //variables to be used when creating the arrow
    const totalHeight = 3300 * zoomVar * 1.55;

    const x = fromItem.coords[0];
    const y = totalHeight / 2;
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

  console.log(arrows);

  function handleOnEnter(item) {
    console.log("Item is" + item);
    // return item.subItems.map((s) => {
    //   return (
    //     <Rect
    //       x={s.coords[0]}
    //       y={s.coords[1]}
    //       width={s.coords[2]}
    //       height={s.coords[3]}
    //       fill="white"
    //       stroke="rgb(4, 150, 255)"
    //       cornerRadius={10}
    //     />
    //   );
    // });
  }

  return (
    <div id="canvasSpace">
      <Stage
        id="canvas"
        ref={props.canvasRef}
        width={5100 * zoomVar * 1.55}
        height={3300 * zoomVar * 1.55}
      >
        <Layer>
          {props.itemList.map((item) => (
            <Rect
              x={item.coords[0]}
              y={item.coords[1]}
              width={item.coords[2]}
              height={item.coords[3]}
              fill="white"
              stroke="rgb(4, 150, 255)"
              cornerRadius={10}
            />
          ))}
          {props.itemList.map((item) => (
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
              onMouseEnter={() => {
                item.subItems.map((s) => {
                  return (
                    <Rect
                      x={s.coords[0]}
                      y={s.coords[1]}
                      width={s.coords[2]}
                      height={s.coords[3]}
                      fill="black"
                      stroke="rgb(4, 150, 255)"
                      cornerRadius={10}
                    />
                  );
                });
              }}
            />
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
        </Layer>
      </Stage>
    </div>
  );
}

export default CanvasSpace;
