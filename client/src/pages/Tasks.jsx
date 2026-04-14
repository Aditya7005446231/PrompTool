import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, X, Plus } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import axios from 'axios';

const Tasks = () => {
  const { tasks, addTask, removeTask, updateTask, fetchTasks } = useTask();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', project: '', priority: 'Medium', dueDate: '', description: '' });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchTasks();
    const loadProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:3001/api/projects', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error('Error loading projects:', err);
      }
    };
    loadProjects();
  }, [fetchTasks]);

  const getPriorityStyle = (p) => {
    switch (p) {
      case 'Urgent': return 'bg-red-50 text-red-600 border-red-100';
      case 'High': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Medium': return 'bg-cyan-50 text-[#00B5E2] border-cyan-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      addTask({
        ...formData,
        project: formData.project || null // Send null if empty
      });
      setFormData({ title: '', project: '', priority: 'Medium', dueDate: '', description: '' });
      setShowForm(false);
    }
  };

  const toggleStatus = (task) => {
    updateTask(task._id, { status: task.status === 'Done' ? 'Todo' : 'Done' });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Tasks</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Deliverables queue</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="flex items-center gap-2 px-6 py-3 bg-[#E40046] text-white rounded-2xl text-sm font-black hover:bg-[#C0003A] transition-all shadow-xl shadow-pink-100 uppercase tracking-widest active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> New Task
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl border-2 border-cyan-100 shadow-2xl shadow-cyan-50 p-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Task Title</label>
               <input type="text" placeholder="e.g. Design new homepage" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold transition-all text-gray-900" />
            </div>
            
            <div className="col-span-2 md:col-span-1">
               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Project</label>
               <select value={formData.project} onChange={(e) => setFormData({...formData, project: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold appearance-none transition-all">
                  <option value="">Standalone Task</option>
                  {projects.map(p => (
                    <option key={p._id} value={p._id}>{p.title}</option>
                  ))}
               </select>
            </div>

            <div className="col-span-1 md:col-span-1">
               <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Priority</label>
               <select value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold transition-all">
                 <option>Low</option>
                 <option>Medium</option>
                 <option>High</option>
                 <option>Urgent</option>
               </select>
            </div>

            <div className="col-span-2 flex gap-4 mt-4">
              <button type="submit" className="flex-1 bg-[#00B5E2] hover:bg-[#008CAB] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-100 uppercase tracking-widest text-xs">Add to Queue</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs">Dismiss</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* List Header */}
        <div className="grid grid-cols-12 gap-4 p-5 border-b border-gray-50 bg-gray-50/30 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <div className="col-span-8 pl-10">Deliverable</div>
          <div className="col-span-2 text-center">Priority Level</div>
          <div className="col-span-2"></div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-50">
          {tasks.map((task) => (
            <div key={task._id} className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-gray-50/50 transition-all group px-8">
              
              {/* Task Name & Project */}
              <div className="col-span-8 flex items-start gap-4">
                <button 
                  onClick={() => toggleStatus(task)} 
                  className="text-gray-200 hover:text-[#00B5E2] mt-0.5 transition-all scale-110"
                >
                   {task.status === 'Done' ? <CheckCircle2 className="text-[#00B5E2]" size={22} /> : <Circle size={22} />}
                </button>
                <div className="min-w-0">
                  <h4 className={`text-sm font-bold text-gray-900 truncate leading-snug ${task.status === 'Done' ? 'line-through text-gray-300' : 'group-hover:text-[#00B5E2]'} transition-colors`}>
                    {task.title}
                  </h4>
                  {task.project && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] font-black text-[#E40046] uppercase tracking-tighter bg-pink-50 px-2 py-0.5 rounded-md">
                        {task.project.title}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Priority */}
              <div className="col-span-2 flex justify-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              {/* Delete Button */}
              <div className="col-span-2 flex justify-end">
                <button onClick={() => removeTask(task._id)} className="p-2.5 text-gray-200 hover:text-[#E40046] hover:bg-pink-50 rounded-xl transition-all opacity-0 group-hover:opacity-100">
                  <X size={18} strokeWidth={3} />
                </button>
              </div>

            </div>
          ))}
          {tasks.length === 0 && (
            <div className="p-20 text-center">
               <p className="text-gray-300 font-black uppercase tracking-[0.2em] text-xs">All Clear. Zero tasks found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;


