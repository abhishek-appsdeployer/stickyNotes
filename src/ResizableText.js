import React, { useRef, useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";
import TextStyle from "./TextStyle";

export function ResizableText({
  x,
  y,
  text,
  isSelected,
  width,
  onResize,
  onClick,
  onDoubleClick,
  onDragEnd
}) {
  const textRef = useRef(null);
  const transformerRef = useRef(null);
  const  [fontf,setfontfamily]=useState("Arial")
  const  [textDecoration,setTextDecoration]=useState(false)
  const [fontbold,setfontBold]=useState(false)
  const [italic,setItalic]=useState(false)

  useEffect(() => {
    if (isSelected && transformerRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleResize() {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        scaleX: 1
      });
      onResize(newWidth, newHeight);
    }
  }

  function handleDragMove(event) {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newX = textNode.x() + event.target.x();
      const newY = textNode.y() + event.target.y();
      textNode.setAttrs({
        x: newX,
        y: newY
      });
      onDragEnd(newX, newY);
    }
  }

  const transformer = isSelected ? (
    <Transformer
      ref={transformerRef}
      rotateEnabled={false}
      flipEnabled={false}
      enabledAnchors={["middle-left", "middle-right"]}
      boundBoxFunc={(oldBox, newBox) => {
        newBox.width = Math.max(30, newBox.width);
        return newBox;
      }}
    />
  ) : null;

  return (
    <>
     <Text
  x={x}
  y={y}
  ref={textRef}
  text={text}
  fill="black"
  fontFamily={fontf}
  fontSize={24}
  perfectDrawEnabled={false}
  onTransform={handleResize}
  onClick={onClick}
  onTap={onClick}
  onDblClick={onDoubleClick}
  // onDragMove={handleDragMove}
  width={width}
  textDecoration={textDecoration?"underline":"none"}
  fontStyle={italic ?"italic":"normal"}
  fontWeight={fontbold?"normal":"bold" }
  draggable
/>

      {transformer}

      {
        isSelected ? <TextStyle 
          fontFamily={(re)=>setfontfamily(re)}
          onTextDecoration={()=>setTextDecoration(!textDecoration)}
          onFontWeight={()=>setfontBold(!fontbold)}
  onItalicChange={()=>setItalic(!italic)}
        />:null
      }
    </>
  );
}
