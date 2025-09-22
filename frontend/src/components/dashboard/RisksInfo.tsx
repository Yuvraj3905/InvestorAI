import { AlertTriangle } from 'lucide-react';

type RisksInfoProps = {
  risks: {
    top_3_risks: string[];
  };
};

export const RisksInfo = ({ risks }: RisksInfoProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Key Risks
        </h2>
      </div>
      
      <div className="space-y-4">
        <ul className="space-y-3">
          {risks.top_3_risks.map((risk, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-yellow-50 text-yellow-600">
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700">{risk}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
