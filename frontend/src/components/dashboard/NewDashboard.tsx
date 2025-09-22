import React from "react";
import { Briefcase, Users, Calendar, Star, AlertCircle } from "lucide-react";
import { AnalysisData } from "../../App";

interface DashboardProps {
  analysis: AnalysisData;
}
const Dashboard: React.FC<DashboardProps> = ({ analysis }) => {
  const { extracted, decision } = analysis;

  // Format currency values
  const formatCurrency = (value: number | null) => {
    if (value === null) return "Not specified";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get a user-friendly placeholder for missing data
  const getPlaceholder = (type: string = "text") => {
    const placeholders: Record<string, string> = {
      text: "—",
      number: "—",
      date: "—",
      currency: "—",
      percentage: "—%",
      url: "Not available",
      email: "Not provided",
      phone: "Not provided",
      default: "—",
    };
    return placeholders[type] || placeholders.default;
  };

  // Prepare metrics for the top cards
  const metrics = [
    {
      title: "Decision",
      value: decision.verdict || "Pending",
      icon: <Briefcase className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Score",
      value: decision.score ? `${decision.score}/100` : "—",
      icon: <Star className="w-5 h-5" />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Team Size",
      value: extracted.team.team_size?.toString() || "—",
      icon: <Users className="w-5 h-5" />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Founded",
      value: extracted.startup.founded_year?.toString() || "—",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          {extracted.startup.name || "Company Analysis"}
        </h1>
        <p className="text-gray-600 mt-1">
          {extracted.startup.sector && `${extracted.startup.sector} • `}
          {extracted.startup.hq_country || ""}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${metric.color} mr-4`}>
                {metric.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {metric.title}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {metric.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Summary
            </h2>
            <p className="text-gray-600">
              {extracted.summary || "No summary available for this analysis."}
            </p>
          </div>

          {/* Company Details */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Company Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="text-gray-900">
                  {extracted.startup.website ? (
                    <a
                      href={
                        extracted.startup.website.startsWith("http")
                          ? extracted.startup.website
                          : `https://${extracted.startup.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {extracted.startup.website}
                    </a>
                  ) : (
                    "Not available"
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sector</p>
                <p className="text-gray-900">
                  {extracted.startup.sector || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Stage</p>
                <p className="text-gray-900">
                  {extracted.startup.stage || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">HQ Country</p>
                <p className="text-gray-900">
                  {extracted.startup.hq_country || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Decision Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Investment Decision
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Verdict</p>
                <div className="flex items-center mt-1">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      decision.verdict === "INVEST"
                        ? "bg-green-500"
                        : decision.verdict === "PASS"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <p className="font-medium text-gray-900">
                    {decision.verdict}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Score</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${decision.score}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {decision.score}/100
                </p>
              </div>
              {decision.reasons && decision.reasons.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Key Factors</p>
                  <ul className="space-y-2">
                    {decision.reasons.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Risks */}
          {extracted.risks?.top_3_risks &&
            extracted.risks.top_3_risks.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  Potential Risks
                </h2>
                <ul className="space-y-3">
                  {extracted.risks.top_3_risks.map((risk, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
