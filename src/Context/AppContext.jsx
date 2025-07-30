// AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Crear contexto
const AppContext = createContext();

// Orden de prioridad para sorting
const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

// Provider que envuelve toda la app
export const AppProvider = ({ children }) => {
  // Estado de listas: cada lista tiene id, name y tasks array
  const [lists, setLists] = useState(() => {
    const saved = localStorage.getItem("lists");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que cambian listas
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  // Crear nueva lista
  const addList = (name) => {
    if (!name.trim()) return;
    const newList = { id: Date.now(), name: name.trim(), tasks: [] };
    setLists((prev) => [...prev, newList]);
  };

  // Eliminar lista por id
  const deleteList = (id) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  // Añadir tarea a lista específica
  const addTaskToList = (listId, task) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, task] }
          : list
      )
    );
  };

  // Marcar tarea completa/incompleta
  const toggleTaskDone = (listId, taskId, done) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          tasks: list.tasks.map((task) =>
            task.id === taskId ? { ...task, done } : task
          ),
        };
      })
    );
  };

  // Eliminar tarea
  const deleteTask = (listId, taskId) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        return {
          ...list,
          tasks: list.tasks.filter((task) => task.id !== taskId),
        };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        addList,
        deleteList,
        addTaskToList,
        toggleTaskDone,
        deleteTask,
        PRIORITY_ORDER,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook para usar contexto más fácil
export const useAppContext = () => useContext(AppContext);
