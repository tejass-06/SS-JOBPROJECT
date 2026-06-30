import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Briefcase, Trash2, LogOut, Check, ShieldAlert, Award } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    candidates: 0,
    employers: 0,
    admins: 0,
    jobsPosted: 0
  });
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // 1. Session authorization check
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/signin';
      return;
    }
    const parsedUser = JSON.parse(currentUser);
    if (parsedUser.role !== 'admin') {
      // Role segregation: redirect to appropriate portal
      if (parsedUser.role === 'employee') window.location.href = '/profile';
      else if (parsedUser.role === 'employer') window.location.href = '/employer/dashboard';
      return;
    }
    setUser(parsedUser);

    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load registered users
    const usersJson = localStorage.getItem('users') || '[]';
    const usersList = JSON.parse(usersJson);
    setAllUsers(usersList);

    // Load active jobs
    const jobsJson = localStorage.getItem('postedJobs') || '[]';
    const jobsList = JSON.parse(jobsJson);

    // Calculate metrics
    const candidatesCount = usersList.filter(u => u.role === 'employee').length;
    const employersCount = usersList.filter(u => u.role === 'employer').length;
    const adminsCount = usersList.filter(u => u.role === 'admin').length;

    setStats({
      totalUsers: usersList.length,
      candidates: candidatesCount,
      employers: employersCount,
      admins: adminsCount,
      jobsPosted: jobsList.length
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const handleDeleteUser = (emailToDelete) => {
    if (emailToDelete === user.email) {
      setAlertMessage("Security Protocol Blocked: Cannot delete your own administrative session.");
      setTimeout(() => setAlertMessage(''), 3000);
      return;
    }

    // Load global registry
    const usersJson = localStorage.getItem('users') || '[]';
    const usersList = JSON.parse(usersJson);
    const updatedUsers = usersList.filter(u => u.email.toLowerCase() !== emailToDelete.toLowerCase());
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Also remove posted jobs if it was an employer
    const jobsJson = localStorage.getItem('postedJobs') || '[]';
    const jobsList = JSON.parse(jobsJson);
    const updatedJobs = jobsList.filter(j => j.employerEmail.toLowerCase() !== emailToDelete.toLowerCase());
    localStorage.setItem('postedJobs', JSON.stringify(updatedJobs));

    // Reload UI state
    setAlertMessage(`User record terminated for: ${emailToDelete}`);
    loadDashboardData();
    setTimeout(() => setAlertMessage(''), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="font-black uppercase tracking-[0.2em] text-slate-400">Verifying Administrative Clearance...</div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* --- Global Grid Background --- */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`, 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Alert message banner */}
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-4 bg-sky-50 border-2 border-sky-500 text-sky-700 text-xs font-black uppercase tracking-wider flex items-center gap-2"
          >
            <ShieldAlert size={16} className="text-red-500" /> {alertMessage}
          </motion.div>
        )}

        {/* --- Top Header Stats Row --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Admin Tag */}
          <div className="bg-black text-white p-6 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(14,165,233,1)] flex flex-col justify-center">
            <div className="flex items-center gap-2 text-sky-400 font-black text-xs uppercase tracking-widest mb-2">
              <Zap size={14} fill="currentColor" /> Admin Terminal
            </div>
            <h1 className="text-2xl font-black uppercase leading-tight">{user.name}</h1>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest break-all mt-1">{user.email}</p>
            
            <button 
              onClick={handleLogout}
              className="mt-6 flex items-center justify-center gap-2 border-2 border-white py-2 text-[8px] font-black uppercase tracking-widest hover:bg-red-500 hover:border-red-500 transition-colors"
            >
              Log Out <LogOut size={10} />
            </button>
          </div>

          {/* Stats: Total Users */}
          <div className="bg-white p-6 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total System Nodes</p>
            <p className="text-4xl font-black text-black">{stats.totalUsers}</p>
            <div className="text-[9px] font-black uppercase text-slate-500 mt-4">
              Candidates: {stats.candidates} • Employers: {stats.employers}
            </div>
          </div>

          {/* Stats: Jobs Posted */}
          <div className="bg-white p-6 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Active Jobs Transmitted</p>
            <p className="text-4xl font-black text-black">{stats.jobsPosted}</p>
            <div className="text-[9px] font-black uppercase text-slate-500 mt-4">
              Global jobs database records.
            </div>
          </div>

          {/* Stats: Access Roles */}
          <div className="bg-white p-6 border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Admin Accounts</p>
            <p className="text-4xl font-black text-sky-500 italic">{stats.admins}</p>
            <div className="text-[9px] font-black uppercase text-slate-500 mt-4 flex items-center gap-1">
              <Award size={10} className="text-sky-500" /> Root access permissions.
            </div>
          </div>
        </div>

        {/* --- Main Management Console --- */}
        <div className="bg-white border-[4px] border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6 border-b-2 border-slate-100 pb-4">
            System Registry <span className="text-sky-500 italic">Database.</span>
          </h2>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-4 border-black bg-slate-50">
                  <th className="py-4 px-6 font-black uppercase text-xs tracking-widest text-slate-400">User Identity</th>
                  <th className="py-4 px-6 font-black uppercase text-xs tracking-widest text-slate-400">Email Address</th>
                  <th className="py-4 px-6 font-black uppercase text-xs tracking-widest text-slate-400">Access Role</th>
                  <th className="py-4 px-6 font-black uppercase text-xs tracking-widest text-slate-400 text-right">Registry Operations</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u) => (
                  <tr key={u.email} className="border-b border-slate-100 hover:bg-sky-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-black text-xs uppercase">
                          {u.name ? u.name.charAt(0) : 'U'}
                        </div>
                        <div>
                          <p className="font-black text-xs uppercase">{u.name || 'Unknown User'}</p>
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                            {u.role === 'employer' ? u.companyName || 'Company' : 'Candidate'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-xs uppercase tracking-wider">{u.email}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-block px-3 py-1 text-[8px] font-black uppercase tracking-widest border border-black ${
                        u.role === 'admin' ? 'bg-sky-500 text-black' :
                        u.role === 'employer' ? 'bg-black text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {u.email !== user.email ? (
                        <button 
                          onClick={() => handleDeleteUser(u.email)}
                          className="p-2 border-2 border-black hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Purge User Registry"
                        >
                          <Trash2 size={12} />
                        </button>
                      ) : (
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Logged In</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
