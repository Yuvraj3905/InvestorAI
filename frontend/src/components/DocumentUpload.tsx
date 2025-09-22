import React, { useState } from 'react';
import { Upload, File, X, Loader2, AlertCircle } from 'lucide-react';
import type { AnalysisData } from '../App';

const API_URL = 'https://startup2-gamma.vercel.app/analyze_file';

interface DocumentUploadProps {
  onAnalysisCreated: (analysis: AnalysisData) => void;
  onViewReport: (id: string) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onAnalysisCreated, onViewReport }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0 || !companyName.trim()) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', files[0].file); // Only process the first file for now
      formData.append('company_name', companyName.trim());

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        // Add progress tracking if needed
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to analyze document');
      }

      const result = await response.json();
      
      // Map the API response to your AnalysisData type
      const newAnalysis: AnalysisData = {
        id: `analysis-${Date.now()}`,
        companyName: companyName.trim(),
        documents: files.map(f => f.name),
        status: 'completed',
        progress: 100,
        insights: {
          financial: {
            // Map financial data from API response
            ...(result.financial_metrics || {})
          },
          market: {
            // Map market data from API response
            ...(result.market_analysis || {})
          },
          team: {
            // Map team data from API response
            ...(result.team_info || {})
          },
          risk: {
            // Map risk data from API response
            ...(result.risk_analysis || {})
          }
        },
        benchmarking: result.benchmarking || {},
        report: result.report || {},
        uploadedAt: new Date(),
        extracted: {
          summary: result.summary || '',
          startup: {
            name: companyName.trim(),
            ...(result.company_info || {})
          },
          team: result.team || { founders: [], team_size: 0 },
          traction: result.traction || {
            mrr_usd: null,
            arr_usd: null,
            growth_mom_pct: null,
            customers: 0,
            churn_pct: null,
            retention_pct: 0
          },
          unit_economics: result.unit_economics || {
            cac_usd: null,
            ltv_usd: null,
            gross_margin_pct: null,
            burn_rate_usd_per_month: null,
            runway_months: null
          },
          market: result.market || {
            tam_usd: null,
            sam_usd: null,
            som_usd: null,
            competitors_count: null
          },
          round: result.funding_round || {
            seeking_usd: null,
            pre_money_valuation_usd: null,
            existing_investors: []
          },
          risks: result.risks || {
            top_3_risks: []
          }
        },
        decision: result.decision || {
          score: 0,
          verdict: 'PASS',
          reasons: []
        }
      };
      
      onAnalysisCreated(newAnalysis);
      onViewReport(newAnalysis.id);
    } catch (error) {
      console.error('Error processing files:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Upload Documents</h2>
      
      <div className="mb-6">
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter company name"
          disabled={isProcessing}
          required
        />
      </div>

      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="text-gray-600">
            <span className="text-blue-600 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500">PDF files only (max. 10MB)</p>
        </div>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isProcessing}
          required
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h3 className="font-medium text-gray-700">Selected Files</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-gray-400" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(file.id);
                  }}
                  className="text-gray-400 hover:text-red-500"
                  disabled={isProcessing}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={files.length === 0 || !companyName.trim() || isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center space-x-2 ${
            files.length === 0 || !companyName.trim() || isProcessing
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
              Processing...
            </>
          ) : (
            'Analyze Documents'
          )}
        </button>
      </div>
      
      {/* Progress Bar */}
      {isProcessing && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Analyzing document... {progress}%</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
    </form>
  );
};

export default DocumentUpload;