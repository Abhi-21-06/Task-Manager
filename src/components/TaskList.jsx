import React from "react";
import TaskItem from "./TaskItem.jsx";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? <p>No tasks to show.</p> : tasks.map(task => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
