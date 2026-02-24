import React from 'react';
import { MoreHorizontal } from 'lucide-react';

// We receive the whole 'project' object as a prop
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 group">
      
      {/* 1. Header: Icon & Menu */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl ${project.color} flex items-center justify-center font-bold text-xl`}>
          {project.letter}
        </div>
        <button className="text-gray-300 hover:text-gray-600 transition-colors p-1 hover:bg-gray-50 rounded-lg">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* 2. Title & Description */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{project.title}</h3>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
          {project.tasksCount} Tasks
        </p>
        <p className="text-sm text-gray-500 line-clamp-2 h-10">
          {project.description}
        </p>
      </div>

      {/* 3. Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
          <span>Progress</span>
          <span className="text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full ${project.barColor} rounded-full transition-all duration-1000 ease-out`} 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* 4. Footer: Team Members */}
      <div className="flex items-center -space-x-2 pt-4 border-t border-gray-50">
        {project.team.map((member, index) => (
          <div 
            key={index} 
            className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600 hover:z-10 transition-transform hover:scale-110"
            title={member} // Shows tooltip on hover
          >
            {member}
          </div>
        ))}
        {/* Add Button Placeholder */}
        <div className="w-8 h-8 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            +
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;