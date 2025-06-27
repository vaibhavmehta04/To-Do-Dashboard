// 📁 src/components/Folders.jsx
import React, { useEffect, useState } from "react";

const Folders = ({ selectedFolder, setSelectedFolder }) => {
  const [folders, setFolders] = useState([]);
  const [folderInput, setFolderInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("folders")) || [];
    setFolders(saved);
    if (!selectedFolder && saved.length > 0) {
      setSelectedFolder(saved[0].name);
    }
  }, []);

  const addFolder = () => {
    if (!folderInput.trim()) return;
    const updated = [...folders, { id: Date.now(), name: folderInput }];
    localStorage.setItem("folders", JSON.stringify(updated));
    setFolders(updated);
    setFolderInput("");
  };

  return (
    <div className="bg-base-100 text-base-content p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">Folders</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="New folder..."
          className="input input-bordered input-sm w-full"
          value={folderInput}
          onChange={(e) => setFolderInput(e.target.value)}
        />
        <button onClick={addFolder} className="btn btn-primary btn-sm">
          Add
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => setSelectedFolder(folder.name)}
            className={`badge px-4 py-2 cursor-pointer ${
              selectedFolder === folder.name ? "badge-primary" : "badge-outline"
            }`}
          >
            {folder.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Folders;