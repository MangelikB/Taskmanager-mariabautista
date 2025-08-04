// src/Context/TaskContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../db";

export const TasksContext = createContext();

const PRIORITY_ORDER = { high: 1, medium: 2, low: 3 };

export const TasksProvider = ({ children }) => {
  const [lists, setLists] = useState([]);

  // 🔄 Escucha las listas y sus tareas (subcolección)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lists"), async (snapshot) => {
      const listPromises = snapshot.docs.map(async (docSnap) => {
        const listId = docSnap.id;
        const tasksSnapshot = await getDocs(collection(db, "lists", listId, "tasks"));
        const tasks = tasksSnapshot.docs.map((taskDoc) => ({
          id: taskDoc.id,
          ...taskDoc.data(),
        }));
        return {
          id: listId,
          ...docSnap.data(),
          tasks,
        };
      });

      const resolvedLists = await Promise.all(listPromises);
      setLists(resolvedLists);
    });

    return () => unsubscribe();
  }, []);

  // 🆕 Crea una nueva lista
  const addList = async (name) => {
    if (!name.trim()) return;
    await addDoc(collection(db, "lists"), {
      name: name.trim(),
    });
  };

  // ❌ Elimina una lista y sus tareas
  const deleteList = async (listId) => {
    // ⚠️ Firestore no elimina subcolecciones automáticamente
    const tasksRef = collection(db, "lists", listId, "tasks");
    const tasksSnap = await getDocs(tasksRef);
    const deletePromises = tasksSnap.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);

    await deleteDoc(doc(db, "lists", listId));
  };

  // ➕ Agrega una tarea a la subcolección
  const addTask = async (listId, task) => {
    const taskData = {
      title: task.title,
      priority: task.priority,
      category: task.category,
      done: false,
    };
    await addDoc(collection(db, "lists", listId, "tasks"), taskData);
  };

  // ❌ Elimina una tarea de la subcolección
  const deleteTask = async (listId, taskId) => {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  // ✅ Cambia el estado de completado
  const toggleTaskDone = async (listId, taskId) => {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    const taskSnap = await getDocs(collection(db, "lists", listId, "tasks"));
    const task = taskSnap.docs.find((d) => d.id === taskId);
    if (task) {
      const currentDone = task.data().done || false;
      await updateDoc(taskRef, { done: !currentDone });
    }
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
