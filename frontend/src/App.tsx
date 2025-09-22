import { useState } from "react";
import Header from "./components/Header";
import DocumentUpload from "./components/DocumentUpload";
import ReportViewer from "./components/ReportViewer";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard/NewDashboard";

type ExtractedData = {
  summary: string;
  startup: {
    name: string;
    website: string;
    sector: string;
    subsector: string;
    stage: string | null;
    hq_country: string;
    founded_year: number;
  };
  team: {
    founders: string[];
    team_size: number;
  };
  traction: {
    mrr_usd: number | null;
    arr_usd: number | null;
    growth_mom_pct: number | null;
    customers: number;
    churn_pct: number | null;
    retention_pct: number;
  };
  unit_economics: {
    cac_usd: number | null;
    ltv_usd: number | null;
    gross_margin_pct: number | null;
    burn_rate_usd_per_month: number | null;
    runway_months: number | null;
  };
  market: {
    tam_usd: number | null;
    sam_usd: number | null;
    som_usd: number | null;
    competitors_count: number | null;
  };
  round: {
    seeking_usd: number | null;
    pre_money_valuation_usd: number | null;
    existing_investors: string[];
  };
  risks: {
    top_3_risks: string[];
  };
};

type Decision = {
  score: number;
  verdict: "INVEST" | "PASS" | "DEFER";
  reasons: string[];
};

export type AnalysisData = {
  id: string;
  companyName: string;
  documents: string[];
  status: "processing" | "completed" | "error";
  progress: number;
  insights: {
    financial: Record<string, unknown>;
    market: Record<string, unknown>;
    team: Record<string, unknown>;
    risk: Record<string, unknown>;
  };
  benchmarking: Record<string, unknown>;
  report: Record<string, unknown>;
  uploadedAt: Date;
  extracted: ExtractedData;
  decision: Decision;
};

// Sample data - in a real app, this would come from an API
const analysisData: AnalysisData = {
  id: "sample-analysis-1",
  companyName: "Jay Mehta.co",
  documents: [],
  status: "completed",
  progress: 100,
  insights: {
    financial: {},
    market: {},
    team: {},
    risk: {},
  },
  benchmarking: {},
  report: {},
  uploadedAt: new Date(),
  extracted: {
    summary:
      "Jay Mehta.co is an established full-spectrum digital agency specializing in online and offline marketing, branding, web development, mobile app development, IT staff augmentation, and consulting services. Founded in 2009 by Jay Mehta, the company leverages over two decades of expertise to deliver measurable results for over 2000 clients across diverse industries globally. With a dedicated team of over 250 professionals, the agency boasts an impressive 99% client retention rate by focusing on tailored, results-driven strategies and transparent communication, supported by extensive partnerships and certifications.",
    startup: {
      name: "Jay Mehta.co",
      website: "jaymehta.co",
      sector: "Digital Agency",
      subsector:
        "Digital Marketing, Web Development, Mobile App Development, IT Staff Augmentation, Branding, Consulting",
      stage: null,
      hq_country: "USA",
      founded_year: 2009,
    },
    team: {
      founders: ["Jay Mehta"],
      team_size: 250,
    },
    traction: {
      mrr_usd: null,
      arr_usd: null,
      growth_mom_pct: null,
      customers: 2000,
      churn_pct: null,
      retention_pct: 99,
    },
    unit_economics: {
      cac_usd: null,
      ltv_usd: null,
      gross_margin_pct: null,
      burn_rate_usd_per_month: null,
      runway_months: null,
    },
    market: {
      tam_usd: null,
      sam_usd: null,
      som_usd: null,
      competitors_count: null,
    },
    round: {
      seeking_usd: null,
      pre_money_valuation_usd: null,
      existing_investors: [],
    },
    risks: {
      top_3_risks: [
        "Maintaining competitive differentiation and talent acquisition in a crowded digital agency market with a broad range of service offerings.",
        "Scalability challenges inherent in a service-based model, particularly in human resource management and quality control, despite staff augmentation solutions.",
        "Potential reliance on the key individual (Jay Mehta) for strategic direction and client relationships, posing a risk to long-term sustainability if leadership is not diversified.",
      ],
    },
  },
  decision: {
    score: 57,
    verdict: "DEFER" as const,
    reasons: ["Good retention 99.0%.", "Adequate team size."],
  },
};

function App() {
  const [currentView, setCurrentView] = useState<
    "landing" | "upload" | "dashboard" | "report"
  >("landing");
  const [analyses, setAnalyses] = useState<AnalysisData[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);

  const handleNewAnalysis = (analysisData: AnalysisData) => {
    // Map the API response to the AnalysisData type
    const newAnalysis: AnalysisData = {
      ...analysisData,
      id: `analysis-${Date.now()}`,
      status: "completed",
      progress: 100,
      uploadedAt: new Date(),
      // Ensure all required fields have default values if not provided
      extracted: {
        summary: analysisData.extracted?.summary || "",
        startup: {
          name: analysisData.extracted?.startup?.name || "Unnamed Company",
          website: analysisData.extracted?.startup?.website || "",
          sector: analysisData.extracted?.startup?.sector || "Not specified",
          subsector: analysisData.extracted?.startup?.subsector || "",
          stage: analysisData.extracted?.startup?.stage || null,
          hq_country: analysisData.extracted?.startup?.hq_country || "",
          founded_year: analysisData.extracted?.startup?.founded_year || null,
        },
        team: {
          founders: analysisData.extracted?.team?.founders || [],
          team_size: analysisData.extracted?.team?.team_size || 0,
        },
        traction: analysisData.extracted?.traction || {
          mrr_usd: null,
          arr_usd: null,
          growth_mom_pct: null,
          customers: 0,
          churn_pct: null,
          retention_pct: 0,
        },
        unit_economics: analysisData.extracted?.unit_economics || {
          cac_usd: null,
          ltv_usd: null,
          gross_margin_pct: null,
          burn_rate_usd_per_month: null,
          runway_months: null,
        },
        market: analysisData.extracted?.market || {
          tam_usd: null,
          sam_usd: null,
          som_usd: null,
          competitors_count: null,
        },
        round: analysisData.extracted?.round || {
          seeking_usd: null,
          pre_money_valuation_usd: null,
          existing_investors: [],
        },
        risks: analysisData.extracted?.risks || {
          top_3_risks: [],
        },
      },
      decision: {
        score: analysisData.decision?.score || 0,
        verdict: analysisData.decision?.verdict || "PASS",
        reasons: analysisData.decision?.reasons || [],
      },
      // Add empty objects for any missing required fields
      insights: {
        financial: {},
        market: {},
        team: {},
        risk: {},
      },
      benchmarking: {},
      report: {},
      documents: analysisData.documents || [],
    };

    setAnalyses((prev) => [newAnalysis, ...prev]);
    setCurrentView("dashboard");
  };

  const selectedAnalysisData = selectedAnalysis
    ? analyses.find((a) => a.id === selectedAnalysis)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        analysesCount={analyses.length}
      />

      <main className="pt-20">
        {currentView === "landing" && (
          <LandingPage onGetStarted={() => setCurrentView("upload")} />
        )}

        {currentView === "upload" && (
          <DocumentUpload
            onAnalysisCreated={handleNewAnalysis}
            onViewReport={(id) => {
              setSelectedAnalysis(id);
              setCurrentView("dashboard");
            }}
          />
        )}

        {currentView === "dashboard" && analyses.length > 0 && (
          <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <Dashboard analysis={analyses[0]} />
          </div>
        )}

        {currentView === "report" && selectedAnalysisData && (
          <ReportViewer
            analysis={selectedAnalysisData}
            onBack={() => setCurrentView("dashboard")}
          />
        )}
      </main>
    </div>
  );
}

export default App;
