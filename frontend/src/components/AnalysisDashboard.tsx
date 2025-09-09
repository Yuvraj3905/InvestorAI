import React, { useEffect } from 'react';
import { FileText, TrendingUp, AlertTriangle, Clock, CheckCircle, Eye } from 'lucide-react';
import type { AnalysisData } from '../App';

interface AnalysisDashboardProps {
  analyses: AnalysisData[];
  onViewReport: (analysisId: string) => void;
  onUpdateAnalysis: (id: string, updates: Partial<AnalysisData>) => void;
}

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ 
  analyses, 
  onViewReport,
  onUpdateAnalysis 
}) => {
  // Simulate progressive analysis updates
  useEffect(() => {
    const processingAnalyses = analyses.filter(a => a.status === 'processing');
    
    processingAnalyses.forEach(analysis => {
      const interval = setInterval(() => {
        const newProgress = Math.min(analysis.progress + 20, 100);
        
        if (newProgress >= 100) {
          // Complete the analysis with mock data
          onUpdateAnalysis(analysis.id, {
            status: 'completed',
            progress: 100,
            insights: generateMockInsights(analysis.companyName),
            benchmarking: generateMockBenchmarking(),
            report: generateMockReport(analysis.companyName)
          });
          clearInterval(interval);
        } else {
          onUpdateAnalysis(analysis.id, { progress: newProgress });
        }
      }, 1500);

      return () => clearInterval(interval);
    });
  }, [analyses, onUpdateAnalysis]);

  const completedAnalyses = analyses.filter(a => a.status === 'completed').length;
  const processingAnalyses = analyses.filter(a => a.status === 'processing').length;

  if (analyses.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
          <FileText className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">No Analyses Yet</h2>
        <p className="text-slate-600 mb-8 max-w-lg mx-auto">
          Upload your first startup documents to begin AI-powered analysis and generate investment insights.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Analysis Dashboard</h2>
        <p className="text-lg text-slate-600">
          Track your startup analyses and access comprehensive investment reports.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard
          title="Total Analyses"
          value={analyses.length.toString()}
          subtitle="Startups evaluated"
          icon={<FileText className="w-6 h-6" />}
          gradient="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Completed"
          value={completedAnalyses.toString()}
          subtitle="Ready for review"
          icon={<CheckCircle className="w-6 h-6" />}
          gradient="from-emerald-500 to-teal-500"
        />
        <StatCard
          title="Processing"
          value={processingAnalyses.toString()}
          subtitle="Currently analyzing"
          icon={<Clock className="w-6 h-6" />}
          gradient="from-amber-500 to-orange-500"
        />
      </div>

      {/* Analysis List */}
      <div className="space-y-6">
        {analyses.map((analysis) => (
          <AnalysisCard
            key={analysis.id}
            analysis={analysis}
            onViewReport={onViewReport}
          />
        ))}
      </div>
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
}> = ({ title, value, subtitle, icon, gradient }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-1">{title}</div>
      <div className="text-xs text-slate-500">{subtitle}</div>
    </div>
  );
};

const AnalysisCard: React.FC<{
  analysis: AnalysisData;
  onViewReport: (id: string) => void;
}> = ({ analysis, onViewReport }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100';
      case 'processing': return 'text-amber-600 bg-amber-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{analysis.companyName}</h3>
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <span>{analysis.documents.length} documents</span>
              <span>•</span>
              <span>{new Date(analysis.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(analysis.status)}`}>
            {getStatusIcon(analysis.status)}
            <span className="capitalize">{analysis.status}</span>
          </div>
        </div>

        {analysis.status === 'processing' && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Analysis Progress</span>
              <span>{analysis.progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis.progress}%` }}
              />
            </div>
          </div>
        )}

        {analysis.status === 'completed' && analysis.insights && (
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InsightMetric
                label="Financial Score"
                value="8.2/10"
                trend="positive"
              />
              <InsightMetric
                label="Market Size"
                value="$2.4B"
                trend="positive"
              />
              <InsightMetric
                label="Risk Level"
                value="Medium"
                trend="neutral"
              />
              <InsightMetric
                label="Growth Rate"
                value="127% YoY"
                trend="positive"
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {analysis.documents.slice(0, 3).map((doc, index) => (
              <div
                key={index}
                className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg"
              >
                {doc.length > 20 ? `${doc.substring(0, 20)}...` : doc}
              </div>
            ))}
            {analysis.documents.length > 3 && (
              <div className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg">
                +{analysis.documents.length - 3} more
              </div>
            )}
          </div>

          {analysis.status === 'completed' && (
            <button
              onClick={() => onViewReport(analysis.id)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-md transition-shadow"
            >
              <Eye className="w-4 h-4" />
              <span>View Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const InsightMetric: React.FC<{
  label: string;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
}> = ({ label, value, trend }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive': return 'text-emerald-600';
      case 'negative': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${getTrendColor(trend)}`}>{value}</div>
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
};

// Mock data generators
const generateMockInsights = (companyName: string) => ({
  financial: {
    revenue: '$1.2M ARR',
    growth: '127% YoY',
    burnRate: '$45K/month',
    runway: '18 months'
  },
  market: {
    size: '$2.4B TAM',
    competition: 'Moderate',
    timing: 'Excellent'
  },
  team: {
    experience: 'Strong',
    domain: 'Expert',
    execution: 'Proven'
  },
  risk: {
    level: 'Medium',
    factors: ['Market timing', 'Scaling challenges']
  }
});

const generateMockBenchmarking = () => ({
  sector: 'SaaS',
  percentile: '75th',
  similar: ['Company A', 'Company B', 'Company C']
});

const generateMockReport = (companyName: string) => ({
  summary: `${companyName} demonstrates strong fundamentals with exceptional growth potential in a large addressable market.`,
  recommendation: 'Strong Consider',
  score: 8.2
});

export default AnalysisDashboard;