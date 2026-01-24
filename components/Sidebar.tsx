import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  Moon,
  Sun,
  Crown,
  LogOut
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
  const navigate = useNavigate();
  const { signOut, user } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };
  
  const menuItems = [
    { id: View.HOME, label: 'Home', icon: Home },
    { id: View.CHATBOT, label: 'AI Chatbot', icon: MessageSquareText },
    { id: View.SURPRISE_TEST, label: 'Surprise Test', icon: Zap },
    { id: View.GENERATE_PAPERS, label: 'Generate Papers', icon: FileText },
    { id: View.MOCK_TEST, label: 'Take Mock Test', icon: Target },
    { id: View.ANALYTICS, label: 'Analytics', icon: PieChart },
    { id: View.PROJECT_HELPER, label: 'Project Helper', icon: Lightbulb },
    { id: View.KNOWLEDGE_HUB, label: 'My Files', icon: FolderOpen },
    { id: View.SUBSCRIPTION, label: 'Subscription', icon: Crown },
  ];

  return (
    <div 
      className={`h-screen border-r flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} sticky top-0 left-0 z-50 shadow-sm ${isCollapsed ? 'overflow-visible' : ''}
        ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-slate-200'}
      `}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between h-16 mb-2">
        {!isCollapsed && (
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <img 
              src="/osmiq-logo.png" 
              alt="Osmiq Logo" 
              className="w-6 h-6 object-contain"
              onError={(e) => {
                // Fallback if image doesn't exist
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span>Osmiq</span>
          </div>
        )}
        {isCollapsed && (
           <div className="mx-auto text-indigo-600">
             <img 
               src="/osmiq-logo.png" 
               alt="Osmiq Logo" 
               className="w-6 h-6 object-contain"
               onError={(e) => {
                 // Fallback if image doesn't exist
                 (e.target as HTMLImageElement).style.display = 'none';
               }}
             />
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
      <nav className={`flex-1 overflow-y-auto py-2 px-3 space-y-1 no-scrollbar ${isCollapsed ? 'overflow-visible' : ''}`}>
        {menuItems.map((item) => {
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`
                w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group
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
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] shadow-xl transition-opacity duration-200">
                  {item.label}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Profile */}
      <div className={`p-4 border-t space-y-2 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative group ${
            isDarkMode 
              ? 'bg-slate-700/50 hover:bg-slate-700 text-slate-200' 
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
          }`}
        >
          {!isCollapsed && (
            <span className="text-sm font-medium">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
          {isDarkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-indigo-600" />
          )}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] shadow-xl transition-opacity duration-200">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800"></div>
            </div>
          )}
        </button>

        <button 
          onClick={() => setCurrentView(View.PROFILE)}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 p-2 rounded-lg transition-colors relative group ${isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-50'}`}
        >
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
             {user?.name 
               ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
               : user?.email 
                 ? user.email[0].toUpperCase()
                 : 'U'}
           </div>
           {!isCollapsed && (
             <div className="overflow-hidden">
               <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                 {user?.name || user?.email || 'User'}
               </p>
               <p className="text-xs text-slate-500 dark:text-slate-400 truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Student Plan</p>
             </div>
           )}
           
           {/* Tooltip for collapsed state */}
           {isCollapsed && (
             <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] shadow-xl transition-opacity duration-200">
               Profile
               <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800"></div>
             </div>
           )}
        </button>

        <button
          onClick={handleSignOut}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 relative group`}
        >
          <LogOut size={20} />
          {!isCollapsed && (
            <span className="text-sm font-medium">Sign out</span>
          )}
          
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-[100] shadow-xl transition-opacity duration-200">
              Sign out
              <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-800"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;