import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  const [username] = useState(localStorage.getItem("username") || "");
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchFilter =
      filter === "all"
        ? true
        : filter === "completed"
        ? task.completed
        : !task.completed;
    const matchSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      description: desc,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };
    setTasks([newTask, ...tasks]);
    setTitle("");
    setDesc("");
    // toast.success("Task added!");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== id));
      // toast.info("Task deleted");
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDesc(task.description);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editTitle, description: editDesc } : task
      )
    );
    cancelEdit();
    // toast.success("Task updated!");
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDesc("");
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-black to-black text-white font-sans flex">
  {/* Sidebar */}
  <aside className="w-full md:w-1/3 lg:w-1/4 bg-black border-r border-gray-700 p-6 flex flex-col gap-6 shadow-xl">
    <h2 className="text-2xl font-semibold">Welcome, {username}</h2>

    {/* Summary */}
    <div className="bg-gray-700 p-4 rounded-xl shadow">
      <h3 className="text-lg font-medium mb-2">Task Overview</h3>
      <ul className="text-sm space-y-1">
        <li>Total Tasks: {tasks.length}</li>
        <li className="text-emerald-400">Completed: {tasks.filter(t => t.completed).length}</li>
        <li className="text-yellow-300">Pending: {tasks.filter(t => !t.completed).length}</li>
      </ul>
    </div>

    {/* Productivity */}
    <div className="bg-gray-700 p-4 rounded-xl shadow">
      <h3 className="text-lg font-medium mb-2">Productivity</h3>
      <p className="text-sm">
        Active Days: <span className="font-semibold">{Math.floor(tasks.length / 3) + 1}</span>
      </p>
      <p className="text-sm">
        Completion Rate:{" "}
        <span className="text-emerald-400 font-semibold">
          {tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0}%
        </span>
      </p>
    </div>

    {/* Date */}
    <div className="bg-gray-700 p-4 rounded-xl shadow text-center">
      <h3 className="text-lg font-medium">Today</h3>
      <p className="text-sm text-gray-300">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>

    {/* Quote */}
    <div className="bg-gray-700 p-4 rounded-xl shadow">
      <h3 className="text-lg font-medium mb-2">Quote of the Day</h3>
      <blockquote className="italic text-sm text-gray-300 border-l-4 pl-3 border-indigo-500">
        “Simplicity is the ultimate sophistication.”<br />
        <span className="text-xs text-gray-400">– Leonardo da Vinci</span>
      </blockquote>
    </div>

      {/* Logout */}
    <button
      onClick={() => {
        localStorage.removeItem("username");
        navigate("/");
      }}
      className="mt-2 bg-red-800 hover:bg-rose-700 text-white py-2 rounded-xl transition"
    >
      Log Out
    </button>

  </aside>

  {/* Main Section */}
  <main className="flex-1 p-6 space-y-6 overflow-y-auto">
    {/* Task Form */}
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-700">
      <h2 className="text-xl font-semibold mb-6">Create a Task</h2>
      <div className="relative mb-4">
        <input
          type="text"
          id="task-title"
          className="peer w-full px-4 pt-5 pb-2 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500"
          placeholder=" "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="task-title" className="absolute left-4 top-2 text-sm text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all">
          Title 
        </label>
      </div>

      <div className="relative mb-6">
        <textarea
          id="task-desc"
          className="peer w-full px-4 pt-5 pb-2 border border-gray-600 rounded-xl bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500"
          placeholder=" "
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label htmlFor="task-desc" className="absolute left-4 top-2 text-sm text-gray-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base transition-all">
          Description (optional)
        </label>
      </div>

      <button
        className="bg-indigo-300 hover:bg-indigo-400 text-black font-semibold px-6 py-2 rounded-2xl transition"
        onClick={addTask}
      >
        Add Task
      </button>
    </div>

    {/* Filter/Search */}
    <div className="flex flex-col md:flex-row items-center justify-between gap-3">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-indigo-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex gap-2 mt-3 flex-wrap">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            className={`px-4 py-1 rounded-full text-sm transition ${
              filter === f
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} (
            {tasks.filter((t) =>
              f === "all" ? true : f === "completed" ? t.completed : !t.completed
            ).length}
            )
          </button>
        ))}
      </div>
    </div>

    {/* Task List */}
    <div className="space-y-4">
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-5 rounded-2xl shadow border transition-all duration-300 hover:shadow-lg ${
              task.completed
                ? "bg-emerald-900 border-emerald-700"
                : "bg-gray-800 border-gray-700"
            }`}
          >
            {editingTaskId === task.id ? (
              <>
                <input
                  className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="bg-indigo-800 hover:bg-indigo-700 text-white px-4 py-1 rounded-xl text-sm"
                    onClick={() => saveEdit(task.id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-1 rounded-xl text-sm"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      task.completed
                        ? "bg-emerald-600 text-white"
                        : "bg-yellow-600 text-black"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </div>
                {task.description && (
                  <p className="text-sm text-gray-300 mb-2">{task.description}</p>
                )}
                <p className="text-xs text-gray-500 mb-4">Created: {task.createdAt}</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    className={`px-4 py-1 rounded-xl text-sm ${
                      task.completed
                        ? "bg-yellow-800 hover:bg-yellow-700 text-white"
                        : "bg-emerald-800 hover:bg-emerald-800 text-white"
                    }`}
                    onClick={() => toggleComplete(task.id)}
                  >
                    {task.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                  <button
                    className="bg-blue-800 hover:bg-blue-800 text-white px-4 py-1 rounded-xl text-sm"
                    onClick={() => startEditing(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-800 hover:bg-rose-800 text-white px-4 py-1 rounded-xl text-sm"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  </main>
</div>

  );
};

export default Dashboard;

