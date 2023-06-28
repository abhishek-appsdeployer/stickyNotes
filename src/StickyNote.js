import React, { useState, useEffect } from "react";
import { Group, Rect } from "react-konva";
import { EditableText } from "./EditableText";

export default function StickyNote({
  colour,
  text,
  x,
  y,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  }
  const [textX, setTextX] = useState(x);
  const [textY, setTextY] = useState(y);

  return (
    <Group x={x} y={y}>
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        fill={colour}
        perfectDrawEnabled={false}
        onClick={onClick}
        onTap={onClick}
        draggable
        onDragEnd={(e) => {
          const newX = e.target.x();
          const newY = e.target.y();
          onClick();
          // Update the x and y values of the sticky note
          // and the textX and textY values of the editable text component
          x = newX;
          y = newY;
          setTextX(newX + 5);
          setTextY(newY);
        }}
      />
      <EditableText
        x={textX + 20}
        y={textY + 40}
        text={text}
        width={width}
        height={height - 10}
        onResize={onTextResize}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        onToggleTransform={toggleTransforming}
        onChange={onTextChange}
      />
    </Group>
  );
}
