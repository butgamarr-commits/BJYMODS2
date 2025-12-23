
import React, { useState } from 'react';
import { AppData } from '../types';

interface AdminPanelProps {
  apps: AppData[];
  onAdd: (name: string, link: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ apps, onAdd, onDelete }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !link) return;
    
    setIsSubmitting(true);
    try {
      await onAdd(name, link);
      setName('');
      setLink('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom duration-700">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass p-8 rounded-3xl border-t-4 border-t-pink-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <i className="fas fa-plus-circle text-pink-500"></i>
            <span>Upload New App</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">App Name</label>
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter app name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-white placeholder:text-gray-600"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Download URL</label>
              <input 
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all text-white placeholder:text-gray-600"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-xl shadow-pink-500/20 ${isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 hover:scale-[1.02] active:scale-95'}`}
            >
              {isSubmitting ? (
                <i className="fas fa-spinner animate-spin"></i>
              ) : (
                <>
                  <i className="fas fa-upload"></i>
                  <span>Publish App</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="glass p-6 rounded-3xl border border-white/5">
          <h3 className="text-lg font-semibold mb-4 text-gray-400 flex items-center space-x-2">
            <i className="fas fa-info-circle"></i>
            <span>System Stats</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl text-center">
              <div className="text-2xl font-bold text-white">{apps.length}</div>
              <div className="text-xs text-gray-500">Total Apps</div>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl text-center">
              <div className="text-2xl font-bold text-white">Active</div>
              <div className="text-xs text-gray-500">Status</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2">
        <div className="glass p-8 rounded-3xl min-h-[400px]">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <i className="fas fa-list text-blue-500"></i>
            <span>Manage Content</span>
          </h2>

          {apps.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-gray-500 italic">Inventory is empty</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500 text-sm">
                    <th className="pb-4 font-medium">App Name</th>
                    <th className="pb-4 font-medium hidden sm:table-cell">Uploaded On</th>
                    <th className="pb-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {apps.map((app) => (
                    <tr key={app.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs">
                            <i className="fas fa-file"></i>
                          </div>
                          <span className="font-medium truncate max-w-[150px] md:max-w-[250px]">{app.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-500 text-sm hidden sm:table-cell">
                        {new Date(app.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <a 
                          href={app.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                          title="Preview Link"
                        >
                          <i className="fas fa-external-link-alt"></i>
                        </a>
                        <button 
                          onClick={() => onDelete(app.id)}
                          className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                          title="Delete App"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
