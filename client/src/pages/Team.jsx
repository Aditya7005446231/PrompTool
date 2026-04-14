import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Mail, Users, ArrowLeft, MoreVertical, Filter } from 'lucide-react';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({ name: '', email: '', role: 'Member' });
  const [inviteLoading, setInviteLoading] = useState(false);

  const getInitial = (value) => {
    if (typeof value !== 'string') return '?';
    const trimmed = value.trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3001/api/teams', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setTeams(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching teams:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async () => {
    const name = window.prompt("Enter a new Team Name (e.g. Design Team):");
    if (!name) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3001/api/teams', { 
        name, 
        description: 'New Workspace Team' 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        setTeams([...teams, res.data.data]);
      }
    } catch (err) {
      console.error("Error creating team:", err);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviteLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3001/api/teams/invite', {
        teamId: selectedTeam._id,
        name: inviteData.name,
        email: inviteData.email,
        role: inviteData.role
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        // Update the selected team with the newly fetched data
        setSelectedTeam(res.data.data);
        setShowInviteModal(false);
        setInviteData({ name: '', email: '', role: 'Member' });
        
        // Refresh the teams list in the background
        fetchTeams(); 
      }
    } catch (err) {
        alert("Failed to send invite");
        console.error(err);
    } finally {
        setInviteLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading Workspaces...</div>;

  // ==========================================
  // VIEW 1: TEAM DASHBOARD (List of out teams)
  // ==========================================
  if (!selectedTeam) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Workspaces</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Manage organizations</p>
          </div>
          <button 
            onClick={handleCreateTeam}
            className="flex items-center gap-2 px-6 py-3 bg-[#E40046] text-white rounded-2xl text-sm font-black hover:bg-[#C0003A] transition-all shadow-xl shadow-pink-100 uppercase tracking-widest active:scale-95"
          >
            <Plus size={18} strokeWidth={3} /> Create Team
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              No teams found. Create one to get started!
            </div>
          )}

          {teams.map((team) => (
            <div 
              key={team._id} 
              onClick={() => setSelectedTeam(team)}
              className="bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:shadow-cyan-100/30 hover:border-[#00B5E2]/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#00B5E2] to-[#E40046] text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-cyan-100">
                  {getInitial(team.name)}
                </div>
                <div className="text-[10px] font-black text-[#00B5E2] bg-cyan-50 px-3 py-1.5 rounded-full flex items-center gap-2 uppercase tracking-widest">
                   <Users size={14} strokeWidth={3}/> {team.members.length} Members
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-[#00B5E2] transition-colors tracking-tight">{team.name}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">{team.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: INSIDE A SPECIFIC TEAM
  // ==========================================
  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <button 
            onClick={() => setSelectedTeam(null)}
            className="flex items-center gap-2 text-[10px] font-black text-[#00B5E2] hover:text-[#E40046] mb-4 transition-all uppercase tracking-widest"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Return to Workspaces
          </button>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">{selectedTeam.name}</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">Managed lead: {selectedTeam.owner.name}</p>
        </div>
        
        <button 
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#E40046] text-white rounded-2xl text-sm font-black hover:bg-[#C0003A] transition-all shadow-xl shadow-pink-100 uppercase tracking-widest"
        >
          <Mail size={18} strokeWidth={3} /> Send Invitation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {selectedTeam.members.map((memberWrap) => {
          const user = memberWrap.user;
          return (
            <div key={user._id} className="bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:border-[#00B5E2]/20 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-[#00B5E2]/10 transition-colors"></div>
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#00B5E2] to-[#E40046] flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-cyan-100 group-hover:scale-110 transition-transform`}>
                    {getInitial(user.name)}
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-1">{user.name}</h3>
                <p className="text-[10px] font-black text-[#E40046] bg-pink-50 px-3 py-1 rounded-lg mb-4 uppercase tracking-widest">{memberWrap.role}</p>
                <p className="text-sm font-medium text-gray-500">{user.email}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* INVITE MODAL Overlay */}
      {/* ========================================== */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Invite to Team</h3>
            <p className="text-gray-500 text-sm mb-6">They will receive an email invitation to join.</p>
            
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Member Name</label>
                <input 
                  required type="text" placeholder="John Doe"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold text-gray-900 transition-all"
                  value={inviteData.name} onChange={(e) => setInviteData({...inviteData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  required type="email" placeholder="john@example.com"
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold text-gray-900 transition-all"
                  value={inviteData.email} onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Workspace Role</label>
                <select 
                  className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-cyan-500/10 focus:border-[#00B5E2] outline-none font-bold appearance-none text-gray-900 transition-all"
                  value={inviteData.role} onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Designer">Designer</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>

              <div className="flex gap-4 pt-6">
                <button 
                  type="button" 
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-4 text-gray-400 font-black hover:bg-gray-100 rounded-2xl transition-all uppercase tracking-widest text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit" disabled={inviteLoading}
                  className="flex-1 px-4 py-4 bg-[#00B5E2] text-white font-black rounded-2xl hover:bg-[#008CAB] transition-all disabled:opacity-50 uppercase tracking-widest text-xs shadow-lg shadow-cyan-100"
                >
                  {inviteLoading ? 'Sending...' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;