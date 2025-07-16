import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onDelete }) => {
  return (
    <div className="task-wrapper">
      {tasks.length === 0 ? (
        <p>🎯 No tasks to display. Add a new one!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete} //PUNTO - 3,11
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
