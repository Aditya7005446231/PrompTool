import React from 'react';
import { MoreHorizontal, Plus, Calendar } from 'lucide-react';

const Board = () => {
  // 1. THE DATA: This would usually come from a database
  const tasks = [
    { id: 1, title: "Write API documentation", priority: "Medium", tags: ["docs"], status: "todo", members: ["D"] },
    { id: 2, title: "Build notification system", priority: "Low", tags: ["feature"], status: "todo", members: ["A"] },
    { id: 3, title: "Implement auth flow", priority: "Urgent", tags: ["backend", "auth"], status: "inprogress", members: ["M"] },
    { id: 4, title: "Optimize image loading", priority: "Medium", tags: ["performance"], status: "inprogress", members: ["K"] },
    { id: 5, title: "Migrate database schema", priority: "Urgent", tags: ["backend", "db"], status: "inprogress", members: ["D"] },
    { id: 6, title: "Set up CI/CD pipeline", priority: "High", tags: ["devops"], status: "review", members: ["P"] },
    { id: 7, title: "Add analytics tracking", priority: "Low", tags: ["feature"], status: "review", members: ["J"] },
    { id: 8, title: "Design homepage hero", priority: "High", tags: ["design", "ui"], status: "done", members: ["A"] },
    { id: 9, title: "Create color palette", priority: "Medium", tags: ["design"], status: "done", members: ["S"] },
  ];

  // 2. THE COLUMNS CONFIGURATION
  // We define how each column looks so we don't copy-paste code 4 times
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100', dot: 'bg-gray-500', iconColor: 'text-gray-500' },
    { id: 'inprogress', title: 'In Progress', color: 'bg-blue-50', dot: 'bg-blue-500', iconColor: 'text-blue-500' },
    { id: 'review', title: 'Review', color: 'bg-orange-50', dot: 'bg-orange-500', iconColor: 'text-orange-500' },
    { id: 'done', title: 'Done', color: 'bg-green-50', dot: 'bg-green-500', iconColor: 'text-green-500' },
  ];

  return (
    <div className="board-theme h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Board</h1>
        <p className="text-gray-500 text-sm">Drag and drop to organize your tasks.</p>
      </div>

      {/* Kanban Board Grid */}
      {/* overflow-x-auto allows horizontal scrolling on small screens */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 min-w-[1000px] h-full">
          
          {/* MAPPING OVER COLUMNS */}
          {columns.map((col) => (
            <div key={col.id} className={`flex-1 rounded-2xl p-4 ${col.color} flex flex-col gap-4 h-full`}>
              
              {/* Column Header */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${col.dot}`}></div>
                  <h3 className="font-bold text-gray-700">{col.title}</h3>
                  <span className="text-gray-400 text-sm font-medium">
                    {tasks.filter(t => t.status === col.id).length}
                  </span>
                </div>
                <button className={`p-1 hover:bg-white rounded-md transition-colors ${col.iconColor}`}>
                  <Plus size={18} />
                </button>
              </div>

              {/* Task Cards List */}
              <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                {tasks
                  .filter((task) => task.status === col.id)
                  .map((task) => (
                    <KanbanCard key={task.id} task={task} />
                  ))}
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

// --- REUSABLE CARD COMPONENT ---
// This handles the look of the individual white cards
const KanbanCard = ({ task }) => {
  // Helper to get colors based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-600';
      case 'High': return 'bg-orange-100 text-orange-600';
      case 'Medium': return 'bg-blue-100 text-blue-600';
      case 'Low': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group">
      
      {/* Top Row: Title & Options */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800 text-sm leading-snug">{task.title}</h4>
        <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
           <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Middle Row: Priority Badge */}
      <div className="mb-4">
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {/* Bottom Row: Tags & Avatar */}
      <div className="flex justify-between items-center">
        {/* Tags */}
        <div className="flex gap-1 flex-wrap">
          {task.tags.map((tag, i) => (
            <span key={i} className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] rounded border border-gray-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Member Avatar */}
        <div className="flex -space-x-2">
            {task.members.map((m, i) => (
               <div key={i} className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                 {m}
               </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Board;