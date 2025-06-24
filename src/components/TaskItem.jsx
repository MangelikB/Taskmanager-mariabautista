const TaskItem = ({ task, isDone, onToggle }) => {
  return (
    <li className="task-item">
      <div className="task-content">
        <span className="emoji">{task.emoji}</span>
        <strong>{task.title}</strong>
      </div>
      <div className="buttons">
        <button 
          className="done" 
          onClick={() => onToggle(task.title, true)} 
          disabled={isDone}
        >
          ✅ Done
        </button>
        <button 
          className="pending" 
          onClick={() => onToggle(task.title, false)} 
          disabled={!isDone}
        >
          ⏳ Pending
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
