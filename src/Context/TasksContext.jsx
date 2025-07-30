import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext();

const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

export const TasksProvider = ({ children }) => {
  // Carga inicial desde localStorage con validación
  const [lists, setLists] = useState(() => {
    try {
      const saved = localStorage.getItem("lists");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error loading lists from localStorage:", error);
      return [];
    }
  });

  // Actualiza localStorage cada vez que se modifican las listas
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  // Agrega una nueva lista
  const addList = (name) => {
    if (!name.trim()) return;
    const newList = {
      id: Date.now().toString(),
      name: name.trim(),
      tasks: [],
    };
    setLists((prev) => [...prev, newList]);
  };

  // Elimina una lista por ID
  const deleteList = (id) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  // Agrega una nueva tarea a una lista específica
  const addTask = (listId, task) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: [
                ...list.tasks,
                {
                  id: Date.now().toString(),
                  title: task.title,
                  priority: task.priority,
                  category: task.category,
                  done: false,
                },
              ],
            }
          : list
      )
    );
  };

  // Elimina una tarea de una lista específica
  const deleteTask = (listId, taskId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((task) => task.id !== taskId),
            }
          : list
      )
    );
  };

  // Marca una tarea como completada o no
  const toggleTaskDone = (listId, taskId) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
              ),
            }
          : list
      )
    );
  };

  return (
    <TasksContext.Provider
      value={{
        lists,
        addList,
        deleteList,
        addTask,
        deleteTask,
        toggleTaskDone,
        PRIORITY_ORDER,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
