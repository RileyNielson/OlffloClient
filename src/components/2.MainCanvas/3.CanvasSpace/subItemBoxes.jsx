import React, { useState } from "react";
import { Rect, Text, Group } from "react-konva";

function SubItemBoxes(props) {
  const [subItems, setSubItems] = useState(
    JSON.parse(JSON.stringify(props.subItems))
  );

  function handleEnter(e, subItem, ind, item) {
    const subArray = JSON.parse(JSON.stringify(subItems));
    subArray.splice(ind, 1);
    subArray.push(subItem);
    console.log(subArray);
    setSubItems(subArray);
  }

  function handleExit() {
    setSubItems(props.item.subItems);
  }

  return (
    <Group>
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
            onPointerEnter={(e) => handleEnter(e, s, ind, props.item)}
            onPointerLeave={handleExit}
          />
        </Group>
      ))}
    </Group>
  );
}

export default SubItemBoxes;
