import React, { useEffect, useState } from "react";

const RecentTasks = ({ selectedFolder }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!taskInput.trim() || !selectedFolder) return;

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      folderId: selectedFolder.id,
      date: new Date().toISOString().split("T")[0],
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTaskInput("");
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = selectedFolder
    ? tasks.filter((task) => task.folderId === selectedFolder.id)
    : [];

  return (
    <div className="bg-base-100 p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">Recent Tasks</h2>

      {selectedFolder ? (
        <>
          <input
            type="text"
            placeholder="Enter a task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="input input-bordered w-full"
          />
          <button onClick={handleAddTask} className="btn btn-primary w-full mt-2">
            Add Task
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-warning font-semibold">
            Please select or create a folder to add tasks.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Tasks are added inside folders. Select a folder first.
          </p>
        </>
      )}

      <ul className="space-y-2 pt-4">
        {filteredTasks.length === 0 && selectedFolder && (
          <p className="text-sm text-gray-500 italic">No tasks in this folder yet.</p>
        )}

        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-3 rounded-lg ${
              task.completed ? "bg-success/20 line-through text-success" : "bg-base-300"
            }`}
          >
            <span>{task.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleToggleComplete(task.id)}
                className="btn btn-xs btn-outline"
              >
                {task.completed ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="btn btn-xs btn-error"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTasks;
