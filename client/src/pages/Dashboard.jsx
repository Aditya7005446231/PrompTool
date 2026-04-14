import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { ListTodo, Timer, CheckCircle2, AlertCircle, Circle, ArrowRight } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import axios from 'axios';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard = () => {
 
  const { tasks, fetchTasks, updateTask } = useTask();
  const [projects, setProjects] = useState([]);

  const getInitial = (value) => {
    if (typeof value !== 'string') return '?';
    const trimmed = value.trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
  };

  useEffect(() => {
    fetchTasks();
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:3001/api/projects', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.success) {
            setProjects(res.data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard projects:', err);
      }
    };
    fetchProjects();
  }, [fetchTasks]);

   const dummyData = [
    {status: 'Todo', priority: 'Low'},
    {status: 'Todo', priority:'High'},
    {status: 'In Progress', priority:'Medium'},
    {status: 'In Progress', priority:'High'},
    {status: 'Done', priority:'Low'},
    {status: 'Done', priority:'High'},
  ];

  const totalTask = dummyData.length;

  const inProgressCount = dummyData.filter(t => t.status === 'In Progress').length;
  const completedCount = dummyData.filter(t => t.status === 'Done').length;
  const highPriorityCount = dummyData.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;

  const activityData = [
    { name: 'Mon', completed: 4 },
    { name: 'Tue', completed: 7 },
    { name: 'Wed', completed: 5 },
    { name: 'Thu', completed: 8 },
    { name: 'Fri', completed: 3 },
    { name: 'Sat', completed: 9 },
    { name: 'Sun', completed: 6 },
  ];

  return (
    <div className="space-y-6 pt-2">
      {/* 1. Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<ListTodo size={18} />} label="Total Tasks" value={totalTask} color="cyan" />
        <StatCard icon={<Timer size={18} />} label="In Progress" value={inProgressCount} color="pink" />
        <StatCard icon={<CheckCircle2 size={18} />} label="Completed" value={completedCount} color="emerald" />
        <StatCard icon={<AlertCircle size={18} />} label="High Priority" value={highPriorityCount} color="rose" />
      </div>

      {/* 2. Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Recent Tasks & Chart */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          
          {/* Activity Chart */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Weekly Activity</h2>
              <span className="text-[10px] font-black text-[#00B5E2] bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest">Analytics</span>
            </div>
            <div className="h-56 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={224}>
                <BarChart data={activityData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10, fontWeight: 700}} dy={10} />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}}
                    contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="completed" radius={[6, 6, 0, 0]} barSize={28}>
                     {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#E40046' : '#00B5E2'} fillOpacity={index === 5 ? 1 : 0.8} />
                     ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center px-8">
              <h2 className="text-lg font-black text-gray-900 tracking-tight">Recent Activity</h2>
              <Link to="/app/tasks" className="text-xs font-black text-[#00B5E2] hover:text-[#E40046] flex items-center gap-1 transition-colors uppercase tracking-widest">
                Full List <ArrowRight size={14} />
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {tasks.filter(t => t.status !== 'Done').slice(0, 4).map(task => (
                <div key={task._id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors group px-8">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => updateTask(task._id, { status: 'Done' })}
                      className="text-gray-300 hover:text-[#E40046] transition-colors"
                    >
                      <Circle size={20} />
                    </button>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-[#00B5E2] transition-colors">{task.title}</h4>
                      {task.project && <p className="text-[10px] font-black text-[#00B5E2] uppercase tracking-tighter mt-1">{task.project.title}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                       task.priority === 'Urgent' ? 'bg-red-50 text-red-600 border-red-100' :
                       task.priority === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                       'bg-cyan-50 text-[#00B5E2] border-cyan-100'
                     }`}>
                       {task.priority}
                     </span>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.status !== 'Done').length === 0 && (
                <div className="p-16 text-center text-gray-300 font-bold uppercase tracking-widest text-xs">✨ Zero Tasks Remaining</div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Projects */}
        <div className="col-span-1 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Projects</h2>
            <Link to="/app/projects" className="text-[10px] font-black text-gray-400 hover:text-[#E40046] uppercase tracking-widest transition-colors">See All</Link>
          </div>

          <div className="space-y-4">
            {projects.length > 0 ? projects.slice(0, 3).map((proj, idx) => (
              <div key={proj._id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-cyan-100/20 hover:border-[#00B5E2]/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-black text-gray-900 group-hover:text-[#00B5E2] transition-colors leading-tight">{proj.title}</h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{proj.description}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner shrink-0 ${
                    proj.color === 'green' ? 'bg-emerald-50 text-emerald-600' :
                    proj.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                    'bg-cyan-50 text-[#00B5E2]'
                  }`}>
                    {getInitial(proj.title)}
                  </div>
                </div>
                
                {/* Progress Mini Bar */}
                <div className="pt-2">
                   <div className="flex justify-between text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">
                     <span>Efficiency</span>
                     <span className="text-gray-900">75%</span>
                   </div>
                   <div className="w-full bg-gray-50 h-2 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ${
                        proj.color === 'green' ? 'bg-emerald-500' :
                        proj.color === 'orange' ? 'bg-orange-500' :
                        'bg-[#00B5E2]'
                      }`} style={{ width: `75%` }}></div>
                   </div>
                </div>
              </div>
            )) : (
              <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl p-10 text-center">
                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">No Projects Found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
