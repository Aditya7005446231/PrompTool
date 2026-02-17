import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import { Search, Bell } from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Content Wrapper */}
      <main className="flex-1 ml-64 p-8">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800">Area 51</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="bg-gray-100 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 w-64"
              />
            </div>
            <Bell className="text-gray-500 cursor-pointer hover:text-gray-800" size={20} />
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold border border-orange-200">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;