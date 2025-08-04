// AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import db from "../db";

const AppContext = createContext();
const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

export const AppProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  // 📥 Escuchar cambios en tiempo real en listas
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lists"), async (snapshot) => {
      const listsData = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const listId = docSnap.id;
          const listData = docSnap.data();

          // Obtener tareas de la subcolección 'tasks'
          const tasksSnapshot = await getDocs(collection(db, "lists", listId, "tasks"));
          const tasks = tasksSnapshot.docs.map((taskDoc) => ({
            id: taskDoc.id,
            ...taskDoc.data(),
          }));

          return {
            id: listId,
            ...listData,
            tasks,
          };
        })
      );
      setLists(listsData);
    });

    return () => unsubscribe();
  }, []);

  // ➕ Crear nueva lista (sin tareas al inicio)
  const addList = async (name) => {
    if (!name.trim()) return;
    await addDoc(collection(db, "lists"), {
      name: name.trim(),
    });
  };

  // ❌ Eliminar lista y su subcolección de tareas
  const deleteList = async (listId) => {
    const listRef = doc(db, "lists", listId);
    const tasksRef = collection(db, "lists", listId, "tasks");
    const tasksSnapshot = await getDocs(tasksRef);

    // Eliminar todas las tareas de la subcolección
    await Promise.all(tasksSnapshot.docs.map((taskDoc) => deleteDoc(taskDoc.ref)));

    // Eliminar la lista
    await deleteDoc(listRef);
  };

  // ➕ Añadir tarea a la subcolección 'tasks' de una lista
  const addTaskToList = async (listId, task) => {
    await addDoc(collection(db, "lists", listId, "tasks"), task);
  };

  // ✅ Marcar tarea como completada / no completada
  const toggleTaskDone = async (listId, taskId, done) => {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    await updateDoc(taskRef, { done });
  };

  // 🗑️ Eliminar tarea específica
  const deleteTask = async (listId, taskId) => {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    await deleteDoc(taskRef);
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

export const useAppContext = () => useContext(AppContext);
