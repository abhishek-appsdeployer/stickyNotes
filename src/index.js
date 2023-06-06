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
      text: "",
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
    const stage = e.currentTarget.getStage();
    const position = stage.getPointerPosition();
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
