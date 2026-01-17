import React, { useState } from 'react';
import { generateProjectIdeas, generateProjectReport } from '../services/geminiService';
import { ProjectIdea, ProjectReport } from '../types';
import { 
  Lightbulb, 
  Loader2, 
  ChevronRight, 
  CheckCircle, 
  FileText, 
  Layers, 
  DollarSign, 
  Image as ImageIcon,
  ArrowLeft
} from 'lucide-react';

const ProjectHelper: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [report, setReport] = useState<ProjectReport | null>(null);

  const handleGenerateIdeas = async () => {
    if (!subject || !topic) return;
    setLoading(true);
    try {
      const result = await generateProjectIdeas(subject, topic);
      setIdeas(result);
      setStep(2);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectIdea = (idea: ProjectIdea) => {
    setSelectedIdea(idea);
    setStep(3);
  };

  const handleGenerateReport = async () => {
    if (!selectedIdea) return;
    setLoading(true);
    try {
      const result = await generateProjectReport(selectedIdea.title, selectedIdea.description);
      setReport(result);
      setStep(4);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Steps UI Indicators
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8 w-full max-w-2xl mx-auto">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
            {step > s ? <CheckCircle size={16} /> : s}
          </div>
          {s !== 4 && (
            <div className={`w-12 h-1 mx-2 rounded-full ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Project Helper</h1>
        <p className="text-slate-500 dark:text-slate-400">From idea to execution in 4 steps.</p>
      </div>

      <StepIndicator />

      {/* Step 1: Input */}
      {step === 1 && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
            <Layers className="text-indigo-600 dark:text-indigo-400" /> Topic & Subject
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
              <select 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
              >
                <option value="">Select a Subject</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="History">History</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Literature">Literature</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Broad Topic / Interest</label>
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Sustainable Energy, The Renaissance, AI in Health..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            <button 
              onClick={handleGenerateIdeas}
              disabled={!subject || !topic || loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Next Step <ChevronRight size={18} /></>}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Idea Selection */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Select an Idea</h2>
            <button onClick={() => setStep(1)} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"><ArrowLeft size={16} /> Back</button>
          </div>
          
          <div className="grid gap-4">
            {ideas.map((idea, idx) => (
              <div 
                key={idx} 
                onClick={() => handleSelectIdea(idea)}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-600 hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400">{idea.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">{idea.description}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Execution Plan Preview (Transition) */}
      {step === 3 && (
        <div className="max-w-3xl mx-auto">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Execution Plan</h2>
            <button onClick={() => setStep(2)} className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"><ArrowLeft size={16} /> Back</button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
             <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">{selectedIdea?.title}</h3>
             
             <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl mb-6">
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">Preliminary Outline</h4>
                <ul className="list-disc list-inside text-indigo-800/80 dark:text-indigo-300/80 text-sm space-y-1">
                   {selectedIdea?.steps.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
             </div>

             <button 
                onClick={handleGenerateReport}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
             >
                {loading ? (
                   <><Loader2 className="animate-spin" /> Generating Full Report & Costing...</>
                ) : (
                   <><FileText size={18} /> Generate Detailed Report Draft</>
                )}
             </button>
          </div>
        </div>
      )}

      {/* Step 4: Final Report */}
      {step === 4 && report && (
        <div className="max-w-4xl mx-auto">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Project Report Draft</h2>
            <div className="flex gap-2">
               <button onClick={() => setStep(1)} className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50">New Project</button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
             <div className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Process Description</h3>
                   <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">{report.processDescription}</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-100 dark:border-slate-700 pb-2">Step-by-Step Execution</h3>
                   <div className="space-y-4">
                      {report.executionSteps.map((step, i) => (
                         <div key={i} className="flex gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">{i+1}</span>
                            <p className="text-slate-600 dark:text-slate-300 text-sm">{step}</p>
                         </div>
                      ))}
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2"><DollarSign size={18} className="text-green-600 dark:text-green-400" /> Estimated Cost</h3>
                   <div className="text-3xl font-bold text-green-600 dark:text-green-400">{report.estimatedCost}</div>
                   <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Approximate market rates</p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                   <h3 className="font-bold text-slate-900 dark:text-white mb-4">Required Materials</h3>
                   <ul className="space-y-2">
                      {report.materials.map((m, i) => (
                         <li key={i} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 mt-1.5"></span> {m}
                         </li>
                      ))}
                   </ul>
                </div>

                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl text-white shadow-lg">
                   <h3 className="font-bold mb-2 flex items-center gap-2"><ImageIcon size={18} /> AI Infographic</h3>
                   <p className="text-indigo-100 text-xs mb-4">Generate a visual summary of this project flow.</p>
                   <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 rounded-lg text-sm font-semibold transition-colors">
                      Generate Visual
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectHelper;