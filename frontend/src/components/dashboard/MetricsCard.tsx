import { ReactNode } from 'react';

type MetricsCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  change: string | null;
  isPositive: boolean;
};

export const MetricsCard = ({ icon, title, value, change, isPositive }: MetricsCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className={`mt-3 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          <span className="font-medium">{change}</span> from last month
        </div>
      )}
    </div>
  );
};
