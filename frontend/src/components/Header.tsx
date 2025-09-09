import React from 'react';
import { Zap, BarChart3, Upload, FileText, Menu } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'landing' | 'upload' | 'dashboard' | 'report') => void;
  analysesCount: number;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, analysesCount }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-75 transition-opacity"
            onClick={() => onViewChange('landing')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">InvestorAI</h1>
              <p className="text-xs text-slate-600">Startup Analysis Platform</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onViewChange('upload')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'upload'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'dashboard'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
              {analysesCount > 0 && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {analysesCount}
                </span>
              )}
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-slate-900">Demo Account</p>
              <p className="text-xs text-slate-600">Venture Capital Fund</p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">VC</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;