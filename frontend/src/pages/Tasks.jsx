import React, { useState } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [taskTitle, setTaskTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const statuses = ["todo", "in-progress", "done"];

  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t =>
        t.id === editingId ? { ...t, title: taskTitle } : t
      ));
      setEditingId(null);
    } else {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: taskTitle, status: "todo" },
      ]);
    }

    setTaskTitle("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleEdit = (task) => {
    setTaskTitle(task.title);
    setEditingId(task.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);

    setTasks(arrayMove(tasks, oldIndex, newIndex));
  };

  const getTasksByStatus = (status) =>
    tasks.filter((t) => t.status === status);

  const TaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="bg-gray-800 p-3 rounded-xl mb-2 flex justify-between items-center shadow"
      >
        {task.title}
        <div className="flex gap-2">
          <button onClick={() => handleEdit(task)}>
            <FiEdit className="hover:text-blue-400" />
          </button>
          <button onClick={() => handleDelete(task.id)}>
            <FiTrash2 className="hover:text-red-400" />
          </button>
        </div>
      </div>
    );
  };

  const total = tasks.length;
  const done = getTasksByStatus("done").length;
  const progressPercent = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="p-6 text-white min-h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold mb-4">My Tasks</h1>

      {/* PROGRESS BAR */}
      <div className="mb-6">
        <p className="mb-2 font-semibold">Progress: {progressPercent}%</p>
        <div className="w-full h-3 bg-gray-700 rounded-full">
          <div
            className="h-3 bg-green-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* ADD TASK */}
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Task Title"
          className="flex-1 p-3 rounded-xl bg-gray-800"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 p-3 rounded-xl flex items-center gap-2"
          onClick={handleAddTask}
        >
          <FiPlus />
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* COLUMNS */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <div key={status} className="bg-gray-900 p-4 rounded-xl min-h-[300px]">
              <h2 className="text-xl font-bold capitalize mb-4">
                {status.replace("-", " ")}
              </h2>

              <SortableContext
                items={getTasksByStatus(status).map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {getTasksByStatus(status).map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
