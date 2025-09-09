import React from 'react';
import { Upload, Brain, BarChart3, FileText, Zap, Shield, TrendingUp, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Powered by Google AI Technologies</span>
          </div>
          
          <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
            AI-Powered
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600"> Startup</span>
            <br />Analysis Platform
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Synthesize founder materials and public data to generate concise, actionable investment insights. 
            Analyze startups in minutes, not hours, with enterprise-grade AI intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <button 
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>Start Analysis</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="text-slate-600 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg border border-slate-200 hover:border-slate-300 hover:bg-white/50 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">2 min</div>
              <div className="text-slate-600">Average Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">94%</div>
              <div className="text-slate-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">10k+</div>
              <div className="text-slate-600">Startups Analyzed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Complete Investment Intelligence
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Leverage Google's advanced AI to transform how you evaluate startup opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Upload className="w-8 h-8" />}
              title="Smart Document Processing"
              description="Upload pitch decks, transcripts, and reports. Our AI extracts key insights automatically using Google Cloud Vision and Gemini Pro."
              gradient="from-blue-500 to-cyan-500"
            />
            
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="Multi-Agent Analysis"
              description="Specialized AI agents analyze financials, market opportunity, team strength, and competitive landscape simultaneously."
              gradient="from-emerald-500 to-teal-500"
            />
            
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8" />}
              title="Market Benchmarking"
              description="Compare startups against sector peers with real-time market data and performance metrics from BigQuery."
              gradient="from-amber-500 to-orange-500"
            />
            
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Risk Detection"
              description="Identify red flags and potential issues with advanced pattern recognition and anomaly detection algorithms."
              gradient="from-red-500 to-pink-500"
            />
            
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Growth Modeling"
              description="Assess scalability potential with sophisticated growth models and market opportunity analysis."
              gradient="from-purple-500 to-indigo-500"
            />
            
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Investment Memos"
              description="Generate professional, investor-ready reports with actionable recommendations and customizable insights."
              gradient="from-slate-600 to-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Built on Google Cloud AI
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Enterprise-grade architecture leveraging the latest in AI and cloud technology
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TechCard title="Gemini Pro" subtitle="Advanced reasoning & analysis" />
            <TechCard title="Vertex AI" subtitle="Custom ML models & pipelines" />
            <TechCard title="Cloud Vision" subtitle="Document OCR & extraction" />
            <TechCard title="BigQuery" subtitle="Data warehousing & analytics" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}> = ({ icon, title, description, gradient }) => {
  return (
    <div className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300">
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
};

const TechCard: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div className="text-center p-6 rounded-xl bg-white/80 border border-slate-200 hover:shadow-md transition-all duration-300">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-emerald-600 rounded"></div>
      </div>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{subtitle}</p>
    </div>
  );
};

export default LandingPage;