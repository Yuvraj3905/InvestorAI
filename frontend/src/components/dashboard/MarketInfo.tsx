import { BarChart2, TrendingUp, PieChart } from 'lucide-react';

type MarketInfoProps = {
  market: {
    tam_usd: number | null;
    sam_usd: number | null;
    som_usd: number | null;
    competitors_count: number | null;
  };
};

export const MarketInfo = ({ market }: MarketInfoProps) => {
  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-600" />
          Market
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-gray-500">TAM</p>
              <p className="text-gray-700 font-medium">{formatCurrency(market.tam_usd)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50 text-green-600">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-gray-500">SAM</p>
              <p className="text-gray-700 font-medium">{formatCurrency(market.sam_usd)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm text-gray-500">SOM</p>
              <p className="text-gray-700 font-medium">{formatCurrency(market.som_usd)}</p>
            </div>
          </div>
        </div>
        
        {market.competitors_count !== null && (
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">Competitors</p>
            <p className="text-gray-700">{market.competitors_count} known competitors</p>
          </div>
        )}
      </div>
    </div>
  );
};
