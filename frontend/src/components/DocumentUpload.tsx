import React, { useState } from 'react';
import { Upload, File, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import type { AnalysisData } from '../App';

interface DocumentUploadProps {
  onAnalysisCreated: (analysis: AnalysisData) => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onAnalysisCreated }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [companyName, setCompanyName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      file
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const startAnalysis = async () => {
    if (!companyName.trim() || files.length === 0) return;

    setIsProcessing(true);

    // Simulate processing time
    const analysisId = Math.random().toString(36).substring(7);
    const newAnalysis: AnalysisData = {
      id: analysisId,
      companyName: companyName.trim(),
      documents: files.map(f => f.name),
      status: 'processing',
      progress: 0,
      insights: {
        financial: null,
        market: null,
        team: null,
        risk: null
      },
      benchmarking: null,
      report: null,
      uploadedAt: new Date()
    };

    onAnalysisCreated(newAnalysis);

    // Simulate progress updates
    const progressSteps = [
      { progress: 20, message: 'Extracting document content...' },
      { progress: 45, message: 'Analyzing financial data...' },
      { progress: 65, message: 'Benchmarking against peers...' },
      { progress: 85, message: 'Generating risk assessment...' },
      { progress: 100, message: 'Analysis complete!' }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // This would normally update the analysis in the parent component
    }

    // Reset form
    setFiles([]);
    setCompanyName('');
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Upload Startup Documents
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Upload pitch decks, financial reports, transcripts, and other materials. 
          Our AI will analyze everything to provide comprehensive investment insights.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Company Name Input */}
        <div className="p-8 border-b border-slate-200">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Company Name *
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter the startup's name"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            disabled={isProcessing}
          />
        </div>

        {/* File Upload Area */}
        <div className="p-8">
          <label className="block text-sm font-semibold text-slate-900 mb-4">
            Documents *
          </label>
          
          <div
            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-slate-300 hover:border-slate-400 bg-slate-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Drop files here or click to browse
              </h3>
              <p className="text-slate-600 mb-6">
                Supports PDF, PPT, DOCX, TXT, and more
              </p>
              
              <input
                type="file"
                multiple
                onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
                accept=".pdf,.ppt,.pptx,.doc,.docx,.txt,.json,.csv"
              />
              
              <button
                type="button"
                disabled={isProcessing}
                className="bg-white border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="font-semibold text-slate-900 mb-4">
                Uploaded Files ({files.length})
              </h4>
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{file.name}</p>
                        <p className="text-sm text-slate-600">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFile(file.id)}
                      disabled={isProcessing}
                      className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Types */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl">
            <h4 className="font-semibold text-slate-900 mb-4">AI Analysis Includes:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700">Financial Analysis & Metrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700">Market Opportunity Assessment</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700">Team & Leadership Evaluation</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700">Risk Detection & Red Flags</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700">Competitive Benchmarking</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-slate-700">Investment Recommendation</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center space-x-2 text-slate-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Analysis typically takes 2-3 minutes</span>
            </div>

            <button
              onClick={startAnalysis}
              disabled={!companyName.trim() || files.length === 0 || isProcessing}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Starting Analysis...</span>
                </>
              ) : (
                <>
                  <span>Start AI Analysis</span>
                  <Upload className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;