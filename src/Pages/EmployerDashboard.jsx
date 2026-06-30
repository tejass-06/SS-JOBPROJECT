import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Users, Briefcase, FileText, Trash2, LogOut, Check, ChevronRight, X } from 'lucide-react';

const EmployerDashboard = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showPostJob, setShowPostJob] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    salary: '',
    location: 'Nagpur, India',
    type: 'Full-time',
    description: ''
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
    if (parsedUser.role !== 'employer') {
      // Role segregation: redirect to appropriate portal
      if (parsedUser.role === 'employee') window.location.href = '/profile';
      else if (parsedUser.role === 'admin') window.location.href = '/admin/dashboard';
      return;
    }
    setUser(parsedUser);

    // 2. Load jobs posted by this employer
    const allJobsJson = localStorage.getItem('postedJobs') || '[]';
    const allJobs = JSON.parse(allJobsJson);
    const employerJobs = allJobs.filter(j => j.employerEmail === parsedUser.email);
    setJobs(employerJobs);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!user) return;

    const newJob = {
      id: Date.now().toString(),
      employerEmail: user.email,
      companyName: user.companyName || 'Elite Partner',
      title: jobForm.title,
      department: jobForm.department,
      salary: jobForm.salary,
      location: jobForm.location,
      type: jobForm.type,
      description: jobForm.description,
      applicantsCount: 0,
      datePosted: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };

    // Save globally
    const allJobsJson = localStorage.getItem('postedJobs') || '[]';
    const allJobs = JSON.parse(allJobsJson);
    allJobs.push(newJob);
    localStorage.setItem('postedJobs', JSON.stringify(allJobs));

    // Update local state
    setJobs([...jobs, newJob]);
    setShowPostJob(false);
    setJobForm({
      title: '',
      department: '',
      salary: '',
      location: 'Nagpur, India',
      type: 'Full-time',
      description: ''
    });

    setAlertMessage('New Job Posting Dispatched!');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleDeleteJob = (jobId) => {
    // Delete globally
    const allJobsJson = localStorage.getItem('postedJobs') || '[]';
    const allJobs = JSON.parse(allJobsJson);
    const filteredJobs = allJobs.filter(j => j.id !== jobId);
    localStorage.setItem('postedJobs', JSON.stringify(filteredJobs));

    // Update local state
    setJobs(jobs.filter(j => j.id !== jobId));
    setAlertMessage('Job posting deleted.');
    setTimeout(() => setAlertMessage(''), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="font-black uppercase tracking-[0.2em] text-slate-400">Verifying Recruiter Clearance...</div>
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
        
        {/* Success Alert */}
        {alertMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 p-4 bg-sky-50 border-2 border-sky-500 text-sky-700 text-xs font-black uppercase tracking-wider flex items-center gap-2"
          >
            <Check size={16} /> {alertMessage}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT CARD: RECRUITER INFO --- */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Zap size={12} className="text-sky-400" fill="currentColor" />
                Recruiter Node
              </div>

              <div className="w-20 h-20 bg-sky-100 border-[3px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-3xl font-black uppercase text-black">
                  {user.companyName ? user.companyName.charAt(0) : 'R'}
                </span>
              </div>

              <h2 className="text-2xl font-black uppercase tracking-tight leading-none mb-1">{user.companyName || 'Employer Partner'}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest break-all mb-4">{user.email}</p>
              
              <div className="bg-slate-50 border-2 border-black p-4 text-[10px] font-black uppercase tracking-wider text-slate-600 mb-6">
                Authorizer: {user.name}
              </div>

              {/* Recruitment Statistics */}
              <div className="space-y-4 pt-4 border-t-2 border-slate-100">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
                  <span className="text-slate-400">Jobs Posted</span>
                  <span className="text-black bg-sky-100 px-2 py-0.5 border border-black">{jobs.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
                  <span className="text-slate-400">Candidate Pipeline</span>
                  <span className="text-black bg-sky-100 px-2 py-0.5 border border-black">
                    {jobs.reduce((acc, job) => acc + (job.applicantsCount || 0), 0)}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="mt-8 w-full flex items-center justify-center gap-2 border-2 border-black py-3 text-[10px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors"
              >
                Terminate Session <LogOut size={12} />
              </button>
            </motion.div>
          </div>

          {/* --- RIGHT CARD: JOBS MANAGEMENT --- */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Header Control */}
            <div className="bg-white border-[4px] border-black p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tight sm:text-left text-center">
                  Recruitment <span className="text-sky-500 italic">Panel.</span>
                </h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest sm:text-left text-center">Expose jobs & review profiles.</p>
              </div>

              {!showPostJob && (
                <button 
                  onClick={() => setShowPostJob(true)}
                  className="flex items-center gap-2 bg-black text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(14,165,233,1)] active:translate-y-0.5 active:shadow-none"
                >
                  Expose New Role <Plus size={14} />
                </button>
              )}
            </div>

            {/* Post Job Form Modal-style wrapper */}
            {showPostJob && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(14,165,233,1)]"
              >
                <div className="flex justify-between items-center mb-8 border-b-2 border-slate-100 pb-4">
                  <h3 className="font-black uppercase tracking-tight text-lg">Define New Role Protocol</h3>
                  <button 
                    onClick={() => setShowPostJob(false)}
                    className="p-1 border-2 border-black hover:bg-red-50 hover:text-red-500 hover:border-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handlePostJob} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Title */}
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        placeholder=" "
                        className="w-full bg-transparent border-b-[3px] border-black py-3 font-black uppercase text-sm focus:outline-none focus:border-sky-500 transition-colors peer"
                        value={jobForm.title}
                        onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-slate-300 font-black uppercase text-xs tracking-widest transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-sky-500 peer-[:not(:placeholder-shown)]:-top-4">
                        Job Title
                      </label>
                    </div>

                    {/* Department */}
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        placeholder=" "
                        className="w-full bg-transparent border-b-[3px] border-black py-3 font-black uppercase text-sm focus:outline-none focus:border-sky-500 transition-colors peer"
                        value={jobForm.department}
                        onChange={(e) => setJobForm({...jobForm, department: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-slate-300 font-black uppercase text-xs tracking-widest transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-sky-500 peer-[:not(:placeholder-shown)]:-top-4">
                        Department
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Salary */}
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        placeholder=" "
                        className="w-full bg-transparent border-b-[3px] border-black py-3 font-black uppercase text-sm focus:outline-none focus:border-sky-500 transition-colors peer"
                        value={jobForm.salary}
                        onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-slate-300 font-black uppercase text-xs tracking-widest transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-sky-500 peer-[:not(:placeholder-shown)]:-top-4">
                        Salary (e.g. $80K - $100K)
                      </label>
                    </div>

                    {/* Location */}
                    <div className="relative group">
                      <input 
                        type="text" 
                        required
                        placeholder=" "
                        className="w-full bg-transparent border-b-[3px] border-black py-3 font-black uppercase text-sm focus:outline-none focus:border-sky-500 transition-colors peer"
                        value={jobForm.location}
                        onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                      />
                      <label className="absolute left-0 top-3 text-slate-300 font-black uppercase text-xs tracking-widest transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-sky-500 peer-[:not(:placeholder-shown)]:-top-4">
                        Location
                      </label>
                    </div>

                    {/* Job Type */}
                    <div className="relative group border-b-[3px] border-black pb-2">
                      <select 
                        className="w-full bg-transparent font-black uppercase text-xs tracking-widest outline-none py-1 focus:text-sky-500 cursor-pointer"
                        value={jobForm.type}
                        onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Remote">Remote</option>
                      </select>
                      <span className="absolute -top-4 left-0 text-slate-300 font-black uppercase text-[10px] tracking-widest">Job Type</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="relative group">
                    <textarea 
                      required
                      placeholder=" "
                      rows="4"
                      className="w-full bg-transparent border-b-[3px] border-black py-3 font-black uppercase text-sm focus:outline-none focus:border-sky-500 transition-colors peer resize-none"
                      value={jobForm.description}
                      onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                    ></textarea>
                    <label className="absolute left-0 top-3 text-slate-300 font-black uppercase text-xs tracking-widest transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-sky-500 peer-[:not(:placeholder-shown)]:-top-4">
                      Role Description & Requirements
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="submit"
                      className="flex items-center gap-2 bg-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-sky-500 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(14,165,233,1)] active:translate-y-0.5 active:shadow-none"
                    >
                      Deploy Role <Plus size={12} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowPostJob(false)}
                      className="border-2 border-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-colors"
                    >
                      Dismiss Form
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Posted Jobs Grid */}
            <div className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="font-black uppercase tracking-tight text-lg mb-6 border-b-2 border-slate-100 pb-3">Active Postings</h3>
              
              {jobs.length === 0 ? (
                <div className="border-2 border-dashed border-slate-300 p-12 text-center bg-slate-50">
                  <Briefcase className="mx-auto text-slate-300 mb-4" size={40} />
                  <p className="text-xs font-black uppercase text-slate-400 tracking-wider">No roles currently exposed to applicant registry.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {jobs.map((job) => (
                    <div 
                      key={job.id} 
                      className="border-[3px] border-black p-6 hover:shadow-[6px_6px_0px_0px_rgba(14,165,233,1)] transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="text-lg font-black uppercase tracking-tight leading-none">{job.title}</h4>
                          <span className="text-[9px] font-black uppercase tracking-wider bg-black text-white px-2 py-0.5">{job.type}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {job.department} • {job.location} • {job.salary}
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-2 uppercase font-medium mt-2">{job.description}</p>
                      </div>

                      <div className="flex sm:flex-row items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
                        {/* Applicants Counter */}
                        <div className="text-right">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Applicants</p>
                          <p className="text-lg font-black text-black">{job.applicantsCount || 0}</p>
                        </div>
                        
                        {/* Actions */}
                        <button 
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-3 border-2 border-black hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete Posting"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EmployerDashboard;
