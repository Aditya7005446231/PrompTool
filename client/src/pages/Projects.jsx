import React, { useState, useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', color: 'blue', assignee: 'Assign yourself' });

  const getInitial = (value) => {
    if (typeof value !== 'string') return '?';
    const trimmed = value.trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
  };

  const fetchProjects = async () => {
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
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3001/api/projects',
        {
          title: formData.title,
          description: formData.description,
          color: formData.color,
          assignee: formData.assignee
          // We can send assignee logic to backend later, for now we save the project
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        setProjects([res.data.data, ...projects]);
        setShowForm(false);
        setFormData({ title: '', description: '', color: 'blue', assignee: 'Assign yourself' });
      }
    } catch (err) {
      console.error('Error creating project:', err);
    }
  };

  const mappedProjects = projects.map(p => {
    let colorClass = "bg-cyan-50 text-[#00B5E2]";
    let barClass = "bg-[#00B5E2]";

    if (p.color === 'orange') {
      colorClass = "bg-orange-50 text-orange-600"; barClass = "bg-orange-500";
    } else if (p.color === 'green') {
      colorClass = "bg-emerald-50 text-emerald-600"; barClass = "bg-emerald-500";
    }

    return {
      id: p._id,
      title: p.title,
      tasksCount: p.taskCount || 0,
      description: p.description,
      progress: p.progress || 0,
      color: colorClass,
      barColor: barClass,
      letter: getInitial(p.title),
      team: p.assignee ? [p.assignee] : ["Assign yourself"] // Temporarily static, later we'll map actual members
    };
  });

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 pt-2">

      {/* 1. Page Actions */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Projects</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Workspace Initiatives</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest shadow-sm">
            <Filter size={16} strokeWidth={3} /> Filter
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-6 py-3 bg-[#E40046] text-white rounded-2xl text-sm font-black hover:bg-[#C0003A] transition-all shadow-xl shadow-pink-100 uppercase tracking-widest active:scale-95">
            <Plus size={18} strokeWidth={3} /> New Project
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl border-2 border-cyan-100 shadow-2xl shadow-cyan-50 p-8 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Project Title</label>
              <input type="text" placeholder="e.g. Website Redesign" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold transition-all text-gray-900" />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Visual Theme</label>
              <select value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold appearance-none transition-all">
                <option value="blue">Neon Cyan</option>
                <option value="green">Emerald Pop</option>
                <option value="orange">Sunset Orange</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Initiative Description</label>
              <input type="text" placeholder="Brief project objective..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold transition-all text-gray-900" />
            </div>

            <div className="col-span-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Lead Assignee</label>
              <select value={formData.assignee} onChange={(e) => setFormData({ ...formData, assignee: e.target.value })} className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold appearance-none transition-all">
                <option value="Assign yourself">Assign yourself</option>
                <option value="Another one">Another one (Email Lookup)</option>
              </select>
            </div>

            <div className="col-span-2 flex gap-4 mt-4">
              <button type="submit" className="flex-1 bg-[#00B5E2] hover:bg-[#008CAB] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-cyan-100 uppercase tracking-widest text-xs">Launch Project</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-500 font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs">Dismiss</button>
            </div>
          </form>
        </div>
      )}

      {/* 2. Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 3. The Map Loop */}
        {mappedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* 'Add New' Placeholder Card */}
        <button onClick={() => setShowForm(true)} className="group border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-gray-300 hover:border-cyan-200 hover:bg-cyan-50/30 transition-all h-full min-h-[220px]">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#00B5E2] group-hover:text-white transition-all group-hover:rotate-90 group-hover:shadow-lg group-hover:shadow-cyan-100">
            <Plus size={28} strokeWidth={3} />
          </div>
          <span className="font-black uppercase text-[10px] tracking-[0.2em]">New Project</span>
        </button>

      </div>
    </div>
  );
};

export default Projects;