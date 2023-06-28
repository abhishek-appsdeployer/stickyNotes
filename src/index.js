import React, { useState } from "react";
import { render } from "react-dom";
import { Stage, Layer } from "react-konva";
import StickyNote from "./StickyNote";

const App = () => {
  const [notes, setNotes] = useState([]);

  const addStickyNote = () => {
    const newNote = {
      id: notes.length + 1,
      x: 50,
      y: 50,
      text: "",
      colour: "#FFDAE1",
      width: 200,
      height: 200,
      selected: false,
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div>
      <button onClick={addStickyNote}>Add Sticky Note</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={(e) => {
          if (e.currentTarget._id === e.target._id) {
            setNotes(notes.map((note) => ({ ...note, selected: false })));
          }
        }}
      >
        <Layer>
          {notes.map((note) => (
            <StickyNote
              key={note.id}
              x={note.x}
              y={note.y}
              text={note.text}
              colour={note.colour}
              onTextChange={(value) => {
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, text: value } : n
                  )
                );
              }}
              width={note.width}
              height={note.height}
              selected={note.selected}
              onTextResize={(newWidth, newHeight) => {
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, width: newWidth, height: newHeight } : n
                  )
                );
              }}
              onClick={() => {
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, selected: !n.selected } : n
                  )
                );
              }}
              onTextClick={(newSelected) => {
                setNotes((prevNotes) =>
                  prevNotes.map((n) =>
                    n.id === note.id ? { ...n, selected: newSelected } : n
                  )
                );
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

render(<App />, document.getElementById("root"));
