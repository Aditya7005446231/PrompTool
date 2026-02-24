import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design homepage hero section", project: "Website Redesign", status: "In Progress", priority: "High", due: "Today" },
    { id: 2, title: "Fix navigation bug on mobile", project: "Mobile App", status: "Todo", priority: "Urgent", due: "Tomorrow" },
    { id: 3, title: "API Integration docs", project: "API Integration", status: "Done", priority: "Medium", due: "Feb 24" },
    { id: 4, title: "Update color palette", project: "Design System", status: "Todo", priority: "Low", due: "Feb 28" },
    { id: 5, title: "Conduct user testing", project: "Mobile App", status: "In Progress", priority: "High", due: "Mar 02" },
  ]);

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within TaskProvider');
  return context;
};
