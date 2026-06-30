import React from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Bot,
  ChevronRight,
  Briefcase,
  Users
} from "lucide-react";

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="bg-[#f8fafc] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- TOP CTA CARD --- */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  /* Mobile par padding aur margin kam rakha hai taaki content tight dikhe */
  className="bg-white p-8 md:p-12 lg:p-16 mb-12 md:mb-24 rounded-[30px] md:rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center justify-between gap-10"
>
  <div className="text-center lg:text-left flex-1 w-full">
    {/* Mobile par text 3xl rakha hai (kaafi bada h par screen se bahar nahi jayega) */}
    <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.2] lg:leading-tight tracking-tighter mb-4 md:mb-6">
      Hire better, <br />
      <span className="text-sky-600">Hired faster.</span>
    </h2>
    {/* Font size ko mobile ke liye adjust kiya hai */}
    <p className="text-slate-500 font-medium text-lg md:text-xl lg:text-2xl max-w-xl mx-auto lg:mx-0">
      hirrd: Next-gen talent matching.
    </p>
  </div>

  {/* Mobile par buttons ek ke niche ek (flex-col) aur full width (w-full) honge */}
  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full lg:w-auto shrink-0">
    <button className="bg-sky-600 text-white px-8 md:px-14 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-sky-700 transition-all shadow-lg shadow-sky-100 flex items-center justify-center gap-3 w-full sm:w-auto">
      <Briefcase size={22} className="md:w-6 md:h-6" /> Post a Job
    </button>
    <button className="bg-white text-slate-900 border-2 border-slate-100 px-8 md:px-14 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3 w-full sm:w-auto">
      <Users size={22} className="md:w-6 md:h-6" /> Find Talent
    </button>
  </div>
</motion.div>
        {/* --- MAIN GRID (Perfectly Aligned Rows) --- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
        >
          {/* Column 1: Brand */}
          <motion.div variants={item} className="flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Bot size={36} />
              </div>
              <span className="text-4xl font-black text-slate-900 tracking-tighter">
                hirrd<span className="text-sky-600">.</span>
              </span>
            </div>
            <p className="text-slate-500 font-bold text-xl leading-relaxed">
              India's premium intelligence-led career ecosystem for tech elite.
            </p>
            <div className="flex gap-5 mt-10">
              {[Linkedin, Twitter, Instagram, Facebook].map((Icon, i) => (
                <Icon key={i} size={28} className="text-slate-400 hover:text-sky-600 cursor-pointer transition-all hover:-translate-y-1" />
              ))}
            </div>
          </motion.div>

          {/* Column 2: Jobseekers */}
          <motion.div variants={item}>
            <h4 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">For Jobseekers</h4>
            <ul className="space-y-6">
              {[
                { name: "Explore Jobs", path: "/" },
                { name: "AI Resume Builder", path: "/resume-builder" },
                { name: "Salary Insights", path: "#" },
                { name: "Skill Assessment", path: "#" }
              ].map((linkItem) => (
                <li key={linkItem.name} className="text-xl text-slate-500 font-bold hover:text-sky-600 cursor-pointer flex items-center group transition-all">
                  <ChevronRight size={20} className="mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all text-sky-600 shrink-0" />
                  <a href={linkItem.path} className="w-full">{linkItem.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Employers */}
          <motion.div variants={item}>
            <h4 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">For Employers</h4>
            <ul className="space-y-6">
              {["Post Vacancy", "Talent Sourcing", "Screening Tools", "Enterprise Suite"].map((link) => (
                <li key={link} className="text-xl text-slate-500 font-bold hover:text-sky-600 cursor-pointer flex items-center group transition-all">
                  <ChevronRight size={20} className="mr-0 opacity-0 group-hover:mr-2 group-hover:opacity-100 transition-all" />
                  {link}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact */}
          <motion.div variants={item} className="space-y-10">
            <h4 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">hirrd HQ</h4>
            <div className="flex items-start gap-4">
              <MapPin className="text-sky-600 shrink-0 mt-1" size={28} />
              <p className="text-xl text-slate-500 font-bold leading-snug">
             Dharampeth, Nagpur, MH 440010
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-sky-600 shrink-0" size={28} />
              <p className="text-2xl font-black text-slate-900">+1 (555) 123-4567</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-sky-600 shrink-0" size={28} />
              <p className="text-2xl font-black text-sky-600 hover:underline cursor-pointer">
                demo@example.com
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* --- BOTTOM BAR (Clean & Big) --- */}
        <div className="pt-12 border-t border-slate-200 flex flex-col lg:flex-row justify-between items-center gap-8">
          <p className="text-xl font-bold text-slate-400">
            © 2026 hirrd. All rights reserved.
          </p>
          <div className="flex gap-12 text-xl font-black text-slate-500">
            <span className="hover:text-sky-600 cursor-pointer transition-all">Privacy</span>
            <span className="hover:text-sky-600 cursor-pointer transition-all">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;