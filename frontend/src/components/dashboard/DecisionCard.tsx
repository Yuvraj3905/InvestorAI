import { AlertCircle, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

type DecisionCardProps = {
  decision: {
    score: number;
    verdict: string;
    reasons: string[];
  };
};

export const DecisionCard = ({ decision }: DecisionCardProps) => {
  const { score, verdict, reasons } = decision;
  
  const getVerdictStyles = () => {
    switch(verdict) {
      case 'INVEST':
        return 'bg-green-50 border-green-200';
      case 'PASS':
        return 'bg-yellow-50 border-yellow-200';
      case 'DEFER':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };
  
  const getVerdictIcon = () => {
    switch(verdict) {
      case 'INVEST':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'PASS':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'DEFER':
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };
  
  const getVerdictText = () => {
    switch(verdict) {
      case 'INVEST':
        return 'Recommended Investment';
      case 'PASS':
        return 'Not Recommended';
      case 'DEFER':
      default:
        return 'Consider for Future';
    }
  };

  // Calculate score percentage for the radial progress
  const scorePercentage = (score / 100) * 100;
  const strokeDashArray = 2 * Math.PI * 36; // 36 is the radius of the circle
  const strokeDashOffset = strokeDashArray * ((100 - scorePercentage) / 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border-2 ${getVerdictStyles()} p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-opacity-20 bg-white">
              {getVerdictIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{getVerdictText()}</h3>
              <div className="text-sm text-gray-600">
                Investment Recommendation
              </div>
            </div>
          </div>
          
          {reasons.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Key Decision Factors
              </h4>
              <ul className="space-y-2">
                {reasons.map((reason, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-white hover:bg-opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-auto flex justify-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke={verdict === 'INVEST' ? '#10b981' : verdict === 'PASS' ? '#f59e0b' : '#3b82f6'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={strokeDashArray}
                strokeDashoffset={strokeDashOffset}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{score}</span>
              <span className="text-xs text-gray-500">out of 100</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
