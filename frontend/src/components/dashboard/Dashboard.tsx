import {
  Users,
  TrendingUp,
  ArrowLeft,
  Download,
  AlertTriangle,
  Target,
  Shield,
  Star,
  Calendar,
  DollarSign,
} from "lucide-react";
import { AnalysisData } from "../../types/dashboard";

type DashboardProps = {
  data: AnalysisData;
  onBack?: () => void;
};

const MetricCard = ({
  icon,
  title,
  value,
  subtitle,
  trend = "neutral",
  gradient = "from-blue-500 to-cyan-500",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  trend?: "positive" | "negative" | "neutral";
  gradient?: string;
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div
          className={`p-2 rounded-lg bg-gradient-to-r ${gradient} text-white`}
        >
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium text-slate-500">{title}</h4>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {trend !== "neutral" && (
        <div
          className={`p-1 rounded-full ${
            trend === "positive"
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {trend === "positive" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingUp className="w-4 h-4 transform rotate-180" />
          )}
        </div>
      )}
    </div>
  </div>
);

const AnalysisSection = ({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: {
    label: string;
    value: string;
    trend?: "positive" | "negative" | "neutral";
  }[];
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <div className="flex items-center space-x-2 mb-4">
      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
        >
          <span className="text-sm text-slate-600">{item.label}</span>
          <div className="flex items-center space-x-2">
            <span className="font-medium text-slate-900">{item.value}</span>
            {item.trend && item.trend !== "neutral" && (
              <span
                className={`p-0.5 rounded ${
                  item.trend === "positive"
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.trend === "positive" ? (
                  <TrendingUp className="w-3.5 h-3.5" />
                ) : (
                  <TrendingUp className="w-3.5 h-3.5 transform rotate-180" />
                )}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CompanyInfo = ({
  companyName,
  website,
  sector,
  stage,
  hqCountry,
  foundedYear,
}: {
  companyName: string;
  website: string;
  sector: string;
  stage: string;
  hqCountry: string;
  foundedYear: string;
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">Company Information</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Company Name</span>
        <span className="font-medium text-slate-900">{companyName}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Website</span>
        <span className="font-medium text-slate-900">{website}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Sector</span>
        <span className="font-medium text-slate-900">{sector}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Stage</span>
        <span className="font-medium text-slate-900">{stage}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">HQ Country</span>
        <span className="font-medium text-slate-900">{hqCountry}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Founded Year</span>
        <span className="font-medium text-slate-900">{foundedYear}</span>
      </div>
    </div>
  </div>
);

const DecisionCard = ({ decision }: { decision: any }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">Decision</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Verdict</span>
        <span className="font-medium text-slate-900">{decision.verdict}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Score</span>
        <span className="font-medium text-slate-900">{decision.score}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Reasons</span>
        <span className="font-medium text-slate-900">
          {decision.reasons.join(", ")}
        </span>
      </div>
    </div>
  </div>
);

const TeamInfo = ({ founders, teamSize }: { founders: any[]; teamSize: number }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">Team Information</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Founders</span>
        <span className="font-medium text-slate-900">
          {founders.map((founder) => founder.name).join(", ")}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Team Size</span>
        <span className="font-medium text-slate-900">{teamSize}</span>
      </div>
    </div>
  </div>
);

const MarketInfo = ({
  tam,
  sam,
  som,
  competitorsCount,
}: {
  tam: number;
  sam: number;
  som: number;
  competitorsCount: number;
}) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">Market Information</h3>
    <div className="space-y-3">
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">TAM</span>
        <span className="font-medium text-slate-900">{tam}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">SAM</span>
        <span className="font-medium text-slate-900">{sam}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">SOM</span>
        <span className="font-medium text-slate-900">{som}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-slate-100">
        <span className="text-sm text-slate-600">Competitors Count</span>
        <span className="font-medium text-slate-900">{competitorsCount}</span>
      </div>
    </div>
  </div>
);

const RisksInfo = ({ risks }: { risks: string[] }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-900">Risks Information</h3>
    <div className="space-y-3">
      {risks.map((risk, index) => (
        <div key={index} className="flex items-center justify-between py-2 border-b border-slate-100">
          <span className="text-sm text-slate-600">Risk {index + 1}</span>
          <span className="font-medium text-slate-900">{risk}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Dashboard = ({ data, onBack }: DashboardProps) => {
  const { extracted, decision } = data;
  const { startup, team, traction, market, risks } = extracted;
  const { financial } = data.insights;

  const calculateScore = () => {
    // Simple scoring logic based on available data
    let score = 0;
    if (traction.retention_pct > 90) score += 2;
    if (team.team_size > 5) score += 1;
    if (market.tam_usd && market.tam_usd > 1000000000) score += 2;
    if (financial?.revenue_growth && financial.revenue_growth > 0.5) score += 2;
    if (risks.top_3_risks && risks.top_3_risks.length < 2) score += 1;
    return Math.min(10, Math.max(0, score));
  };

  const score = calculateScore();
  const scoreColor =
    score >= 7
      ? "text-emerald-600"
      : score >= 4
      ? "text-amber-500"
      : "text-red-600";

  // Calculate metrics for the metrics cards
  const metrics = [
    {
      title: "Decision",
      value: decision.verdict || "N/A",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      title: "Score",
      value: decision.score ? `${decision.score}/100` : "N/A",
      icon: <Star className="w-5 h-5" />,
    },
    {
      title: "Team Size",
      value: extracted.team.team_size ? extracted.team.team_size.toString() : "N/A",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Founded",
      value: extracted.startup.founded_year ? extracted.startup.founded_year.toString() : "N/A",
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  // Prepare company info
  const companyInfo = {
    companyName: extracted.startup.name || "Not specified",
    website: extracted.startup.website || "Not specified",
    sector: extracted.startup.sector || "Not specified",
    stage: extracted.startup.stage || "Not specified",
    hqCountry: extracted.startup.hq_country || "Not specified",
    foundedYear: extracted.startup.founded_year || "Not specified",
  };

  // Prepare market info
  const marketInfo = {
    tam: extracted.market.tam_usd,
    sam: extracted.market.sam_usd,
    som: extracted.market.som_usd,
    competitorsCount: extracted.market.competitors_count,
  };

  // Prepare team info
  const teamInfo = {
    founders: extracted.team.founders.length > 0
      ? extracted.team.founders
      : [{ name: "No founder information available", role: "" }],
    teamSize: extracted.team.team_size,
  };

  // Prepare risks info
  const risksInfo = {
    risks: extracted.risks.top_3_risks.length > 0
      ? extracted.risks.top_3_risks
      : ["No specific risks identified in the document."],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          <h1 className="text-2xl font-bold text-slate-900">
            Investment Dashboard
          </h1>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Title Section */}
        <div className="border-b border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {startup.name} Analysis
              </h1>
              <p className="text-slate-600">
                Comprehensive investment analysis and insights
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end space-x-2 mb-1">
                <Star className="w-5 h-5 text-amber-500" />
                <span className={`text-2xl font-bold ${scoreColor}`}>
                  {score.toFixed(1)}/10
                </span>
              </div>
              <div className="text-sm text-slate-600">Investment Score</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>{team.team_size} team members</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>{traction.retention_pct}% customer retention</span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Executive Summary
          </h3>
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl">
            <p className="text-slate-700 leading-relaxed mb-4">
              {extracted.summary ||
                `${startup.name} shows promising potential in the ${
                  market.sector || "target"
                } market. `}
              {decision.verdict === "INVEST"
                ? "The company demonstrates strong growth indicators and a capable team, making it a recommended investment opportunity."
                : "Further analysis is recommended to validate the business model and market fit."}
            </p>
            <div
              className={`flex items-center space-x-2 ${
                decision.verdict === "INVEST"
                  ? "text-emerald-700"
                  : "text-amber-700"
              } font-semibold`}
            >
              {decision.verdict === "INVEST" ? (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span>Recommendation: Consider for Investment</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5" />
                  <span>
                    Recommendation:{" "}
                    {decision.verdict === "PASS"
                      ? "Neutral"
                      : "Proceed with Caution"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="p-6 sm:p-8 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Key Performance Indicators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                icon={metric.icon}
                title={metric.title}
                value={metric.value}
                trend="positive"
                gradient="from-emerald-500 to-teal-500"
              />
            ))}
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company Information */}
            <CompanyInfo
              companyName={companyInfo.companyName}
              website={companyInfo.website}
              sector={companyInfo.sector}
              stage={companyInfo.stage}
              hqCountry={companyInfo.hqCountry}
              foundedYear={companyInfo.foundedYear}
            />

            {/* Decision Information */}
            <DecisionCard decision={decision} />
                },
                {
                  label: "Market Position",
                  value: market.market_position || "N/A",
                  trend:
                    market.market_position === "Leader"
                      ? "positive"
                      : "neutral",
                },
              ]}
            />

            {/* Team Analysis */}
            <AnalysisSection
              title="Team & Leadership"
              icon={<Users className="w-5 h-5" />}
              items={[
                {
                  label: "Team Size",
                  value: team.team_size.toString(),
                  trend: team.team_size > 5 ? "positive" : "neutral",
                },
                {
                  label: "Founders",
                  value: team.founders
                    ? team.founders.length.toString()
                    : "N/A",
                  trend: team.founders?.length
                    ? team.founders.length > 1
                      ? "positive"
                      : "neutral"
                    : "neutral",
                },
                {
                  label: "Experience",
                  value: team.average_experience_years
                    ? `${team.average_experience_years} years`
                    : "N/A",
                  trend: team.average_experience_years
                    ? team.average_experience_years > 7
                      ? "positive"
                      : "neutral"
                    : "neutral",
                },
                {
                  label: "Key Hires",
                  value: team.key_hires
                    ? team.key_hires.length.toString()
                    : "0",
                  trend: team.key_hires?.length ? "positive" : "neutral",
                },
              ]}
            />

            {/* Risk Assessment */}
            <AnalysisSection
              title="Risk Assessment"
              icon={<AlertTriangle className="w-5 h-5" />}
              items={[
                {
                  label: "Risk Level",
                  value: risks.overall_risk || "Medium",
                  trend:
                    risks.overall_risk === "Low"
                      ? "positive"
                      : risks.overall_risk === "High"
                      ? "negative"
                      : "neutral",
                },
                ...(risks.top_3_risks?.slice(0, 3).map((risk, i) => ({
                  label: `Risk ${i + 1}`,
                  value: risk,
                  trend: "negative" as const,
                })) || []),
              ]}
            />
          </div>
        </div>

        {/* Decision & Next Steps */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-50 to-blue-50 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Investment Recommendation
          </h3>
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="flex items-center space-x-3 mb-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  decision.verdict === "INVEST"
                    ? "bg-emerald-500"
                    : decision.verdict === "PASS"
                    ? "bg-amber-400"
                    : "bg-red-500"
                }`}
              ></div>
              <span
                className={`font-semibold ${
                  decision.verdict === "INVEST"
                    ? "text-emerald-700"
                    : decision.verdict === "PASS"
                    ? "text-amber-700"
                    : "text-red-700"
                }`}
              >
                {decision.verdict === "INVEST"
                  ? "STRONG CONSIDER"
                  : decision.verdict === "PASS"
                  ? "NEUTRAL / FURTHER REVIEW NEEDED"
                  : "NOT RECOMMENDED"}
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed mb-4">
              {decision.verdict === "INVEST"
                ? `${startup.name} presents a compelling investment opportunity with strong market potential and a capable team. The company demonstrates promising growth metrics and a clear path to scale.`
                : decision.verdict === "PASS"
                ? `While ${startup.name} shows potential, there are areas that require further investigation before making an investment decision.`
                : `Based on the current analysis, ${startup.name} does not meet our investment criteria at this time.`}
            </p>
            {decision.reasons.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-slate-900">Key Factors:</h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {decision.reasons.map((reason, i) => (
                    <li key={i} className="text-sm">
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h4 className="font-medium text-slate-900 mb-3">
                Suggested Next Steps:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-800">Due Diligence</div>
                  <p className="text-sm text-blue-700">
                    Review detailed financials and legal documents
                  </p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="font-medium text-emerald-800">
                    Team Meeting
                  </div>
                  <p className="text-sm text-emerald-700">
                    Schedule a call with the founding team
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-800">
                    Market Research
                  </div>
                  <p className="text-sm text-purple-700">
                    Validate market size and competition
                  </p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="font-medium text-amber-800">
                    Reference Checks
                  </div>
                  <p className="text-sm text-amber-700">
                    Contact customers and partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
