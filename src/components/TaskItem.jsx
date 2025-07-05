import React from "react";

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`p-3 border rounded shadow-sm flex justify-between items-start ${task.completed ? "bg-gray-100 line-through" : "bg-white"}`}>
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p>{task.description}</p>
        <small className="text-gray-500">Created: {new Date(task.createdAt).toLocaleString()}</small>
      </div>
      <div className="flex flex-col items-end gap-2">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
          Done
        </label>
        <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
