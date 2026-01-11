import React from 'react';
import { View } from '../types';
import { 
  Home, 
  MessageSquareText, 
  Zap, 
  FileText, 
  Target, 
  PieChart, 
  Lightbulb, 
  FolderOpen, 
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Moon,
  Sun,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  isCollapsed, 
  toggleCollapse,
  isDarkMode,
  toggleTheme
}) => {
  
  const menuItems = [
    { id: View.HOME, label: 'Home', icon: Home },
    { id: View.CHATBOT, label: 'AI Chatbot', icon: MessageSquareText },
    { id: View.SURPRISE_TEST, label: 'Surprise Test', icon: Zap },
    { id: View.GENERATE_PAPERS, label: 'Generate Papers', icon: FileText },
    { id: View.MOCK_TEST, label: 'Take Mock Test', icon: Target },
    { id: View.ANALYTICS, label: 'Analytics', icon: PieChart },
    { id: View.PROJECT_HELPER, label: 'Project Helper', icon: Lightbulb },
    { id: View.KNOWLEDGE_HUB, label: 'My Files', icon: FolderOpen },
    { id: View.SUBSCRIPTION, label: 'Subscription', icon: CreditCard },
  ];

  return (
    <div 
      className={`h-screen border-r flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} sticky top-0 left-0 z-50 shadow-sm
        ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between h-16 mb-2">
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <GraduationCap className="w-6 h-6" />
            <span>Osmiq</span>
          </div>
        )}
        {isCollapsed && (
           <div className="mx-auto text-indigo-600">
             <GraduationCap className="w-6 h-6" />
           </div>
        )}
        
        <button 
          onClick={toggleCollapse}
          className={`p-1.5 rounded-md absolute -right-3 top-6 border shadow-sm z-50 transition-colors
            ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-100'}
          `}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1 no-scrollbar">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 font-medium dark:bg-indigo-900/30 dark:text-indigo-400' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200'
                }
              `}
            >
              <item.icon size={20} className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-500'} />
              
              {!isCollapsed && (
                <span className="text-sm">
                  {item.label}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Profile */}
      <div className={`p-4 border-t space-y-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-2 rounded-lg ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          {!isCollapsed && <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>}
           {/* Visual Toggle */}
           <div 
             onClick={toggleTheme}
             className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-300'}`}
           >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${isDarkMode ? 'left-5.5' : 'left-0.5'}`}></div>
           </div>
        </div>

        <button 
          onClick={() => setCurrentView(View.SUBSCRIPTION)}
          className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}
        >
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
             AN
           </div>
           {!isCollapsed && (
             <div className="overflow-hidden">
               <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>Anastasia</p>
               <p className="text-xs text-slate-500 truncate hover:text-indigo-600 transition-colors">Student Plan</p>
             </div>
           )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;