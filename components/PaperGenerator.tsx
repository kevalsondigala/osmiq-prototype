import React from 'react';
import { FileText, Sliders, Download, Sparkles, UploadCloud, FileType } from 'lucide-react';

const PaperGenerator: React.FC = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Generate Question Papers</h1>
        <p className="text-slate-500 dark:text-slate-400">Create custom practice sets based on your syllabus and pattern.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Configuration Panel */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Sliders size={18} /> Configuration
            </h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Subject / Topic</label>
              <input type="text" className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="e.g. Organic Chemistry" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">Difficulty</label>
              <select className="w-full p-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
                <option>Expert</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Previous Papers (Optional)</label>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors">
                  <UploadCloud className="text-indigo-400 dark:text-indigo-500 mb-2" size={24} />
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Upload PDF/Doc</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">AI will analyze pattern</p>
              </div>
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 mt-2">
              <Sparkles size={16} /> Generate Paper
            </button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[500px] flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-700/50 rounded-t-2xl">
            <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Preview</span>
            <div className="flex gap-2">
              <button className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-2"><Download size={18} /></button>
            </div>
          </div>
          
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
              <FileType size={32} className="text-slate-300 dark:text-slate-500" />
            </div>
            <p className="font-medium">No paper generated yet.</p>
            <p className="text-sm mt-1">Configure settings and click Generate.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperGenerator;