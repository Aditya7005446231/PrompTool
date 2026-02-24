import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { ListTodo, Timer, CheckCircle2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link
          to="/board"
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          Open Board
        </Link>
      </div>
      {/* 1. Stats Row */}
      <div className="grid grid-cols-4 gap-10">
        <StatCard icon={<ListTodo size={20}/>} label="Total Tasks" value="8" color="blue" />
        <StatCard icon={<Timer size={20}/>} label="In Progress" value="3" color="orange" />
        <StatCard icon={<CheckCircle2 size={20}/>} label="Completed" value="2" color="green" />
        <StatCard icon={<AlertCircle size={20}/>} label="High Priority" value="2" color="red" />
      </div>

      {/* 2. Content Split */}
      <div className="grid grid-cols-3 gap-8">
        
        {/* Left: Recent Tasks (Takes 2 columns) */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Recent Tasks</h2>
          <div className="space-y-4">
            <TaskItem title="Design landing page" sub="Create wireframes" priority="high" date="Feb 20" />
            <TaskItem title="Set up CI/CD pipeline" sub="Configure Actions" priority="high" date="Feb 18" />
            <TaskItem title="User authentication" sub="Login and signup" priority="medium" date="Feb 22" />
            <TaskItem title="Write API docs" sub="REST endpoints" priority="low" date="Feb 25" />
          </div>
        </div>

        {/* Right: Projects (Takes 1 column) */}
        <div className="col-span-1 space-y-6">
          <h2 className="text-lg font-bold text-gray-800">Projects</h2>
          
          <div className="bg-orange-50 border border-orange-100 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <h3 className="font-bold text-gray-800">Website Redesign</h3>
            </div>
            <p className="text-gray-500 text-sm mb-4">Modernize the company website</p>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div className="bg-orange-500 h-2 rounded-full w-[65%]"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>24 tasks</span>
              <span>65%</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <h3 className="font-bold text-gray-800">Mobile App v2</h3>
            </div>
            <p className="text-gray-500 text-sm mb-4">Next gen mobile experience</p>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div className="bg-blue-500 h-2 rounded-full w-[40%]"></div>
            </div>
             <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>18 tasks</span>
              <span>40%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for Task Row
const TaskItem = ({ title, sub, priority, date }) => {
  const priorityColors = {
    high: "bg-red-100 text-red-600",
    medium: "bg-orange-100 text-orange-600",
    low: "bg-green-100 text-green-600"
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-orange-400"></div>
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
          <p className="text-xs text-gray-500">{sub}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${priorityColors[priority]}`}>
          {priority}
        </span>
        <span className="text-xs text-gray-400 font-medium">{date}</span>
      </div>
    </div>
  );
}

export default Dashboard;
