import React from 'react';
import { ArrowLeft, Download, TrendingUp, AlertTriangle, Users, DollarSign, Target, Shield, Star, Calendar } from 'lucide-react';
import type { AnalysisData } from '../App';

interface ReportViewerProps {
  analysis: AnalysisData;
  onBack: () => void;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ analysis, onBack }) => {
  const handleExport = () => {
    // In a real app, this would generate and download a PDF report
    console.log('Exporting report for', analysis.companyName);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow"
        >
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Title Section */}
        <div className="border-b border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Investment Analysis Report
              </h1>
              <h2 className="text-2xl text-slate-700">{analysis.companyName}</h2>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-amber-500" />
                <span className="text-2xl font-bold text-slate-900">8.2/10</span>
              </div>
              <div className="text-sm text-slate-600">Investment Score</div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(analysis.uploadedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>{analysis.documents.length} documents analyzed</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-8 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Executive Summary</h3>
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl">
            <p className="text-slate-700 leading-relaxed mb-4">
              {analysis.companyName} demonstrates strong fundamentals with exceptional growth potential 
              in a large and expanding market. The founding team brings deep domain expertise and has 
              shown consistent execution against ambitious milestones.
            </p>
            <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
              <TrendingUp className="w-5 h-5" />
              <span>Recommendation: Strong Consider for Investment</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="p-8 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              icon={<DollarSign className="w-6 h-6" />}
              title="ARR"
              value="$1.2M"
              subtitle="127% YoY Growth"
              trend="positive"
              gradient="from-emerald-500 to-teal-500"
            />
            <MetricCard
              icon={<Target className="w-6 h-6" />}
              title="Market Size"
              value="$2.4B"
              subtitle="TAM Addressable"
              trend="positive"
              gradient="from-blue-500 to-cyan-500"
            />
            <MetricCard
              icon={<Users className="w-6 h-6" />}
              title="Team Score"
              value="9.1/10"
              subtitle="Exceptional"
              trend="positive"
              gradient="from-purple-500 to-indigo-500"
            />
            <MetricCard
              icon={<Shield className="w-6 h-6" />}
              title="Risk Level"
              value="Medium"
              subtitle="Manageable"
              trend="neutral"
              gradient="from-amber-500 to-orange-500"
            />
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Financial Analysis */}
            <AnalysisSection
              title="Financial Analysis"
              icon={<DollarSign className="w-5 h-5" />}
              items={[
                { label: 'Annual Recurring Revenue', value: '$1.2M', trend: 'positive' },
                { label: 'Growth Rate (YoY)', value: '127%', trend: 'positive' },
                { label: 'Monthly Burn Rate', value: '$45K', trend: 'neutral' },
                { label: 'Runway', value: '18 months', trend: 'neutral' },
                { label: 'Unit Economics', value: 'Positive', trend: 'positive' }
              ]}
            />

            {/* Market Analysis */}
            <AnalysisSection
              title="Market Opportunity"
              icon={<Target className="w-5 h-5" />}
              items={[
                { label: 'Total Addressable Market', value: '$2.4B', trend: 'positive' },
                { label: 'Market Growth Rate', value: '23% CAGR', trend: 'positive' },
                { label: 'Competition Level', value: 'Moderate', trend: 'neutral' },
                { label: 'Market Timing', value: 'Excellent', trend: 'positive' },
                { label: 'Differentiation', value: 'Strong', trend: 'positive' }
              ]}
            />

            {/* Team Analysis */}
            <AnalysisSection
              title="Team & Leadership"
              icon={<Users className="w-5 h-5" />}
              items={[
                { label: 'Domain Expertise', value: 'Expert Level', trend: 'positive' },
                { label: 'Prior Experience', value: 'Strong Track Record', trend: 'positive' },
                { label: 'Execution Ability', value: 'Proven', trend: 'positive' },
                { label: 'Team Completeness', value: '85%', trend: 'positive' },
                { label: 'Cultural Fit', value: 'Excellent', trend: 'positive' }
              ]}
            />

            {/* Risk Assessment */}
            <AnalysisSection
              title="Risk Assessment"
              icon={<AlertTriangle className="w-5 h-5" />}
              items={[
                { label: 'Market Risk', value: 'Low', trend: 'positive' },
                { label: 'Execution Risk', value: 'Medium', trend: 'neutral' },
                { label: 'Competitive Risk', value: 'Medium', trend: 'neutral' },
                { label: 'Technology Risk', value: 'Low', trend: 'positive' },
                { label: 'Regulatory Risk', value: 'Low', trend: 'positive' }
              ]}
            />
          </div>
        </div>

        {/* Investment Recommendation */}
        <div className="p-8 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Investment Recommendation</h3>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-semibold text-emerald-700">STRONG CONSIDER</span>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              {analysis.companyName} represents a compelling investment opportunity with strong 
              fundamentals, exceptional team, and significant market potential. The company has 
              demonstrated consistent growth and effective capital deployment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-900">Suggested Valuation Range:</span>
                <div className="text-slate-600">$8M - $12M</div>
              </div>
              <div>
                <span className="font-medium text-slate-900">Investment Timeline:</span>
                <div className="text-slate-600">2-4 weeks</div>
              </div>
              <div>
                <span className="font-medium text-slate-900">Due Diligence Priority:</span>
                <div className="text-slate-600">High</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  trend: 'positive' | 'negative' | 'neutral';
  gradient: string;
}> = ({ icon, title, value, subtitle, trend, gradient }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive': return 'text-emerald-600';
      case 'negative': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white`}>
          {icon}
        </div>
      </div>
      <div className="text-lg font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-1">{title}</div>
      <div className={`text-xs font-medium ${getTrendColor(trend)}`}>{subtitle}</div>
    </div>
  );
};

const AnalysisSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  items: Array<{
    label: string;
    value: string;
    trend: 'positive' | 'negative' | 'neutral';
  }>;
}> = ({ title, icon, items }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'positive': return 'text-emerald-600';
      case 'negative': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
          {icon}
        </div>
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-slate-600">{item.label}</span>
            <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportViewer;