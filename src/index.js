import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  const addStickyNote = () => {
    const newNote = {
      id: Date.now(),
      x: textPosition.x,
      y: textPosition.y,
      text: "dfdf",
      width: 200,
      height: 200,
      selected: false,
    };

    setNotes([...notes, newNote]);
  };

  const handleTextChange = (id, value) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: value } : note
    );

    setNotes(updatedNotes);
  };

  const handleTextResize = (id, newWidth, newHeight) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, width: newWidth, height: newHeight } : note
    );

    setNotes(updatedNotes);
  };

  const handleNoteClick = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, selected: !note.selected } : note
    );

    setNotes(updatedNotes);
  };

  const handleTextClick = (id, newSelected) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, selected: newSelected } : note
    );

    setNotes(updatedNotes);
  };

 
  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const stagePosition = stage.getClientRect(); // Get the position and size of the stage
    const stageOffsetX = stagePosition.x; // Offset of the stage on the x-axis
    const stageOffsetY = stagePosition.y; // Offset of the stage on the y-axis
    const pointerPosition = stage.getPointerPosition(); // Get the mouse pointer position
    const offsetX = pointerPosition.x - stageOffsetX; // Calculate the offset on the x-axis
    const offsetY = pointerPosition.y - stageOffsetY; // Calculate the offset on the y-axis
  
    const position = {
      x: offsetX,
      y: offsetY,
    };
  
    setTextPosition(position);
   
  };
  

  return (
    <div>
      <button onClick={addStickyNote}>Add Sticky Note</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
      >
        <Layer>
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              x={note.x}
              y={note.y}
              text={note.text}
              color="#FFDAE1"
              onTextChange={(value) => handleTextChange(note.id, value)}
              width={note.width}
              height={note.height}
              selected={note.selected}
              onTextResize={(newWidth, newHeight) =>
                handleTextResize(note.id, newWidth, newHeight)
              }
              onClick={() => handleNoteClick(note.id)}
              onTextClick={(newSelected) =>
                handleTextClick(note.id, newSelected)
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

render(<App />, document.getElementById("root"));
