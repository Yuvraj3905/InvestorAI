import { Building2, Globe, Calendar, MapPin } from 'lucide-react';

type CompanyInfoProps = {
  startup: {
    name: string;
    website: string;
    sector: string;
    subsector: string;
    hq_country: string;
    founded_year: number;
  };
  summary: string;
};

export const CompanyInfo = ({ startup, summary }: CompanyInfoProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-600" />
          Company Overview
        </h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{startup.name}</h3>
          <p className="text-gray-600">{startup.sector}</p>
        </div>
        
        <p className="text-gray-700">{summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Website</p>
              <a 
                href={`https://${startup.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {startup.website}
              </a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Headquarters</p>
              <p className="text-gray-700">{startup.hq_country}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Founded</p>
              <p className="text-gray-700">{startup.founded_year}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Services</p>
              <p className="text-gray-700 line-clamp-2" title={startup.subsector}>
                {startup.subsector}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
