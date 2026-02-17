import React from 'react';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

const Tasks = () => {
  const tasks = [
    { id: 1, title: "Design homepage hero section", project: "Website Redesign", status: "In Progress", priority: "High", due: "Today" },
    { id: 2, title: "Fix navigation bug on mobile", project: "Mobile App", status: "Todo", priority: "Urgent", due: "Tomorrow" },
    { id: 3, title: "API Integration docs", project: "API Integration", status: "Done", priority: "Medium", due: "Feb 24" },
    { id: 4, title: "Update color palette", project: "Design System", status: "Todo", priority: "Low", due: "Feb 28" },
    { id: 5, title: "Conduct user testing", project: "Mobile App", status: "In Progress", priority: "High", due: "Mar 02" },
  ];

  const getPriorityStyle = (p) => {
    switch(p) {
      case 'Urgent': return 'bg-red-50 text-red-600 border-red-100';
      case 'High': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'Medium': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <p className="text-gray-500 mt-1">Focus on your upcoming deliverables.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* List Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-6">Task Name</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-2 text-right">Due Date</div>
        </div>

        {/* List Items */}
        <div className="divide-y divide-gray-50">
          {tasks.map((task) => (
            <div key={task.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors group">
              
              {/* Task Name & Project */}
              <div className="col-span-6 flex items-start gap-3">
                <button className="text-gray-300 hover:text-emerald-500 mt-0.5 transition-colors">
                   {task.status === 'Done' ? <CheckCircle2 className="text-emerald-500" size={20} /> : <Circle size={20} />}
                </button>
                <div>
                  <h4 className={`text-sm font-semibold text-gray-900 ${task.status === 'Done' ? 'line-through text-gray-400' : ''}`}>
                    {task.title}
                  </h4>
                  <span className="text-xs text-gray-500">{task.project}</span>
                </div>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {task.status}
                </span>
              </div>

              {/* Priority */}
              <div className="col-span-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              {/* Due Date */}
              <div className="col-span-2 text-right flex items-center justify-end gap-2 text-sm text-gray-500">
                <Clock size={14} />
                {task.due}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;