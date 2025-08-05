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
  const [taskUnsubscribers, setTaskUnsubscribers] = useState([]);

  useEffect(() => {
    // Escuchar cambios en la colección de listas
    const unsubscribeLists = onSnapshot(collection(db, "lists"), (snapshot) => {
      const newLists = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        tasks: [], // Inicialmente vacío
      }));

      // Cancelar listeners anteriores de tareas
      taskUnsubscribers.forEach((unsub) => unsub());

      // Crear nuevos listeners para cada subcolección de tareas
      const newUnsubscribers = newLists.map((list, index) => {
        const tasksRef = collection(db, "lists", list.id, "tasks");

        const unsubscribeTasks = onSnapshot(tasksRef, (taskSnapshot) => {
          const tasks = taskSnapshot.docs.map((taskDoc) => ({
            id: taskDoc.id,
            ...taskDoc.data(),
          }));

          setLists((prevLists) => {
            const updatedLists = [...prevLists];
            updatedLists[index] = { ...updatedLists[index], tasks };
            return updatedLists;
          });
        });

        return unsubscribeTasks;
      });

      setLists(newLists);
      setTaskUnsubscribers(newUnsubscribers);
    });

    return () => {
      unsubscribeLists();
      taskUnsubscribers.forEach((unsub) => unsub());
    };
  }, []);

  const addList = async (name) => {
    if (!name.trim()) return;
    await addDoc(collection(db, "lists"), {
      name: name.trim(),
    });
  };

  const deleteList = async (listId) => {
    const tasksRef = collection(db, "lists", listId, "tasks");
    const tasksSnap = await getDocs(tasksRef);
    const deletePromises = tasksSnap.docs.map((docSnap) => deleteDoc(docSnap.ref));
    await Promise.all(deletePromises);

    await deleteDoc(doc(db, "lists", listId));
  };

  const addTask = async (listId, task) => {
    const taskData = {
      title: task.title,
      priority: task.priority,
      category: task.category,
      done: false,
    };
    await addDoc(collection(db, "lists", listId, "tasks"), taskData);
  };

  const deleteTask = async (listId, taskId) => {
    const taskRef = doc(db, "lists", listId, "tasks", taskId);
    await deleteDoc(taskRef);
  };

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
