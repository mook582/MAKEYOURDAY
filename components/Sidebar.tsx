
import React from 'react';
import { type View } from '../types';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

const NavItem: React.FC<{
  viewName: View;
  label: string;
  icon: React.ReactNode;
  currentView: View;
  onClick: (view: View) => void;
}> = ({ viewName, label, icon, currentView, onClick }) => {
  const isActive = currentView === viewName;
  return (
    <li
      className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? 'bg-brand-primary text-bg-primary' : 'hover:bg-bg-tertiary'
      }`}
      onClick={() => onClick(viewName)}
    >
      {icon}
      <span className="ml-4 font-medium">{label}</span>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  
  const iconProps = {
    className: "w-6 h-6",
    strokeWidth: 2
  };

  const icons = {
    dashboard: <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
    generator: <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>,
    trends: <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>,
    revenue: <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 10v1h4v-1m-4-15h-4v1h4V3zm0 18h-4v1h4v-1zM4 9h1v1H4V9zm0 6h1v1H4v-1zm16-6h1v1h-1V9zm0 6h1v1h-1v-1z"></path></svg>,
    planner: <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
  };

  const navItems: { viewName: View; label: string; icon: React.ReactNode }[] = [
    { viewName: 'dashboard', label: 'Dashboard', icon: icons.dashboard },
    { viewName: 'generator', label: 'Content Generator', icon: icons.generator },
    { viewName: 'trends', label: 'Trend Tracker', icon: icons.trends },
    { viewName: 'revenue', label: 'Revenue Estimator', icon: icons.revenue },
    { viewName: 'planner', label: 'Content Planner', icon: icons.planner },
  ];

  return (
    <aside className="w-64 bg-bg-secondary p-4 flex flex-col border-r border-border-color">
      <div className="flex items-center mb-8">
        <div className="bg-brand-primary p-2 rounded-lg">
          <svg className="w-8 h-8 text-bg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 className="text-xl font-bold ml-3">Monetize AI</h1>
      </div>
      <nav>
        <ul>
          {navItems.map(item => (
            <NavItem
              key={item.viewName}
              viewName={item.viewName}
              label={item.label}
              icon={item.icon}
              currentView={currentView}
              onClick={setCurrentView}
            />
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-3 bg-bg-tertiary rounded-lg">
          <p className="text-sm text-text-secondary">AI-Powered Creator Toolkit</p>
          <p className="text-xs text-text-secondary/70">v1.0.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
