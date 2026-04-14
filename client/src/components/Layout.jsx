import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import { Search, Bell, ChevronDown, HelpCircle, Edit2 } from 'lucide-react';

const Layout = () => {
  const location = useLocation();
  const [workspaceName, setWorkspaceName] = useState(() => {
    return localStorage.getItem('workspaceName') || 'PrompTool';
  });
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    setIsEditing(false);
    const finalName = workspaceName.trim() || 'PrompTool';
    setWorkspaceName(finalName);
    localStorage.setItem('workspaceName', finalName);
  };

  const getPageTitle = () => {
    if (location.pathname === '/app') return 'Dashboard';
    if (location.pathname === '/app/board') return 'Kanban Board';
    if (location.pathname === '/app/projects') return 'Projects';
    if (location.pathname === '/app/team') return 'Team';
    return 'Workspace';
  };
  return (
    <div className="flex h-screen overflow-hidden dotted-bg font-sans bg-white">

      <Sidebar />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 ml-64 flex flex-col relative h-full">

        {/* --- NAVBAR START --- */}
        <header className="shrink-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-gray-100 px-6 py-3 flex items-center justify-between transition-all">

          {/* Left: Breadcrumb / Title */}
          <div className="flex items-center gap-2">
            <div className="group relative flex items-center cursor-pointer" onClick={() => setIsEditing(true)}>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  onBlur={handleSave}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') {
                      setWorkspaceName(localStorage.getItem('workspaceName') || 'PrompTool');
                      setIsEditing(false);
                    }
                  }}
                  className="text-lg md:text-2xl lg:text-4xl font-black text-[#E40046] tracking-tight bg-transparent outline-none border-b-2 border-[#E40046] w-32 md:w-48 lg:w-64"
                />
              ) : (
                <div className="flex items-center gap-2 transition-colors">
                  <h1 className="text-lg md:text-2xl lg:text-4xl font-black text-gray-900 group-hover:text-[#E40046] tracking-tight transition-colors truncate max-w-[250px]" title="Click to rename workspace">
                    {workspaceName}
                  </h1>
                  <Edit2 size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
            </div>
            <span className="text-gray-300 text-xl md:text-2xl lg:text-4xl font-light ml-2">/</span>
            <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 mt-1 lg:mt-2">{getPageTitle()}</span>
          </div>

          {/* Right: Actions Area */}
          <div className="flex items-center gap-4">

            {/* Search Bar (Pill Shape) */}
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#00B5E2] transition-colors" size={16} />
              <input
                type="text"
                placeholder="Universal Search..."
                className="bg-gray-50 hover:bg-white focus:bg-white pl-9 pr-4 py-2 rounded-full text-sm border border-gray-100 focus:border-[#00B5E2] focus:ring-4 focus:ring-cyan-500/10 transition-all w-64 outline-none placeholder:text-gray-400 font-medium"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span className="text-[10px] text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-sm">⌘K</span>
              </div>
            </div>

            {/* Icons Group */}
            <div className="flex items-center gap-2 ml-2">
              <button className="relative text-gray-400 hover:text-[#E40046] hover:bg-pink-50 p-2 rounded-xl transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#E40046] rounded-full border-2 border-white animate-pulse"></span>
              </button>
              <button className="text-gray-400 hover:text-[#00B5E2] hover:bg-cyan-50 p-2 rounded-xl transition-all">
                <HelpCircle size={20} />
              </button>
            </div>

            <div className="h-8 w-px bg-gray-100 mx-2"></div>

            {/* Profile Dropdown Trigger */}
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
              <div className="w-9 h-9 bg-gradient-to-tr from-[#00B5E2] to-[#E40046] rounded-xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-cyan-100">
                AR
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-gray-900 leading-tight">Aditya Rai</p>
                <p className="text-[10px] font-bold text-[#00B5E2] uppercase tracking-tighter leading-tight">Pro Member</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-900 ml-1" />
            </button>

          </div>
        </header>
        {/* --- NAVBAR END --- */}

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default Layout;