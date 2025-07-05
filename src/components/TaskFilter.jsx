import React from "react";

const TaskFilter = ({ filter, setFilter, counts }) => {
  return (
    <div className="flex gap-3 mb-4">
      {["all", "completed", "pending"].map((type) => (
        <button
          key={type}
          className={`px-4 py-2 rounded ${filter === type ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)} ({counts[type]})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
