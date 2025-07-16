const TaskItem = ({ task, onToggle, onDelete }) => {
  const { id, title, emoji, priority, done } = task;

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "#e63946";
      case "medium":
        return "#ff9f1c";
      case "low":
        return "#06d6a0";
      default:
        return "#ccc";
    }
  };

  return (
    <li className="task-item" style={{ borderLeft: `5px solid ${getPriorityColor()}` }}>
      <div className="task-content">
        <span className="emoji">{emoji}</span>
        <strong style={{ textDecoration: done ? "line-through" : "none" }}>{title}</strong>
        <span style={{ marginLeft: "auto", fontStyle: "italic" }}>({priority})</span>
      </div>

      <div className="buttons">
        <button
          className={`done ${done ? "disabled" : ""}`}
          onClick={() => !done && onToggle(id, true)}
          disabled={done}
        >
          ✅ Done
        </button>

        <button
          className={`pending ${!done ? "disabled" : ""}`}
          onClick={() => done && onToggle(id, false)}
          disabled={!done}
        >
          ⏳ Pending
        </button>

        <button className="delete" onClick={() => onDelete(id)}>
        ❌ Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
