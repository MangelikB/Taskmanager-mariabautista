import { useState } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTaskStatus = (title, done) => {
    setCompletedTasks(prev => ({
      ...prev,
      [title]: done,
    }));
  };

  return (
    <div className="task-wrapper">
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem 
            key={task.title} 
            task={task} 
            isDone={!!completedTasks[task.title]} 
            onToggle={toggleTaskStatus}
          />
        ))}
      </ul>
      {tasks.length > 0 && tasks.every(task => completedTasks[task.title]) && (
        <p>🎉 All tasks completed! Great job! 🎉</p>
      )}
    </div>
  );
};

export default TaskList;
