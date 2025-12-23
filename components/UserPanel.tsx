
import React from 'react';
import { AppData } from '../types';

interface UserPanelProps {
  apps: AppData[];
}

const UserPanel: React.FC<UserPanelProps> = ({ apps }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-1.5 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
          <h3 className="text-xl font-black uppercase tracking-widest text-white/90">Available Mods</h3>
        </div>
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
          {apps.length} Assets Online
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="glass p-20 rounded-[3rem] text-center border-dashed border-2 border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <i className="fas fa-search text-3xl text-gray-700 animate-pulse"></i>
            </div>
            <p className="text-gray-500 text-lg font-medium tracking-wide">Scanning database for updates...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <div 
              key={app.id}
              className="group relative"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Animated Border Glow */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative bg-[#0d1324] p-7 rounded-[2.5rem] border border-white/5 group-hover:bg-[#121a31] transition-all duration-500 flex flex-col h-full shadow-2xl">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center text-3xl shadow-xl border border-white/5 group-hover:scale-110 group-hover:shadow-cyan-500/10 transition-all duration-500">
                    <i className="fas fa-layer-group text-cyan-400 group-hover:animate-pulse"></i>
                  </div>
                  <div className="bg-cyan-500/5 border border-cyan-500/20 px-3 py-1 rounded-full">
                    <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">
                      Stable
                    </span>
                  </div>
                </div>

                <div className="flex-grow space-y-2 mb-8">
                  <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                    {app.name}
                  </h3>
                  <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center"><i className="fas fa-check-circle text-green-500 mr-1.5"></i> Clean</span>
                    <span className="flex items-center"><i className="fas fa-calendar-alt mr-1.5"></i> {new Date(app.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <a 
                  href={app.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/btn relative overflow-hidden w-full py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                  <i className="fas fa-arrow-down relative z-10 group-hover/btn:animate-bounce"></i>
                  <span className="relative z-10">Download Mod</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Featured Banner - Clickable Telegram */}
      <a 
        href="https://t.me/+NrbfZyVLST04ZGE1"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative mt-16 group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative p-10 md:p-14 rounded-[3rem] overflow-hidden bg-[#0d1324] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Animated Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex items-center space-x-6">
            <div className="w-20 h-20 bg-cyan-500 rounded-[2rem] flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(6,182,212,0.4)] group-hover:rotate-12 transition-transform duration-500">
              <i className="fab fa-telegram-plane text-white"></i>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black uppercase tracking-tighter">Official Telegram</h3>
              <p className="text-cyan-400 font-bold text-xs uppercase tracking-[0.3em]">Updates • Support • Requests</p>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 shadow-2xl flex items-center space-x-3">
              <span>Join Channel</span>
              <i className="fas fa-chevron-right group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </div>
      </a>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 opacity-40">
        {[
          { icon: 'fa-shield-virus', label: 'Virus Free' },
          { icon: 'fa-bolt', label: 'Fast Servers' },
          { icon: 'fa-user-check', label: 'Verified' },
          { icon: 'fa-infinity', label: 'Lifetime' }
        ].map((badge, i) => (
          <div key={i} className="flex items-center justify-center space-x-2 text-[10px] font-bold uppercase tracking-widest">
            <i className={`fas ${badge.icon} text-cyan-400`}></i>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
