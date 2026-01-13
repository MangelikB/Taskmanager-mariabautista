import React, { useState } from "react";
import { Routes, Route } from "react-router-dom"; //PUNTO 5
import Navbar from "./components/Navbar";
import CategoriesSidebar from "./components/CategoriesSidebar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import ListPage from "./Pages/ListPage";
import { TasksProvider } from "./Context/TasksContext";

function App() {
  // Filtros globales manejados aquí y pasados a Navbar y Pages
  const [filters, setFilters] = useState({
    listId: "all",           // "all" para todas listas, o id de lista específica
    showCompleted: true,
    priority: "All",         // "All", "High", "Medium", "Low"
    category: "All",         // "All", "Cardio", "Strength", "Flexibility"
  });

  return (

    <TasksProvider>
      <div className="container">
        <Navbar filters={filters} setFilters={setFilters} />

        <div className="main-content">
          <CategoriesSidebar
            selectedCategory={filters.category}
            onSelectCategory={(cat) =>
              setFilters((prev) => ({ ...prev, category: cat }))
            }
            selectedPriority={filters.priority}
            onSelectPriority={(pri) =>
              setFilters((prev) => ({ ...prev, priority: pri }))
            }
          />
            
          <main className="content">
            <Routes>
              <Route
                path="/"
                element={<Home filters={filters} setFilters={setFilters} />}
              />
              <Route
                path="/list/:id"
                element={<ListPage filters={filters} setFilters={setFilters} />}
              />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </TasksProvider>
  );
}

export default App;
