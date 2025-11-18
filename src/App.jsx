import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";
import { useState, useEffect } from "react";

export default function App(){
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect (() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes (JSON.parse(saved));
  }, []);

  useEffect(() =>{
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]) 

  const createNote = () => {
    const newNote = {
      id: Date.now(), 
      title: "Nueva nota", 
      content: "", 
      updated: new Date().toISOString(),
    };

    setNotes ([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(
      notes.map((n) =>
      n.id === id 
      ? { ...n, ...updatedFields, updated: new Date().toISOString() }
      : n
      )
    );
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null; 

  return(
    <div style={{display: "flex", height: "100vh" }}>
      <NotesList
      notes={notes}
      onSelect={setSelectedNoteId}
      selectedNoteId={selectedNoteId}
      onCreate={createNote}
      onDelete={deleteNote}
      />

      <NoteEditor note={selectedNote} onUpdate={updateNote} />
    </div>
  );

}
