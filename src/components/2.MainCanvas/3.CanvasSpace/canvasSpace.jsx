import React, { useRef, useEffect } from "react";
import zoomVar from "../../zoomVar";
// import { update } from "@react-spring/web";

function CanvasSpace(props) {
  const canvas = useRef();
  let ctx = null;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    // get context of the canvas
    ctx = canvasEle.getContext("2d");
  });

  useEffect(() => {
    props.itemList.map((item) => {
      drawFillRect(item);
    });
    props.itemList.map((item) => {
      drawArrow(item.id);
    });
  });

  // draw rectangle with background
  const drawFillRect = (info) => {
    const totalWidth = 5100 * zoomVar * 1.55;
    const totalHeight = 3300 * zoomVar;
    const itemCount = props.itemList.length;
    const spacesCount = itemCount * 1.618 - 0.618;
    const canvasBorderWidth = 200;
    const spaceWidth = (totalWidth - canvasBorderWidth) / spacesCount;

    const x = (info.id - 1) * spaceWidth * 1.618 + canvasBorderWidth / 2;
    const w = spaceWidth;
    const h = 500 * zoomVar;
    const y = totalHeight / 2 - h / 2;

    const textx = x + w / 2;
    const texty = y + h / 2;

    const borderColor = "rgb(0, 107, 166)",
      borderWidth = "2px",
      backgroundColor = "white";

    ctx.beginPath();
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.rect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
    ctx.stroke();

    ctx.font = 90 * zoomVar + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "rgb(4, 150, 255)";
    ctx.measureText(info.title); // TextMetrics object
    ctx.fillText(info.title, textx, texty);
  };

  const drawArrow = (info) => {
    if (info !== props.itemList.length) {
      //variables to be used when creating the arrow
      const totalWidth = 5100 * zoomVar * 1.55;
      const totalHeight = 3300 * zoomVar;
      const itemCount = props.itemList.length;
      const spacesCount = itemCount * 1.618 - 0.618;
      const canvasBorderWidth = 200;
      const spaceWidth = (totalWidth - canvasBorderWidth) / spacesCount;

      const x = (info - 1) * spaceWidth * 1.618 + canvasBorderWidth / 2;
      const y = totalHeight / 2;
      const w = spaceWidth;
      const fromx = x + w,
        fromy = y,
        tox = fromx + spaceWidth * 0.618 - 5,
        toy = y;
      var headlen = 10;
      var angle = Math.atan2(toy - fromy, tox - fromx);

      ctx.save();
      ctx.strokeStyle = "rgb(255, 188, 66)";

      //starting path of the arrow from the start square to the end square
      //and drawing the stroke
      ctx.beginPath();
      ctx.moveTo(fromx, fromy);
      ctx.lineTo(tox, toy);
      ctx.lineWidth = 5;
      ctx.stroke();

      //starting a new path from the head of the arrow to one of the sides of
      //the point
      ctx.beginPath();
      ctx.moveTo(tox, toy);
      ctx.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 7),
        toy - headlen * Math.sin(angle - Math.PI / 7)
      );

      //path from the side point of the arrow, to the other side point
      ctx.lineTo(
        tox - headlen * Math.cos(angle + Math.PI / 7),
        toy - headlen * Math.sin(angle + Math.PI / 7)
      );

      //path from the side point back to the tip of the arrow, and then
      //again to the opposite side point
      ctx.lineTo(tox, toy);
      ctx.lineTo(
        tox - headlen * Math.cos(angle - Math.PI / 7),
        toy - headlen * Math.sin(angle - Math.PI / 7)
      );

      //draws the paths created above
      ctx.stroke();
      ctx.restore();
    }
  };

  return (
    <div id="canvasSpace">
      <canvas
        id="canvas"
        ref={canvas}
        width={5100 * zoomVar * 1.55}
        height={3300 * zoomVar}
      ></canvas>
    </div>
  );
}

export default CanvasSpace;
