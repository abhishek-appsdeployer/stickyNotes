import React, { useState, useRef } from "react";
import { Html } from "react-konva-utils";
// import { Colors } from "../../utils/Colors";
const TextStyleContainer = {
  display: "flex",
  justifyContent: "space-between",
  border: "2px solid black",
  borderRadius: "10px",
  gap: "10px",
  backgroundColor: "gray",
  padding: "10px",
};

const TextStyle = ({
  x,
  y,
  onTextAlignChange,
  fontFamily,
  onFontWeight,
  onItalicChange,
  onTextDecoration,
  onColor,
 
}) => {
  const [clickedIcon, setClickedIcon] = useState(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedFont, setSelectedFont] = useState("");
  const colorOptions = ["red", "black", "orange"];

  const handleIconClick = (iconName) => {
    setClickedIcon((prevIcon) => (prevIcon === iconName ? null : iconName));
    onTextAlignChange(iconName);
  };

  const handleBoldClick = () => {
    setIsBold((prevIsBold) => !prevIsBold);
    onFontWeight();
  };

  const handleItalicClick = () => {
    setIsItalic((prevIsItalic) => !prevIsItalic);
    onItalicChange();
  };

  const handleUnderlineClick = () => {
    setIsUnderline((prevIsUnderline) => !prevIsUnderline);
    onTextDecoration();
  };

  const getIconStyle = (iconName) => {
    return {
      fontSize: "20px",
      color: clickedIcon === iconName ? "white" : "black",
      cursor: "pointer",
    };
  };

  const getButtonStyle = (isActive) => {
    return {
      border: "none",
      fontWeight: isActive ? "bold" : "normal",
      cursor: "pointer",
      background: "none",
      textDecoration: isActive ? "underline" : "none",
      fontStyle: isActive ? "italic" : "normal",
    };
  };

  const groupRef = useRef(null);

  const handleFontChange = (event) => {
    const fontName = event.target.value;
    setSelectedFont(fontName);
    fontFamily(fontName);
    // Call your font change function or update state with the selected font name
    // Example: onFontChange(fontName);
  };
  const handleColorClick = (color) => {
    console.log("Colors", color);

    onColor(color);
  };

  return (
    <Html
      groupRef={groupRef}
      groupProps={{ x, y }}
      divProps={TextStyleContainer}
    >
      <div style={TextStyleContainer}>
        <button onClick={handleBoldClick} style={getButtonStyle(isBold)}>
          B
        </button>
        <button onClick={handleItalicClick} style={getButtonStyle(isItalic)}>
          I
        </button>
        <button
          onClick={handleUnderlineClick}
          style={getButtonStyle(isUnderline)}
        >
          U
        </button>
        <button
          onClick={handleUnderlineClick}
          style={getButtonStyle(isUnderline)}
        >
          +
        </button>
        <button
          onClick={handleUnderlineClick}
          style={getButtonStyle(isUnderline)}
        >
          -
        </button>
        <span>
          <i
            className="fa fa-align-left"
            style={getIconStyle("left")}
            onClick={() => handleIconClick("left")}
          ></i>
        </span>
        <span>
          <i
            className="fa fa-align-right"
            style={getIconStyle("right")}
            onClick={() => handleIconClick("right")}
          ></i>
        </span>
        <span>
          <i
            className="fa fa-align-center"
            style={getIconStyle("center")}
            onClick={() => handleIconClick("center")}
          ></i>
        </span>
        <select value={selectedFont} onChange={handleFontChange}>
          <option value="">Select Font</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Impact">Impact</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Palatino Linotype">Palatino Linotype</option>
        </select>
        {colorOptions.map((color, index) => (
          <span key={index}>
            <i
              className="fa fa-circle"
              style={{ color: color }}
              onClick={() => handleColorClick(color)}
            ></i>
          </span>
        ))}
      </div>
    </Html>
  );
};

export default TextStyle;
