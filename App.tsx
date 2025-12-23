
import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';
import { AppData } from './types';
import UserPanel from './components/UserPanel';

const App: React.FC = () => {
  const [apps, setApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appsRef = ref(db, 'apps');
    const unsubscribe = onValue(appsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const appsList = Object.entries(data).map(([id, val]: [string, any]) => ({
          id,
          ...val
        })).sort((a, b) => b.timestamp - a.timestamp);
        setApps(appsList);
      } else {
        setApps([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Read Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050811] text-white">
      {/* Enhanced Animated Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[180px] rounded-full animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-cyan-600/10 blur-[180px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '3s' }}></div>
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-purple-600/5 blur-[120px] rounded-full animate-bounce pointer-events-none" style={{ animationDuration: '10s' }}></div>

      <header className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center border-b border-white/10 shadow-2xl">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
            <i className="fas fa-bolt text-2xl text-white relative z-10"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              BJYMODS
            </h1>
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-bold">Safe & Verified</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="https://t.me/+NrbfZyVLST04ZGE1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 rounded-full border border-cyan-500/30 transition-all group"
          >
            <i className="fab fa-telegram text-cyan-400 group-hover:scale-125 transition-transform"></i>
            <span className="text-xs font-bold text-cyan-100 hidden sm:inline">JOIN GROUP</span>
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-blue-500 border-b-transparent rounded-full animate-spin-slow"></div>
            </div>
            <p className="text-cyan-400 font-bold tracking-[0.3em] animate-pulse text-sm">LOADING ASSETS...</p>
          </div>
        ) : (
          <UserPanel apps={apps} />
        )}
      </main>

      <footer className="py-10 text-center relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="flex justify-center space-x-8 mb-6">
          <a href="https://t.me/+NrbfZyVLST04ZGE1" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-all hover:scale-125"><i className="fab fa-telegram text-2xl"></i></a>
          <a href="#" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-125"><i className="fab fa-discord text-2xl"></i></a>
          <a href="#" className="text-gray-400 hover:text-red-500 transition-all hover:scale-125"><i className="fab fa-youtube text-2xl"></i></a>
        </div>
        <div className="space-y-1">
          <p className="text-gray-500 text-sm font-medium tracking-wide">© 2024 <span className="text-white font-black">BJYMODS</span> OFFICIAL</p>
          <p className="text-cyan-500/40 text-[9px] uppercase tracking-[0.4em]">Advanced Android Modification Framework</p>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
