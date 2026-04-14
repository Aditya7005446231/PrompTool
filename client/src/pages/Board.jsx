import React, { useEffect, useState } from 'react';
import { MoreHorizontal, Plus, Calendar, Tag } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const Board = () => {
  const { tasks, fetchTasks, updateTask, addTask } = useTask();
  const [addingToCol, setAddingToCol] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // 2. THE COLUMNS CONFIGURATION
  const columns = [
    { 
      id: 'Todo', 
      title: 'To Do', 
      headerColor: 'text-stone-800',
      countColor: 'text-stone-300',
      ruleColor: 'border-stone-800',
      bgPattern: 'bg-[#FDFBF7]'
    },
    { 
      id: 'In Progress', 
      title: 'In Progress', 
      headerColor: 'text-[#00B5E2]', 
      countColor: 'text-[#00B5E2]/30',
      ruleColor: 'border-[#00B5E2]',
      bgPattern: 'bg-[#F0FAFD]'
    },
    { 
      id: 'Done', 
      title: 'Done', 
      headerColor: 'text-[#E40046]',
      countColor: 'text-[#E40046]/30',
      ruleColor: 'border-[#E40046]',
      bgPattern: 'bg-[#FDF0F3]'
    },
  ];

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      updateTask(taskId, { status });
    }
  };

  return (
    <div className="h-full flex flex-col px-6 py-6 lg:p-10 space-y-8 bg-[#FDFBF7]">
      <div className="flex justify-between items-end shrink-0 border-b-2 border-stone-200 pb-6">
        <div>
           <p className="text-[#FF671F] font-bold uppercase text-[11px] tracking-[0.2em] mb-2">Project Sprint</p>
           <h1 className="text-4xl lg:text-5xl font-black text-stone-900 tracking-tighter leading-none">Task Board</h1>
        </div>
        <button 
          onClick={() => setAddingToCol('Todo')}
          className="text-xs font-bold uppercase tracking-widest bg-stone-900 text-[#FDFBF7] px-6 py-3 hover:bg-[#00B5E2] transition-colors"
        >
          + New Task
        </button>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
        <div className="flex gap-8 h-full min-w-[1000px]">

          {columns.map((col) => {
            const colTasks = tasks.filter(t => t.status === col.id);

            return (
              <div
                key={col.id}
                className="flex-1 flex flex-col min-w-[320px] h-full"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                {/* Column Header */}
                <div className={`flex justify-between items-start mb-6 border-t-4 ${col.ruleColor} pt-4`}>
                  <div className="flex flex-col">
                    <h3 className={`font-black text-2xl tracking-tighter ${col.headerColor}`}>{col.title}</h3>
                  </div>
                  <span className={`text-4xl font-light leading-none ${col.countColor}`}>
                    {colTasks.length.toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Task Cards List */}
                <div className={`flex-1 overflow-y-auto space-y-4 custom-scrollbar ${col.bgPattern} p-3 sm:p-4 border border-stone-200 shadow-inner`}>
                  {addingToCol === col.id && (
                    <div className="bg-white p-4 shadow-xl border-t-4 border-[#00B5E2] mb-4">
                      <input
                        autoFocus
                        type="text"
                        placeholder="Type task title and hit Enter..."
                        className="w-full text-base outline-none text-stone-900 placeholder:text-stone-400 font-medium bg-transparent"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onBlur={() => {
                          if (!newTaskTitle.trim()) setAddingToCol(null);
                        }}
                        onKeyDown={async (e) => {
                          if (e.key === 'Enter' && newTaskTitle.trim()) {
                            await addTask({ title: newTaskTitle, status: col.id, priority: 'Medium' });
                            setNewTaskTitle("");
                            setAddingToCol(null);
                          } else if (e.key === 'Escape') {
                            setAddingToCol(null);
                            setNewTaskTitle("");
                          }
                        }}
                      />
                    </div>
                  )}

                  {colTasks.map((task) => (
                    <KanbanCard key={task._id} task={task} onDragStart={handleDragStart} />
                  ))}

                  {colTasks.length === 0 && !addingToCol && (
                    <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-stone-300 bg-stone-50/50">
                       <p className="text-sm text-stone-400 font-medium">Drop tasks here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const KanbanCard = ({ task, onDragStart }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent': return 'bg-[#E40046] text-white';
      case 'high': return 'bg-[#FF671F] text-white';
      case 'medium': return 'bg-stone-800 text-white';
      default: return 'bg-stone-300 text-stone-800';
    }
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task._id)}
      className="bg-white border border-stone-300 shadow-[4px_4px_0px_#e5e5e5] hover:shadow-[6px_6px_0px_#00B5E2] hover:-translate-y-1 hover:-translate-x-1 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden"
    >
      {/* Top barcode / structural decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200"></div>

      <div className="p-4 sm:p-5 flex flex-col h-full gap-4">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-bold text-stone-900 text-lg leading-tight group-hover:text-[#00B5E2] transition-colors">{task.title}</h4>
          <button className="text-stone-300 hover:text-stone-800 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
            <MoreHorizontal size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="space-y-4 mt-auto">
          {task.project && (
             <div className="flex items-center gap-1.5 pt-2 border-t border-dashed border-stone-200">
               <Tag size={12} className="text-stone-400" />
               <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider truncate">
                 {task.project.title}
               </span>
             </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${getPriorityColor(task.priority)}`}>
              {task.priority || 'Medium'}
            </span>
            
            <div className="w-8 h-8 bg-stone-100 border border-stone-300 rounded-full flex items-center justify-center text-[10px] text-stone-600 font-bold">
               AR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;