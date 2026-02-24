import React, { useEffect, useState } from "react";
import { FiUsers, FiCheckCircle, FiClipboard } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const savedEvents = JSON.parse(localStorage.getItem("calendar-events")) || [];

    setTasks(savedTasks);
    setNotes(savedNotes);
    setEvents(savedEvents);
  }, []);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks Status",
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#4ade80", "#facc15"],
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 min-h-full text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-900 p-4 rounded-xl flex items-center gap-4 hover:scale-105 transition-transform">
          <FiClipboard size={32} />
          <div>
            <p className="text-gray-400 text-sm">Total Tasks</p>
            <h2 className="text-xl font-semibold">{tasks.length}</h2>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl flex items-center gap-4 hover:scale-105 transition-transform">
          <FiCheckCircle size={32} />
          <div>
            <p className="text-gray-400 text-sm">Completed Tasks</p>
            <h2 className="text-xl font-semibold">{completedTasks}</h2>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-xl flex items-center gap-4 hover:scale-105 transition-transform">
          <FiUsers size={32} />
          <div>
            <p className="text-gray-400 text-sm">Notes</p>
            <h2 className="text-xl font-semibold">{notes.length}</h2>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="bg-gray-900 p-6 rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>

      {/* Quick Events */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-gray-400">No events this month.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {events.map((e) => (
              <li key={e.id} className="p-2 bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-700 transition">
                <span>{e.title}</span>
                <span className="text-sm text-gray-400">{e.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
