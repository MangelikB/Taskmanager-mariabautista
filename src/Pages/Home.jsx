import React, { useContext } from "react";
import { TasksContext } from "../Context/TasksContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { lists } = useContext(TasksContext);

  if (!Array.isArray(lists)) {
    return <p className="error-message">Error: task lists are not available.</p>;
  }

  if (lists.length === 0) {
    return <p className="empty-message">You have no lists. Create one from the navbar!</p>;
  }

  return (
    <div className="home-container">
      <h2 className="home-title">All Lists</h2>
      <div className="lists-grid">
        {lists.map((list) => {
          const totalTasks = Array.isArray(list.tasks) ? list.tasks.length : 0;
          const completedTasks = Array.isArray(list.tasks)
            ? list.tasks.filter((t) => t.done).length
            : 0;

          return (
            <div key={list.id} className="list-card">
              <Link to={`/list/${list.id}`} className="list-title-link">
                {list.name}
              </Link>
              <p className="task-progress">
                {completedTasks} / {totalTasks} tasks completed
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
