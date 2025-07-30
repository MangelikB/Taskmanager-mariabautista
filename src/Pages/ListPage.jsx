import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; //PUNTO 17
import { TasksContext } from "../Context/TasksContext";

const ListPage = ({ filters }) => {
  const { lists, addTask, deleteTask, toggleTaskDone, deleteList, PRIORITY_ORDER } = useContext(TasksContext);
  const { id } = useParams();
  const navigate = useNavigate(); //PUNTO 6, 9

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskCategory, setNewTaskCategory] = useState("Cardio");

  const currentList = lists.find((l) => l.id === id);

  useEffect(() => {
    if (!currentList) {
      navigate("/");
    }
  }, [currentList, navigate]);

  if (!currentList) return null;

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    addTask(currentList.id, {
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      category: newTaskCategory,
    });
    setNewTaskTitle("");
  };

  let tasksToShow = currentList.tasks;

  if (filters.priority !== "All") {
    tasksToShow = tasksToShow.filter((t) => t.priority === filters.priority.toLowerCase());//PUNTO 12
  }

  if (filters.category !== "All") {
    tasksToShow = tasksToShow.filter((t) => t.category === filters.category);
  }

  if (!filters.showCompleted) {
    tasksToShow = tasksToShow.filter((t) => !t.done);
  }

  tasksToShow.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]); //PUNTO 12

  return (
    <div className="listpage-container">
      <button onClick={() => navigate("/")} className="back-button">← Back to All Lists</button>
      <h2 className="list-title">{currentList.name}</h2>

      <button
        onClick={() => {
          deleteList(currentList.id);
          navigate("/");
        }}
        className="delete-list-btn"
      >
        Delete List
      </button>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />

        <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select value={newTaskCategory} onChange={(e) => setNewTaskCategory(e.target.value)}>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>

        <button onClick={handleAddTask}>Add Task</button>
      </div>

      {tasksToShow.length === 0 && <p className="empty-message">No tasks to display</p>}

      <ul className="task-list">
        {tasksToShow.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.done ? "task-done" : ""}`}
          >
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(currentList.id, task.id)}
                className="task-checkbox"
              />
              <span className="task-text">
                <strong>{task.title}</strong> - <em>{task.priority}</em> - <span>{task.category}</span>
              </span>
            </div>

            <button
              onClick={() => deleteTask(currentList.id, task.id)}
              className="delete-task-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListPage;
