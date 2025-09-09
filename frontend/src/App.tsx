import React, { useState } from 'react';
import { Upload, BarChart3, FileText, Zap, Shield, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import DocumentUpload from './components/DocumentUpload';
import AnalysisDashboard from './components/AnalysisDashboard';
import ReportViewer from './components/ReportViewer';
import LandingPage from './components/LandingPage';

export type AnalysisData = {
  id: string;
  companyName: string;
  documents: string[];
  status: 'processing' | 'completed' | 'error';
  progress: number;
  insights: {
    financial: any;
    market: any;
    team: any;
    risk: any;
  };
  benchmarking: any;
  report: any;
  uploadedAt: Date;
};

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'upload' | 'dashboard' | 'report'>('landing');
  const [analyses, setAnalyses] = useState<AnalysisData[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const handleNewAnalysis = (analysisData: AnalysisData) => {
    setAnalyses(prev => [analysisData, ...prev]);
    setCurrentView('dashboard');
  };

  const handleViewReport = (analysisId: string) => {
    setSelectedAnalysis(analysisId);
    setCurrentView('report');
  };

  const selectedAnalysisData = selectedAnalysis 
    ? analyses.find(a => a.id === selectedAnalysis) 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        analysesCount={analyses.length}
      />
      
      <main className="pt-20">
        {currentView === 'landing' && (
          <LandingPage onGetStarted={() => setCurrentView('upload')} />
        )}
        
        {currentView === 'upload' && (
          <DocumentUpload onAnalysisCreated={handleNewAnalysis} />
        )}
        
        {currentView === 'dashboard' && (
          <AnalysisDashboard 
            analyses={analyses} 
            onViewReport={handleViewReport}
            onUpdateAnalysis={(id, updates) => {
              setAnalyses(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
            }}
          />
        )}
        
        {currentView === 'report' && selectedAnalysisData && (
          <ReportViewer 
            analysis={selectedAnalysisData} 
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>
    </div>
  );
}

export default App;