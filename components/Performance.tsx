import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Download, TrendingUp, Target, Clock, Activity, AlertCircle } from 'lucide-react';

const Analytics: React.FC = () => {
  const usageTrendData = [
    { name: 'Week 1', activity: 40 },
    { name: 'Week 2', activity: 65 },
    { name: 'Week 3', activity: 50 },
    { name: 'Week 4', activity: 85 },
  ];

  const subjectPerformance = [
    { name: 'Physics', score: 85, fill: '#818cf8' }, // Indigo
    { name: 'Math', score: 62, fill: '#f472b6' },    // Pink
    { name: 'Chem', score: 78, fill: '#34d399' },    // Emerald
    { name: 'Eng', score: 90, fill: '#fbbf24' },     // Amber
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-24">
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
           <p className="text-slate-500 mt-1">Deep dive into your learning patterns.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-indigo-200">
           <Download size={18} /> Download Report
        </button>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between text-slate-500">
               <span className="text-xs font-semibold uppercase tracking-wider">Avg Time Spent</span>
               <Clock size={16} />
            </div>
            <div>
               <span className="text-3xl font-bold text-slate-900">4h 12m</span>
               <span className="text-xs text-emerald-500 font-medium ml-2">↑ 15% vs last week</span>
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between text-slate-500">
               <span className="text-xs font-semibold uppercase tracking-wider">Success Rate</span>
               <Target size={16} />
            </div>
            <div>
               <span className="text-3xl font-bold text-slate-900">82%</span>
               <span className="text-xs text-emerald-500 font-medium ml-2">Top 10%</span>
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between text-slate-500">
               <span className="text-xs font-semibold uppercase tracking-wider">Tests Taken</span>
               <Activity size={16} />
            </div>
            <div>
               <span className="text-3xl font-bold text-slate-900">14</span>
               <span className="text-xs text-slate-400 font-medium ml-2">This month</span>
            </div>
         </div>
         <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-32">
            <div className="flex justify-between text-slate-500">
               <span className="text-xs font-semibold uppercase tracking-wider">Next Milestone</span>
               <TrendingUp size={16} />
            </div>
            <div>
               <span className="text-xl font-bold text-slate-900">Scholar Badge</span>
               <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[80%]"></div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Usage Trend */}
        <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <h3 className="font-bold text-slate-800 mb-6">Usage Trend</h3>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={usageTrendData}>
                    <defs>
                       <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="activity" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Top Subjects */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <h3 className="font-bold text-slate-800 mb-6">Top Subjects</h3>
           <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={subjectPerformance} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: '#f8fafc' }} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
         {/* Recent Activity */}
         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-6">
               {[
                  { title: "Surprise Test - Biology", time: "2 hours ago", score: "8/10", type: "Test" },
                  { title: "Chat with AI - Physics Doubts", time: "Yesterday", score: null, type: "Chat" },
                  { title: "Generated Paper - Math", time: "Oct 22", score: null, type: "File" }
               ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'Test' ? 'bg-pink-100 text-pink-600' : 'bg-indigo-100 text-indigo-600'}`}>
                           {item.type === 'Test' ? <Activity size={18} /> : <Clock size={18} />}
                        </div>
                        <div>
                           <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
                           <p className="text-slate-400 text-xs">{item.time}</p>
                        </div>
                     </div>
                     {item.score && <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">{item.score}</span>}
                  </div>
               ))}
            </div>
         </div>

         {/* Focus Areas */}
         <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Focus Areas for Next Week</h3>
            <div className="space-y-4">
               <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-4">
                  <AlertCircle className="text-orange-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                     <h4 className="font-bold text-orange-900 text-sm">Calculus - Integration</h4>
                     <p className="text-orange-700/80 text-xs mt-1 leading-relaxed">Your accuracy dropped to 45% in the last mock. Review standard integrals.</p>
                  </div>
               </div>
               <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                  <AlertCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                     <h4 className="font-bold text-blue-900 text-sm">History - World War II</h4>
                     <p className="text-blue-700/80 text-xs mt-1 leading-relaxed">You haven't revisited this topic in 3 weeks. Spaced repetition recommended.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Analytics;