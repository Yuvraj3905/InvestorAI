export interface StartupData {
  name: string;
  website: string;
  sector: string;
  subsector: string;
  stage: string | null;
  hq_country: string;
  founded_year: number;
}

export interface TeamData {
  founders: string[];
  team_size: number;
  average_experience_years?: number;
  key_hires?: string[];
}

export interface TractionData {
  mrr_usd: number | null;
  arr_usd: number | null;
  growth_mom_pct: number | null;
  customers: number;
  churn_pct: number | null;
  retention_pct: number;
}

export interface UnitEconomics {
  cac_usd: number | null;
  ltv_usd: number | null;
  gross_margin_pct: number | null;
  burn_rate_usd_per_month: number | null;
  runway_months: number | null;
}

export interface MarketData {
  tam_usd: number | null;
  sam_usd: number | null;
  som_usd: number | null;
  competitors_count: number | null;
  growth_rate_pct?: number;
  market_position?: string;
  sector?: string;
}

export interface RoundData {
  seeking_usd: number | null;
  pre_money_valuation_usd: number | null;
  existing_investors: string[];
}

export interface RisksData {
  top_3_risks: string[];
  overall_risk?: 'Low' | 'Medium' | 'High';
}

export interface DecisionData {
  score: number;
  verdict: 'INVEST' | 'PASS' | 'DEFER';
  reasons: string[];
}

export interface ExtractedData {
  summary: string;
  startup: StartupData;
  team: TeamData;
  traction: TractionData;
  unit_economics: UnitEconomics;
  market: MarketData;
  round: RoundData;
  risks: RisksData;
}

export interface FinancialInsights {
  revenue?: number;
  revenue_growth?: number;
  burn_rate?: number;
  runway_months?: number;
}

export interface Insights {
  financial: FinancialInsights;
  market: Record<string, unknown>;
  team: Record<string, unknown>;
  risk: Record<string, unknown>;
}

export interface AnalysisData {
  id: string;
  companyName: string;
  documents: string[];
  status: string;
  progress: number;
  insights: Insights;
  benchmarking: Record<string, unknown>;
  report: Record<string, unknown>;
  uploadedAt: Date;
  extracted: ExtractedData;
  decision: DecisionData;
}
