import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendarStyles.css"; // Ensure this exists

// ✅ Helper to get local date in yyyy-mm-dd
const getLocalDateString = (date) => {
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().split("T")[0];
};

const CalendarSection = () => {
  const [date, setDate] = useState(new Date());
  const [taskMap, setTaskMap] = useState({});
  const [tasksOnDate, setTasksOnDate] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const map = {};
    tasks.forEach((task) => {
      if (task.date) {
        if (!map[task.date]) map[task.date] = [];
        map[task.date].push(task.text);
      }
    });
    setTaskMap(map);

    // Also load tasks for today
    const todayKey = getLocalDateString(new Date());
    setTasksOnDate(map[todayKey] || []);
  }, []);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    const key = getLocalDateString(selectedDate);
    setTasksOnDate(taskMap[key] || []);
  };

  return (
    <div className="bg-base-100 text-base-content p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">Calendar</h2>

      <div className="rounded-xl overflow-hidden">
        <Calendar
          onChange={handleChange}
          value={date}
          className="w-full"
          tileClassName={({ date }) => {
            const key = getLocalDateString(date); // ✅ fixed
            return taskMap[key] ? "highlighted-date" : "";
          }}
        />
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-1">
          Selected:{" "}
          <span className="font-semibold text-base-content">
            {date.toDateString()}
          </span>
        </p>
        {tasksOnDate.length > 0 ? (
          <ul className="text-sm list-disc ml-5 text-gray-300">
            {tasksOnDate.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No tasks on this date.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarSection;
