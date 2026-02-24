import React from 'react';
import { Plus, Filter } from 'lucide-react';
import ProjectCard from '../components/ProjectCard'; // Import the component

const Projects = () => {
  // 1. The Data (In a real app, this comes from an API/Database)
  const projectsData = [
    {
      id: 1,
      title: "Website Redesign",
      tasksCount: 24,
      description: "Revamp the company website with new branding and better SEO.",
      progress: 75,
      color: "bg-emerald-100 text-emerald-600",
      barColor: "bg-emerald-500",
      letter: "W",
      team: ["AK", "SJ", "MR"]
    },
    {
      id: 2,
      title: "Mobile App",
      tasksCount: 32,
      description: "Build native mobile app for iOS and Android using React Native.",
      progress: 38,
      color: "bg-orange-100 text-orange-600",
      barColor: "bg-orange-500",
      letter: "M",
      team: ["PL", "AK", "DS"]
    },
    {
      id: 3,
      title: "API Integration",
      tasksCount: 15,
      description: "Third-party API integrations and webhooks for the new dashboard.",
      progress: 67,
      color: "bg-blue-100 text-blue-600",
      barColor: "bg-blue-500",
      letter: "A",
      team: ["MR", "DS"]
    },
    {
      id: 4,
      title: "Design System",
      tasksCount: 18,
      description: "Create a unified component library and design tokens.",
      progress: 89,
      color: "bg-purple-100 text-purple-600",
      barColor: "bg-purple-500",
      letter: "D",
      team: ["SJ", "AK"]
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage and track your ongoing projects.</p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                <Filter size={18} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
                <Plus size={18} /> New Project
            </button>
        </div>
      </div>

      {/* 2. Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* 3. The Map Loop (Very clean!) */}
        {projectsData.map((project) => (
           <ProjectCard key={project.id} project={project} />
        ))}

        {/* Optional: 'Add New' Placeholder Card */}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-orange-300 hover:text-orange-500 hover:bg-orange-50 transition-all min-h-[300px] group">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-orange-100 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-medium">Create New Project</span>
        </button>

      </div>
    </div>
  );
};

export default Projects;