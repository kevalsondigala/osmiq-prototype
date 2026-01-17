import React, { useState, useEffect } from 'react';
import { generateSurpriseTest } from '../services/geminiService';
import { TestPaper } from '../types';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface SurpriseTestProps {
  onComplete: () => void;
}

const SurpriseTest: React.FC<SurpriseTestProps> = ({ onComplete }) => {
  const [test, setTest] = useState<TestPaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await generateSurpriseTest();
        setTest(data);
      } catch (e) {
        console.error("Failed to load test");
      } finally {
        setLoading(false);
      }
    };
    fetchTest();
  }, []);

  const handleOptionSelect = (qId: string, option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubjectiveChange = (qId: string, text: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: text }));
  };

  const handleSubmit = () => {
    if (!test) return;
    let calculatedScore = 0;
    
    // Simple grading for MCQs
    test.questions.forEach(q => {
      if (q.type === 'MCQ' && answers[q.id] === q.correctAnswer) {
        calculatedScore += q.marks;
      }
      // For subjective, we'll give full marks for now if not empty (mock logic)
      if (q.type === 'SUBJECTIVE' && answers[q.id]?.length > 10) {
        calculatedScore += q.marks;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin" />
        <p className="text-slate-500 dark:text-slate-400 text-lg">AI is generating your surprise test...</p>
        <p className="text-slate-400 dark:text-slate-500 text-sm">Analyzing notes and patterns</p>
      </div>
    );
  }

  if (!test) return <div className="text-center p-10 text-red-500 dark:text-red-400">Failed to load test. Please refresh.</div>;

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 max-w-2xl mx-auto rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 my-8">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Test Completed!</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-center">
          Great job staying consistent. Your dashboard is now unlocked for the week.
        </p>
        
        <div className="flex gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{score}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">Points Scored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{test.questions.length}</div>
            <div className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide">Questions</div>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 pb-20">
      <div className="mb-8 flex justify-between items-end border-b border-slate-200 dark:border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{test.title}</h1>
          <p className="text-slate-500 dark:text-slate-400">{test.subject} • {test.durationMinutes} mins</p>
        </div>
        <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
          Mandatory
        </div>
      </div>

      <div className="space-y-8">
        {test.questions.map((q, idx) => (
          <div key={q.id} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full font-bold text-sm">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-lg font-medium text-slate-900 dark:text-white mb-4">{q.text}</p>
                
                {q.type === 'MCQ' && q.options && (
                  <div className="space-y-3">
                    {q.options.map(opt => (
                      <label 
                        key={opt} 
                        className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${
                          answers[q.id] === opt 
                            ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={q.id} 
                          value={opt} 
                          checked={answers[q.id] === opt}
                          onChange={() => handleOptionSelect(q.id, opt)}
                          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-slate-700 dark:text-slate-200">{opt}</span>
                      </label>
                    ))}
                  </div>
                )}

                {q.type === 'SUBJECTIVE' && (
                  <textarea 
                    value={answers[q.id] || ''}
                    onChange={(e) => handleSubjectiveChange(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-32 p-4 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex justify-end items-center z-10">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-8 rounded-lg transition-colors shadow-lg shadow-indigo-200"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default SurpriseTest;
