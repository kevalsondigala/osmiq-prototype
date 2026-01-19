import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import SurpriseTest from './components/SurpriseTest';
import Performance from './components/Performance';
import KnowledgeHub from './components/KnowledgeHub';
import ProjectHelper from './components/ProjectHelper';
import PaperGenerator from './components/PaperGenerator';
import MockTest from './components/MockTest';
import Subscription from './components/Subscription';
import Profile from './components/Profile';
import { View } from './types';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [streak, setStreak] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTestCompletion = () => {
    setStreak(prev => prev + 1);
    setCurrentView(View.HOME);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Dashboard changeView={setCurrentView} streak={streak} />;
      case View.CHATBOT:
        return <Chatbot />;
      case View.SURPRISE_TEST:
        return <SurpriseTest onComplete={handleTestCompletion} />;
      case View.ANALYTICS:
        return <Performance />;
      case View.KNOWLEDGE_HUB:
        return <KnowledgeHub />;
      case View.PROJECT_HELPER:
        return <ProjectHelper />;
      case View.GENERATE_PAPERS:
        return <PaperGenerator />;
      case View.MOCK_TEST:
        return <MockTest />;
      case View.SUBSCRIPTION:
        return <Subscription />;
      case View.PROFILE:
        return <Profile />;
      case View.SETTINGS:
        return <div className="p-10 text-center text-slate-500 dark:text-slate-400">Settings Page (Coming Soon)</div>;
      default:
        return <Dashboard changeView={setCurrentView} streak={streak} />;
    }
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-200 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <main className="flex-1 h-screen overflow-y-auto relative no-scrollbar bg-[#f8fafc] dark:bg-slate-900 transition-colors duration-200">
        {renderView()}
      </main>
    </div>
  );
};

export default MainApp;
