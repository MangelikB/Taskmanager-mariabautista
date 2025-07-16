import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CategoriesSidebar from "./components/CategoriesSidebar";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

// Mapeo categoría -> emoji
const CATEGORY_EMOJIS = {
  Cardio: "🏃‍♂️",
  Strength: "🏋️‍♀️",
  Flexibility: "🧘‍♂️",
  All: "❓",
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");//PUNTO-12
    return saved ? JSON.parse(saved) : [];
  });

  // Filtros y búsqueda
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedView, setSelectedView] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(true); // para mostrar u ocultar completadas

  // Nuevos inputs para añadir task
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Cardio");
  const [newPriority, setNewPriority] = useState("medium");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTitle.trim()) return; // evitar tareas vacías

    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      priority: newPriority,
      done: false,
      emoji: CATEGORY_EMOJIS[newCategory] || "❓",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTitle("");
  };

  const toggleDone = (id, done) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, done } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }; //PUNTO 11

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  // Filtrar por categoría, prioridad, vista, búsqueda y mostrar/ocultar completadas (PUNTO-4,8,9,10)
  const filteredTasks = tasks
    .filter(
      (task) => selectedCategory === "All" || task.category === selectedCategory
    )
    .filter(
      (task) => selectedPriority === "All" || task.priority === selectedPriority
    )
    .filter((task) => {
      if (!showCompleted) return !task.done;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  filteredTasks.sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  );

  return (
    <div className="container">
      <Navbar
        selectedView={selectedView}
        onSelectView={setSelectedView}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        newTitle={newTitle}
        onNewTitleChange={setNewTitle}
        newCategory={newCategory}
        onNewCategoryChange={setNewCategory}
        newPriority={newPriority}
        onNewPriorityChange={setNewPriority}
        onAddTask={addTask}
        showCompleted={showCompleted}
        onToggleShowCompleted={toggleShowCompleted}
      />

      <div className="main-content">
        <CategoriesSidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedPriority={selectedPriority}
          onSelectPriority={setSelectedPriority}
        />

        <main className="content">
          <TaskList tasks={filteredTasks} onToggle={toggleDone} onDelete={deleteTask} />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
