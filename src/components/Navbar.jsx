import React, { useContext, useState } from "react";
import { TasksContext } from "../Context/TasksContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ filters, setFilters }) => {
  const { lists = [], addList } = useContext(TasksContext);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  const handleAddList = () => {
    if (!newListName.trim()) return;
    addList(newListName);
    setNewListName("");
  };

  const handleListChange = (e) => {
    const selectedId = e.target.value;
    setFilters((prev) => ({ ...prev, listId: selectedId }));
    if (selectedId === "all") {
      navigate("/");
    } else {
      navigate(`/list/${selectedId}`);
    }
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">WorkoutPlanner</h1>

      <div className="filter-buttons-group">

         <div className="new-list-container">
          <input
            type="text"
            placeholder="New list name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            className="filter-input"
          /> 
          <button onClick={handleAddList} className="filter-button">
            Add List
          </button>
        </div>
        
        <select
          className="filter-button"
          value={filters.listId}
          onChange={handleListChange}
        >
          <option value="all">All Lists</option>
          {lists.map((list) => (
            <option key={list.id} value={list.id}>
              {list.name}
            </option>
          ))}
        </select>

        <button
          className="filter-button"
          onClick={() =>
            setFilters((prev) => ({
              ...prev,
              showCompleted: !prev.showCompleted,
            }))
          }
        >
          {filters.showCompleted ? "Hide Completed" : "Show Completed"}
        </button>

       
      </div>
    </nav>
  );
};

export default Navbar;
