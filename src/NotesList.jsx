import { useState } from "react";

export default function NotesList({ notes, onSelect, selectedNoteId, onCreate, onDelete }) {
  const [search, setSearch] = useState("");

const filteredNotes = notes.filter((note) => 
note.title.toLowerCase().includes(search.toLowerCase()) ||
(note.body || "").toLowerCase().includes(search.toLowerCase())
);

  return (
    <div
      style={{
        width: "30%",
        borderRight: "1px solid #ccc",
        padding: 20,
        overflowY: "auto",
      }}
    >

<input 
type="text"
placeholder="Buscar notas..."
value={search}
onChange={(e) => setSearch(e.target.value)}
style={{
  padding: 10,
  width: "100%",
  marginBottom:15, 
  borderRadius: 8, 
  border: "1px solid #ccc",
  outline: "none",
}}
/>

      <button
        onClick={onCreate}
        style={{ marginBottom: 20, padding: 10, width: "100%" }}
      >
        Nueva nota
      </button>

      {filteredNotes.map((note) => (
        <div
          key={note.id}
          onClick={() => onSelect(note.id)}
          className={`note-item ${selectedNoteId === note.id ? "selected" : ""}`}
          style={{
            padding: 10,
            marginBottom: 10,
            cursor: "pointer",
            borderRadius: 8,
            background: selectedNoteId === note.id ? "#FFF9C4" : "#FFF9C4",
            border: "1px solid #ddd",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 5 }}>{note.title}</div>
          <div style={{ fontSize: 12, color: "#666" }}>
            {new Date(note.updated).toLocaleString()}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            style={{ marginTop: 10, padding: 5, width: "100%" }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}