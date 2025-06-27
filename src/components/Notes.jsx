import React, { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  const saveNotes = (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const addNote = () => {
    if (!input.trim()) return;
    const newNotes = [
      ...notes,
      { id: Date.now(), text: input.trim(), date: new Date().toLocaleString() },
    ];
    saveNotes(newNotes);
    setInput("");
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    saveNotes(filtered);
  };

  return (
    <div className="bg-base-100 text-base-content p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">Notes</h2>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a note..."
          className="input input-bordered input-sm w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addNote} className="btn btn-primary btn-sm">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {notes.length === 0 && (
          <p className="text-sm text-gray-400 italic">No notes yet.</p>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-start bg-base-200 p-3 rounded-xl"
          >
            <div>
              <p className="text-sm mb-1">{note.text}</p>
              <p className="text-xs text-gray-500">{note.date}</p>
            </div>
            <button
              onClick={() => deleteNote(note.id)}
              className="btn btn-xs btn-error ml-2"
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
