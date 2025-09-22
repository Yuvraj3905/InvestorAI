import { Users, User, UsersIcon } from 'lucide-react';

type TeamInfoProps = {
  team: {
    founders: string[];
    team_size: number;
  };
};

export const TeamInfo = ({ team }: TeamInfoProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Team
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <UsersIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Team Size</p>
            <p className="text-gray-700">{team.team_size} employees</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-500">Founders</p>
            <div className="mt-1 space-y-1">
              {team.founders.map((founder, index) => (
                <p key={index} className="text-gray-700">{founder}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
