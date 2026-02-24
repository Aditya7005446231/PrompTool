import React from 'react';

const Settings = () => {
  return (
    <div className="p-8 max-w-4xl"> {/* Constrained width to match screenshot look */}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your workspace preferences.</p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 space-y-8">
        
        {/* Field 1: Workspace Name */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-900">
            Workspace Name
          </label>
          <input 
            type="text" 
            defaultValue="FlowDesk Workspace" 
            className="w-full max-w-md px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all shadow-sm"
          />
        </div>

        {/* Field 2: Email Notifications */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-900">Email Notifications</h3>
          <p className="text-sm text-gray-500">Receive email updates on task changes.</p>
          <div className="pt-2">
             <label className="flex items-center cursor-pointer relative">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                <span className="ml-3 text-sm font-medium text-gray-700">Enabled</span>
              </label>
          </div>
        </div>

        {/* Field 3: Theme */}
        <div className="space-y-1">
           <h3 className="text-sm font-semibold text-gray-900">Theme</h3>
           <p className="text-sm text-gray-500">Theme customization coming soon.</p>
        </div>

        {/* Save Button (Optional addition to make it functional) */}
        <div className="pt-4 border-t border-gray-200">
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Save Changes
            </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;