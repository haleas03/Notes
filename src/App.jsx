import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";
import { useState, useEffect } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Nueva nota",
      content: "",
      updated: new Date().toISOString(),
    };

    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (id, updatedFields) => {
    setNotes(prevNotes => {
      const filtered = prevNotes.filter(n => n.id !== id);
      const updatedNote = {
        ...prevNotes.find(n => n.id === id),
        ...updatedFields,
        updated: new Date().toISOString(),
      };
      return [updatedNote, ...filtered];
    });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const selectedNote = notes.find((n) => n.id === selectedNoteId) || null;

  return (
    <div style={{ display: "flex", height: "100vh", position: "relative" }}>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "4px 8px",
          fontSize: 10,
          borderRadius: 5,
          cursor: "pointer",
          border: "none",
          background: darkMode ? "#222" : "#eee",
          color: darkMode ? "#fff" : "#000",
          transition: "0.25s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.15)"
        }}
      >
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </button>

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
