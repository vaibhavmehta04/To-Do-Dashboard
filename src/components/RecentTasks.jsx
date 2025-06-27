import React, { useEffect, useState } from "react";

const RecentTasks = ({ selectedFolder }) => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [input, setInput] = useState("");
  const [taskDate, setTaskDate] = useState(getTodayLocalDate());

  // ✅ Get today's date in local yyyy-mm-dd
  function getTodayLocalDate() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    return local.toISOString().split("T")[0];
  }

  // ✅ Convert any selected date to local yyyy-mm-dd
  function getLocalDateString(date) {
    const offset = date.getTimezoneOffset();
    const local = new Date(date.getTime() - offset * 60000);
    return local.toISOString().split("T")[0];
  }

  useEffect(() => {
    const active = JSON.parse(localStorage.getItem("tasks")) || [];
    const done = JSON.parse(localStorage.getItem("completedTasks")) || [];
    setTasks(active);
    setCompletedTasks(done);
  }, []);

  const saveActive = (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const saveCompleted = (done) => {
    localStorage.setItem("completedTasks", JSON.stringify(done));
    setCompletedTasks(done);
  };

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      folder: selectedFolder || "Uncategorized",
      date: getLocalDateString(new Date(taskDate)), // ✅ Correct local date
    };

    const newTasks = [...tasks, newTask];
    saveActive(newTasks);
    setInput("");
    setTaskDate(getTodayLocalDate());
  };

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = tasks.filter((t) => t.id !== id);
    saveActive(updated);
    saveCompleted([{ ...task, completed: true }, ...completedTasks]);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    saveActive(updated);
  };

  const deleteCompletedTask = (id) => {
    const updated = completedTasks.filter((t) => t.id !== id);
    saveCompleted(updated);
  };

  const filtered = tasks.filter((t) => t.folder === selectedFolder);
  const filteredCompleted = completedTasks.filter(
    (t) => t.folder === selectedFolder
  );

  return (
    <div className="bg-base-100 text-base-content p-6 rounded-2xl shadow space-y-6">
      <div>
        <h2 className="text-xl font-bold">
          Tasks {selectedFolder && `(${selectedFolder})`}
        </h2>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            type="text"
            placeholder={`Add task in "${selectedFolder}"...`}
            className="input input-bordered input-sm w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered input-sm"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
          />
          <button onClick={addTask} className="btn btn-primary btn-sm">
            Add
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400">No active tasks.</p>
        )}
        {filtered.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-base-200 p-2 rounded-lg"
          >
            <div className="flex flex-col w-full pr-2">
              <span
                className={`truncate ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
              <span className="text-xs text-gray-400">📅 {task.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <button
                className="btn btn-xs btn-error text-white"
                onClick={() => deleteTask(task.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>

      {filteredCompleted.length > 0 && (
        <div>
          <h3 className="text-md font-semibold">Completed Tasks</h3>
          <ul className="space-y-2 mt-2">
            {filteredCompleted.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center bg-base-200 p-2 rounded-lg"
              >
                <div className="flex flex-col w-full pr-2">
                  <span className="line-through text-gray-400">{task.text}</span>
                  <span className="text-xs text-gray-400">📅 {task.date}</span>
                </div>
                <button
                  className="btn btn-xs btn-error text-white"
                  onClick={() => deleteCompletedTask(task.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecentTasks;
