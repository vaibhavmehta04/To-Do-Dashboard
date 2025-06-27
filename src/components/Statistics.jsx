import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const counts = {};

    tasks.forEach((task) => {
      if (task.completed) {
        const date = new Date(task.id).toLocaleDateString("en-GB");
        counts[date] = (counts[date] || 0) + 1;
      }
    });

    const formatted = Object.entries(counts).map(([date, count]) => ({
      date,
      tasks: count,
    }));

    setData(formatted);
  }, []);

  return (
    <div className="bg-base-100 text-base-content p-6 rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-bold">Statistics</h2>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400">No completed task data yet.</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="date" stroke="#d1d5db" />
              <YAxis allowDecimals={false} stroke="#d1d5db" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                  color: "#f9fafb",
                }}
              />
              <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Statistics;
