export interface RiskFactor {
  type: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
}

export interface SentimentBreakdown {
  socialPercent: number;
  devPercent: number;
  newsPercent: number;
}

export interface UnitEconomics {
  priceTrend: string;
  marginMatch: string;
  status: "Optimized" | "Friction Warning" | "Critical Squeeze";
}

export interface FeatureVelocity {
  changeRate: string;
  updates: string[];
  status: "Aggressive Pivot" | "Moderate Growth" | "Stagnant / Halting";
}

export interface OperationalLeaks {
  complaintRatio: string;
  topFriction: string;
  status: "Healthy Social Score" | "Minor Outcry" | "Severe Backlash Alert";
}

export interface DesperationSignals {
  activeDiscount: string;
  cashBurnRate: string;
  status: "Sustained" | "Medium Burn Risk" | "Aggressive Liquid Burn";
}

export interface TargetCompetitor {
  id: string;
  name: string;
  symbol: string;
  description: string;
  category: string;
  estimatedTVL: string;
  website: string;
  twitterUrl: string;
  riskScore: number; // 0 - 100
  sentimentScore: number; // 0 - 100
  sentimentLabel: "Bullish" | "Skeptical" | "Neutral" | "Bearish";
  sentimentBreakdown: SentimentBreakdown;
  riskFactors: RiskFactor[];
  tickerColor: string;
  livePriceUsd?: number;
  livePriceChange24h?: number;
  marketCapRank?: number;
  logoUrl?: string;
  riskHistory?: number[];
  unitEconomics?: UnitEconomics;
  featureVelocity?: FeatureVelocity;
  operationalLeaks?: OperationalLeaks;
  desperationSignals?: DesperationSignals;
}

export interface ScrapingLog {
  id: string;
  timestamp: string;
  level: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  message: string;
  target?: string;
}

export interface IntelligenceAlert {
  id: string;
  targetId: string;
  targetName: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
  action: string;
  timestamp: string;
}

export interface IntelligenceRunResponse {
  targets: TargetCompetitor[];
  alerts: IntelligenceAlert[];
  logs: ScrapingLog[];
}

export interface BrightDataConfig {
  apiKey: string;
  scrapingUrl: string;
  webUnlockerEnabled: boolean;
  userAgentHeader: string;
}

export interface CorporateAnalysis {
  company_name: string;
  revenue_ttm: string;
  net_profit_margin: number;
  revenue_growth_qoq: number;
  market_share_percentage: number;
  pricing_aggressive_index: number;
  risk_score: number;
  last_scraped_at: string;
  alerts: string[];
}

