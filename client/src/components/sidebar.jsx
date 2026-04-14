import React from 'react';
import { NavLink } from 'react-router-dom'; // <--- IMPORT THIS
import { LayoutDashboard, KanbanSquare, FolderOpen, Users, Plus, Target, Settings, Focus } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0 overflow-y-auto">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 bg-gradient-to-br from-[#E40046] to-[#00B5E2] rounded-xl flex items-center justify-center text-white scale-110 shadow-lg shadow-pink-100">
           <span className="font-black text-lg">P</span>
        </div>
        <span className="text-xl font-bold text-gray-900 tracking-tight">PrompTool</span>
      </div>

      {/* New Task Button */}
      <button className="w-full bg-[#E40046] hover:bg-[#C0003A] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 mb-10 shadow-xl shadow-pink-100 transition-all active:scale-95">
        <Plus size={20} strokeWidth={3} /> New Task
      </button>

      {/* Navigation Groups */}
      <div className="flex-1 space-y-8">

        {/* Group 1: Workspace */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 px-4">Workspace</p>
          <nav className="space-y-1.5">
            <NavItem to="/app" end icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem to="/app/board" icon={<KanbanSquare size={20} />} label="Board" />
            <NavItem to="/app/projects" icon={<FolderOpen size={20} />} label="Projects" />
            <NavItem to="/app/team" icon={<Users size={20} />} label="Team" />
            <NavItem to="/app/tasks" icon={<Target size={20} />} label="Tasks" />
            <NavItem to="/app/focus" icon={<Focus size={20} />} label="Focus Mode" />

          </nav>
        </div>
      </div>

      {/* Group 3: Bottom Actions */}
      <div className="pt-6 border-t border-gray-100">
        <NavItem to="/app/settings" icon={<Settings size={20} />} label="Settings" />
      </div>

    </div>
  );
};

// --- REUSABLE NAV ITEM COMPONENT ---
const NavItem = ({ to, icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => `
      w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all
      ${isActive
        ? 'bg-[#00B5E2] text-white shadow-lg shadow-cyan-100 scale-[1.02]' 
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }
    `}
  >
    {icon}
    {label}
  </NavLink>
);

export default Sidebar;