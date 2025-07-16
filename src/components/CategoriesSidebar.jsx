const categories = ["All", "Cardio", "Strength", "Flexibility"];
const priorities = ["All", "High", "Medium", "Low"];

const CategoriesSidebar = ({
  selectedCategory,
  onSelectCategory,
  selectedPriority,
  onSelectPriority,
}) => {
  return (
    <aside className="sidebar">
      <div className="category-filters">
        <h2>Categories</h2>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-button ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="priority-filters">
        <h2>Priority</h2>
        {priorities.map((p) => (
          <button
            key={p}
            className={`filter-button priority-btn ${selectedPriority === p ? "active" : ""} ${p.toLowerCase()}`}
            onClick={() => onSelectPriority(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default CategoriesSidebar;
