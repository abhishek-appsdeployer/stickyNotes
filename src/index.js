import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer } from "react-konva";
import { StickyNote } from "./StickyNote";

const App = () => {
  const [notes, setNotes] = useState([]);

  const handleStageMouseDown = (event) => {
    const { offsetX, offsetY } = event.evt;

    const newNote = {
      id: Date.now(),
      x: offsetX,
      y: offsetY,
      text: "Click to resize. Double click to edit.",
      width: 200,
      height: 200,
      selected: false,
    };

    setNotes([...notes, newNote]);
  };

  const handleTextChange = (id, value) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, text: value };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const handleTextResize = (id, newWidth, newHeight) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, width: newWidth, height: newHeight };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const handleNoteClick = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, selected: !note.selected };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const handleTextClick = (id, newSelected) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, selected: newSelected };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  const handleDragEnd = (id, newX, newY) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...notes, x: newX, y: newY };
      }
      return note;
    });
  
    setNotes(updatedNotes);
  };
  

  const addStickyNote = () => {
    const newNote = {
      id: Date.now(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      text: "Click to resize. Double click to edit.",
      width: 200,
      height: 200,
      selected: false,
     
    };
    console.log(newNote.x,newNote.y)
    setNotes([...notes, newNote]);
  };

  return (
    <div>
      <button onClick={addStickyNote}>Add Text</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        // onMouseDown={handleStageMouseDown}
      >
        <Layer>
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              x={note.x}
              y={note.y}
              text={note.text}
              colour="#FFDAE1"
              onTextChange={(value) => handleTextChange(note.id, value)}
              width={note.width}
              height={note.height}
              selected={note.selected}
              onTextResize={(newWidth, newHeight) =>
                handleTextResize(note.id, newWidth, newHeight)}
             
                // onClick={() => handleNoteClick(note.id)}
                onClick={() => console.log("dfdfd")}
              onTextClick={(newSelected) => handleTextClick(note.id, newSelected)}
              // onDragEnd={(x,y) => handleDragEnd(note.id, x, y)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

render(<App />, document.getElementById("root"));
