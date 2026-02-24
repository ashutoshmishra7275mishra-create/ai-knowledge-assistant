import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus, FiTrash } from "react-icons/fi";

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendar-events");
    return saved ? JSON.parse(saved) : [];
  });

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const addEvent = () => {
    const title = prompt("Event title:");
    if (!title) return;

    const date = prompt("YYYY-MM-DD format date:");
    if (!date) return;

    const category = prompt("Category (Work/Personal/Other):") || "General";

    const newEvent = { id: Date.now(), title, date, category };
    const updated = [...events, newEvent];

    setEvents(updated);
    localStorage.setItem("calendar-events", JSON.stringify(updated));
  };

  const deleteEvent = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    localStorage.setItem("calendar-events", JSON.stringify(updated));
  };

  const changeMonth = (direction) => {
    let newMonth = currentMonth + direction;
    let year = currentYear;

    if (newMonth === 12) {
      newMonth = 0;
      year++;
    } else if (newMonth === -1) {
      newMonth = 11;
      year--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(year);
  };

  // Generate Calendar Grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);

  for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);

  // Get events on specific date
  const getEventsForDate = (day) => {
    const month = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    const dateStr = `${currentYear}-${month}-${d}`;

    return events.filter((e) => e.date === dateStr);
  };

  return (
    <div className="p-6 text-white min-h-full">
      <h2 className="text-3xl font-bold mb-6">Calendar</h2>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700"
        >
          <FiChevronLeft size={22} />
        </button>

        <h3 className="text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h3>

        <button
          onClick={() => changeMonth(1)}
          className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700"
        >
          <FiChevronRight size={22} />
        </button>

        <button
          onClick={addEvent}
          className="p-2 bg-blue-600 rounded-xl hover:bg-blue-500 flex items-center gap-2"
        >
          <FiPlus />
          Add Event
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-3">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-gray-400 font-semibold">
            {day}
          </div>
        ))}

        {calendarCells.map((day, index) => (
          <div
            key={index}
            className={`h-28 bg-gray-900 border border-gray-700 rounded-xl p-2 
              flex flex-col gap-1 overflow-y-auto 
              ${day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? "bg-blue-900 border-blue-400"
                : ""}`}
          >
            <span className="font-semibold text-gray-300">{day || ""}</span>

            {day &&
              getEventsForDate(day).map((event) => (
                <div
                  key={event.id}
                  className="bg-purple-700 text-xs p-1 rounded-md flex justify-between items-center"
                >
                  {event.title}
                  <FiTrash
                    className="cursor-pointer ml-2"
                    size={14}
                    onClick={() => deleteEvent(event.id)}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
