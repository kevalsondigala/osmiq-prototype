import React, { useState } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const MockTest: React.FC = () => {
  // Placeholder for mock test UI - functionality similar to Surprise Test but user-initiated
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Mock Test Environment</h1>
          <p className="text-slate-500 text-lg">
            Simulate real exam conditions. No distractions, timed interface, instant feedback.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <span className="text-2xl mb-2 block">⏱️</span>
              <h3 className="font-bold">Timed</h3>
              <p className="text-xs text-slate-500">Strict time limits based on paper type.</p>
            </div>
             <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <span className="text-2xl mb-2 block">🤖</span>
              <h3 className="font-bold">AI Grading</h3>
              <p className="text-xs text-slate-500">Instant MCQ score + Subjective feedback.</p>
            </div>
             <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <span className="text-2xl mb-2 block">📊</span>
              <h3 className="font-bold">Analytics</h3>
              <p className="text-xs text-slate-500">Detailed performance breakdown.</p>
            </div>
          </div>

          <button 
            onClick={() => setStarted(true)}
            className="bg-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition-transform hover:scale-105"
          >
            Start New Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-slate-200 p-4 flex justify-between items-center bg-slate-50">
        <h2 className="font-bold text-slate-800">Full Syllabus Mock - Set A</h2>
        <div className="flex items-center gap-2 text-red-600 font-mono font-bold bg-red-50 px-3 py-1 rounded-lg">
          <Clock size={18} /> 00:59:42
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 flex items-center justify-center text-slate-400">
        <div className="text-center">
            <AlertTriangle className="mx-auto mb-4 w-12 h-12 text-amber-400" />
            <p>Mock Test Interface would load here with questions.</p>
            <button 
                onClick={() => setStarted(false)}
                className="mt-4 text-indigo-600 font-medium hover:underline"
            >
                Exit Test
            </button>
        </div>
      </div>
    </div>
  );
};

export default MockTest;
