import React, { useState, useEffect } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function Notes() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      // Update note
      const updatedNotes = notes.map((note) =>
        note.id === editingId ? { ...note, title, content } : note
      );
      setNotes(updatedNotes);
      setEditingId(null);
    } else {
      // Add new note
      setNotes([
        ...notes,
        { id: Date.now(), title: title.trim(), content: content.trim() },
      ]);
    }

    setTitle("");
    setContent("");
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const handleDelete = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-white focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add/Edit Note */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Title"
          className="flex-1 p-3 rounded-xl bg-gray-800 text-white focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          className="flex-2 p-3 rounded-xl bg-gray-800 text-white focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 p-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 transition"
          onClick={handleAddNote}
        >
          <FiPlus />
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg transition relative"
          >
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-300 mb-4">{note.content}</p>
            <div className="absolute top-3 right-3 flex gap-2">
              <button onClick={() => handleEdit(note)}>
                <FiEdit className="hover:text-blue-500" />
              </button>
              <button onClick={() => handleDelete(note.id)}>
                <FiTrash2 className="hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
