import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, Globe, 
  CheckCircle2, ArrowLeft, Share2, Bookmark, Zap,
  Users, Loader2, Wallet, Award
} from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://astrologer-backend-wrbe.onrender.com/api/job-details/job-details/${id}`);
        const result = await response.json();
        if (result.success) {
          setJobDetail(result.data);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-black text-sky-500 gap-3">
        <Loader2 className="animate-spin" size={32} /> LOADING DATA...
      </div>
    );
  }

  if (!jobDetail) {
    return <div className="min-h-screen flex items-center justify-center font-black">JOB NOT FOUND</div>;
  }

  // Destructuring for easier access to nested jobId data
  const { jobId, description, responsibilities, requirements, applicants, posted } = jobDetail;

  return (
    <div className="bg-white pt-24 pb-20 relative min-h-screen font-sans selection:bg-sky-100">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{ 
             backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`, 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Back & Actions */}
        <div className="flex justify-between items-center mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:text-sky-500 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Careers
          </button>
          <div className="flex gap-4">
            <button className="p-3 border-2 border-black hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Share2 size={18} /></button>
            <button className="p-3 border-2 border-black hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"><Bookmark size={18} /></button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-[4px] border-black p-8 md:p-12 bg-white shadow-[12px_12px_0px_0px_rgba(14,165,233,1)]"
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">{jobId?.jobType || 'Full Time'}</span>
                <span className="bg-sky-100 text-sky-600 border border-sky-200 px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Hiring Now
                </span>
              </div>
              
              {/* Actual Dynamic Title from API */}
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                {jobId?.title || "Role Overview"}
              </h1>
              <p className="text-sky-600 font-black uppercase text-sm tracking-widest mb-8 italic">
                {jobId?.company} — {jobId?.location}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t-2 border-slate-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Users size={12}/> Applicants</p>
                  <p className="font-black text-sm uppercase">{applicants}+ Joined</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Clock size={12}/> Timeline</p>
                  <p className="font-black text-sm uppercase">Posted {posted}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Wallet size={12}/> Package</p>
                  <p className="font-black text-sm uppercase text-sky-600">{jobId?.salary}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Award size={12}/> Experience</p>
                  <p className="font-black text-sm uppercase">{jobId?.experience}</p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-12 px-2">
              <section>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 border-l-4 border-sky-500 pl-4">Position Overview</h3>
                <p className="text-slate-600 font-bold leading-relaxed text-lg">
                  {description}
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-l-4 border-black pl-4">Core Responsibilities</h3>
                <ul className="grid grid-cols-1 gap-4">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-4 items-start bg-slate-50 p-4 border-2 border-transparent hover:border-black transition-all">
                      <div className="mt-1"><CheckCircle2 size={18} className="text-sky-500" /></div>
                      <p className="font-bold text-slate-700">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 border-l-4 border-black pl-4">Skill Requirements</h3>
                <div className="flex flex-wrap gap-3">
                  {requirements.map((req, i) => (
                    <span key={i} className="bg-white border-2 border-black px-4 py-2 font-black text-[11px] uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-sky-500 transition-colors cursor-default">
                      {req}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column (Action Panel) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="border-[4px] border-black p-8 bg-black text-white shadow-[12px_12px_0px_0px_rgba(14,165,233,1)]">
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-sky-400">
                  <Zap size={20} fill="currentColor" /> Submit Stack
                </h3>
                <button className="w-full bg-sky-500 text-black py-5 font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all mb-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  Apply Now
                </button>
                <p className="text-[10px] text-center text-slate-500 font-black uppercase tracking-tighter mt-4 italic">
                    System ID: {jobId?._id}
                </p>
              </div>

              <div className="bg-slate-50 border-2 border-black p-6">
                <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-4">Recruitment Protocol</h4>
                <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-tighter">
                  Our algorithm reviews applications within 24 hours. If your stack matches, you will receive an invite for a technical audit.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;