import React from 'react';
import { View } from '../types';
import { 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Zap,
  BookOpen,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  changeView: (view: View) => void;
  streak: number;
}

const Dashboard: React.FC<DashboardProps> = ({ changeView, streak }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Home</h1>
          <p className="text-slate-500 mt-1">Good Morning, Anastasia! Ready to learn something new?</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm text-sm font-medium text-slate-600 flex items-center gap-2 hover:bg-slate-50">
             <Calendar size={16} /> Today, Oct 24
           </button>
        </div>
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Usage This Month - Tone on Tone: Pink */}
        <div className="md:col-span-2 bg-pink-50 border border-pink-100 p-6 rounded-3xl flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
             <div>
               <h3 className="text-lg font-bold text-pink-900">Usage This Month</h3>
               <p className="text-pink-700/70 text-sm mt-1">You've been incredibly productive!</p>
             </div>
             <div className="p-2 bg-pink-100 rounded-lg text-pink-600">
               <Zap size={20} />
             </div>
          </div>
          
          <div>
            <div className="flex justify-between text-xs font-semibold text-pink-800 mb-2 uppercase tracking-wide">
               <span>Features Used</span>
               <span>Top 5% of Students</span>
            </div>
            {/* Horizontal Bar */}
            <div className="flex h-4 w-full rounded-full overflow-hidden bg-pink-200/50">
               <div className="w-[40%] bg-pink-400"></div> {/* Chat */}
               <div className="w-[30%] bg-pink-500"></div> {/* Tests */}
               <div className="w-[20%] bg-pink-600"></div> {/* Project */}
               <div className="w-[10%] bg-pink-300"></div> {/* Other */}
            </div>
             <div className="flex gap-4 mt-3 text-xs text-pink-700">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-400"></div> Chatbot</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div> Tests</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-600"></div> Projects</span>
             </div>
          </div>
        </div>

        {/* Avg Time & Focus - Tone on Tone: Green */}
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex flex-col justify-between">
           <div>
             <h3 className="text-lg font-bold text-emerald-900 mb-1">Study Focus</h3>
             <p className="text-emerald-700/70 text-sm">Suggested daily goal</p>
           </div>
           
           <div className="flex items-end gap-2 mt-4">
              <span className="text-4xl font-bold text-emerald-800">4.2</span>
              <span className="text-emerald-600 font-medium mb-1">hrs/day</span>
           </div>

           <div className="mt-6 p-4 bg-white/60 rounded-2xl border border-emerald-100/50">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <BookOpen size={18} />
                 </div>
                 <div>
                    <div className="text-xs text-emerald-600 font-semibold uppercase">Focus Subject</div>
                    <div className="font-bold text-emerald-900">Organic Chemistry</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Feature Access Cards - Clean, modern look */}
      <h2 className="text-xl font-bold text-slate-800 mt-8">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* Card 1: Tone Blue */}
         <div onClick={() => changeView(View.PROJECT_HELPER)} className="group bg-blue-50 border border-blue-100 p-6 rounded-3xl cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-8">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <TrendingUp size={24} />
               </div>
               <div className="p-2 bg-white rounded-full text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} />
               </div>
            </div>
            <h3 className="text-xl font-bold text-blue-900 mb-1">Project Helper</h3>
            <p className="text-blue-700/70 text-sm">Draft reports & generate ideas.</p>
         </div>

         {/* Card 2: Tone Purple */}
         <div onClick={() => changeView(View.CHATBOT)} className="group bg-violet-50 border border-violet-100 p-6 rounded-3xl cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-8">
               <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Zap size={24} />
               </div>
               <div className="p-2 bg-white rounded-full text-violet-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} />
               </div>
            </div>
            <h3 className="text-xl font-bold text-violet-900 mb-1">AI Assistant</h3>
            <p className="text-violet-700/70 text-sm">Clear your doubts instantly.</p>
         </div>

         {/* Card 3: Tone Orange */}
         <div onClick={() => changeView(View.ANALYTICS)} className="group bg-orange-50 border border-orange-100 p-6 rounded-3xl cursor-pointer transition-all hover:shadow-md hover:scale-[1.02]">
            <div className="flex justify-between items-start mb-8">
               <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Clock size={24} />
               </div>
               <div className="p-2 bg-white rounded-full text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} />
               </div>
            </div>
            <h3 className="text-xl font-bold text-orange-900 mb-1">Analytics</h3>
            <p className="text-orange-700/70 text-sm">Check your progress report.</p>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;