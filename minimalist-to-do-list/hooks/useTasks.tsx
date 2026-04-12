import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useCallback, useEffect, useState } from "react";
import { Task, tasksData } from "../data/tasks";

const TASKS_KEY = "@tasks:data";

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Omit<Task, "id" | "isCompleted" | "createdAt" | "completedAt">) => Promise<void>;
  toggleTask: (taskId: number) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  updateTask: (taskId: number, updates: Partial<Task>) => Promise<void>;
  getTasksByCategory: (category: string) => Task[];
  getActiveTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getStats: () => { total: number; completed: number; active: number; completionRate: number };
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(TASKS_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        // Start completely empty
        setTasks([]);
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([]));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const addTask = useCallback(async (newTask: Omit<Task, "id" | "isCompleted" | "createdAt" | "completedAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now(),
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => {
      const updated = [task, ...prev];
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleTask = useCallback(async (taskId: number) => {
    setTasks(prev => {
      const updated = prev.map(task =>
        task.id === taskId
          ? { 
              ...task, 
              isCompleted: !task.isCompleted,
              completedAt: !task.isCompleted ? new Date().toISOString() : undefined
            }
          : task
      );
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteTask = useCallback(async (taskId: number) => {
    setTasks(prev => {
      const updated = prev.filter(task => task.id !== taskId);
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateTask = useCallback(async (taskId: number, updates: Partial<Task>) => {
    setTasks(prev => {
      const updated = prev.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getTasksByCategory = useCallback((category: string) => {
    if (category === "all") return tasks;
    return tasks.filter(task => task.category === category);
  }, [tasks]);

  const getActiveTasks = useCallback(() => {
    return tasks.filter(task => !task.isCompleted);
  }, [tasks]);

  const getCompletedTasks = useCallback(() => {
    return tasks.filter(task => task.isCompleted);
  }, [tasks]);

  const getStats = useCallback(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const active = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, active, completionRate };
  }, [tasks]);

  return (
    <TasksContext.Provider value={{
      tasks,
      loading,
      addTask,
      toggleTask,
      deleteTask,
      updateTask,
      getTasksByCategory,
      getActiveTasks,
      getCompletedTasks,
      getStats,
    }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}