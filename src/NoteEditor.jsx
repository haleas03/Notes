export default function NoteEditor({ note, onUpdate }) {
  if (!note) {
    return (
      <div style={{ width: "70%", padding: 20 }}>
        <h2>Selecciona una nota para editar</h2>
      </div>
    );
  }
  const handleChange = (field, value) => {
    onUpdate(note.id, { [field]: value });
  };

  return (
    <div style={{ width: "70%", padding: 20 }}>
      <input
        value={note.title}
        onChange={(e) => handleChange("title", e.target.value)}
        style={{
          width: "90%",
          fontSize: 20,
          marginBottom: 10,
          padding: 8,
        }}
      />

      <textarea
        value={note.content}
        onChange={(e) => handleChange("content", e.target.value)}
        style={{
          width: "90%",
          height: "80vh",
          fontSize: 16,
          padding: 10,
        }}
      />
    </div>

  )
}