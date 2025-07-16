const Navbar = ({
  selectedView,
  onSelectView,
  searchTerm,
  onSearchChange,
  newTitle,
  onNewTitleChange,
  newCategory,
  onNewCategoryChange,
  newPriority,
  onNewPriorityChange,
  onAddTask,
  showCompleted,
  onToggleShowCompleted,
}) => {
  return (
    <nav className="navbar">
      <h1>Workout Planner</h1>

      <div className="search-and-views">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />

        <button className="filter-button" onClick={onToggleShowCompleted}>
          {showCompleted ? "Hide Completed" : "Completed"}
        </button>
      </div>

      <div className="add-task-form">
        <input
          type="text"
          placeholder="New task title"
          value={newTitle}
          onChange={(e) => onNewTitleChange(e.target.value)}
          className="add-task-input"
        />

        <select
          value={newCategory}
          onChange={(e) => onNewCategoryChange(e.target.value)}
          className="add-task-select"
        >
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>

        <select
          value={newPriority}
          onChange={(e) => onNewPriorityChange(e.target.value)}
          className="add-task-select"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button className="add-task-button" onClick={onAddTask}>
          Add
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
