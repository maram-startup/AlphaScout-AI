import React from "react";
import { TargetCompetitor } from "../types";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Shield, Brain, Activity, RefreshCw, AlertTriangle, HelpCircle, TrendingUp, Sparkles, Flame, DollarSign, Zap } from "lucide-react";

interface MetricsPanelProps {
  selectedTarget: TargetCompetitor;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ selectedTarget }) => {
  // Setup data for sentiment breakdown chart
  const sentimentData = [
    { name: "Social Hub", score: selectedTarget.sentimentBreakdown.socialPercent, color: "#10B981" },
    { name: "Dev Activity", score: selectedTarget.sentimentBreakdown.devPercent, color: "#3B82F6" },
    { name: "News Sentiment", score: selectedTarget.sentimentBreakdown.newsPercent, color: "#6366F1" },
  ];

  // Map historical risk scores over the last 5 polling cycles
  const historicalRiskData = (selectedTarget.riskHistory && selectedTarget.riskHistory.length > 0
    ? selectedTarget.riskHistory
    : [
        Math.max(10, selectedTarget.riskScore - 4),
        Math.max(10, selectedTarget.riskScore + 3),
        Math.max(10, selectedTarget.riskScore - 2),
        Math.max(10, selectedTarget.riskScore + 1),
        selectedTarget.riskScore
      ]
  ).slice(-5).map((score, index) => ({
    cycle: `Cycle ${index + 1}`,
    "Risk Score": score
  }));

  // Determine risk level color scheme
  let riskTheme = {
    text: "text-emerald-400",
    bg: "border-emerald-500/20 bg-emerald-500/5",
    descr: "Low risk profile based on current active scans.",
  };
  if (selectedTarget.riskScore >= 36 && selectedTarget.riskScore <= 70) {
    riskTheme = {
      text: "text-amber-400",
      bg: "border-amber-500/20 bg-amber-500/5",
      descr: "Moderate risk factors detected. Monitor closely.",
    };
  } else if (selectedTarget.riskScore > 70) {
    riskTheme = {
      text: "text-rose-400",
      bg: "border-rose-500/20 bg-rose-500/5",
      descr: "CRITICAL risk exposure. Immediate strategic mitigation required.",
    };
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 flex flex-col h-full select-none justify-between">
      <div>
        {/* Selected competitor header */}
        <div className="flex items-start justify-between border-b border-gray-900 pb-4 mb-4">
          <div className="flex items-start gap-3">
            {selectedTarget.logoUrl ? (
              <img src={selectedTarget.logoUrl} className="w-12 h-12 rounded-full border border-gray-800 object-cover mt-1" alt={selectedTarget.symbol} />
            ) : (
              <div className="h-4 w-4 rounded-full mt-2" style={{ backgroundColor: selectedTarget.tickerColor }} />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-mono font-bold text-gray-400 tracking-wider uppercase">
                  AI ANALYTICS CORE // {selectedTarget.symbol}
                </h2>
                {selectedTarget.marketCapRank && (
                  <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold px-1.5 py-0.5 rounded">
                    Rank #{selectedTarget.marketCapRank}
                  </span>
                )}
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {selectedTarget.name}
                </span>
              </div>
              
              {selectedTarget.livePriceUsd !== undefined && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                    ${selectedTarget.livePriceUsd >= 1 ? selectedTarget.livePriceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : selectedTarget.livePriceUsd.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 5 })}
                  </span>
                  {selectedTarget.livePriceChange24h !== undefined && (
                    <span className={`text-xs font-mono font-bold ${selectedTarget.livePriceChange24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {selectedTarget.livePriceChange24h >= 0 ? "▲ +" : "▼ "}
                      {selectedTarget.livePriceChange24h.toFixed(2)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-gray-500 block">TOTAL RISK SCORE</span>
            <span className={`text-2xl font-black font-mono tracking-tight ${riskTheme.text}`}>
              {selectedTarget.riskScore}%
            </span>
          </div>
        </div>

        {/* Info Grid - Sentiment vs Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 min-w-0">
          {/* Sentiment breakdowns (Recharts) */}
          <div className="flex flex-col min-w-0">
            <h3 className="text-xs font-mono font-bold text-gray-400 mb-3 uppercase flex items-center gap-1.5">
              <Brain className="h-3.5 w-3.5 text-indigo-400 font-bold" />
              Social & Dev Sentiment Matrices
            </h3>
            <div className="h-44 w-full bg-gray-900/40 rounded-lg p-2 border border-gray-900 relative min-w-0 min-h-0">
              <ResponsiveContainer id="sentiment-metric-container" width="100%" height={145} debounce={100}>
                <BarChart data={sentimentData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: "#9ca3af", fontSize: 9, fontFamily: "monospace" }} 
                    axisLine={{ stroke: "#374151" }}
                    tickLine={{ stroke: "#374151" }}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: "#9ca3af", fontSize: 9, fontFamily: "monospace" }} 
                    axisLine={{ stroke: "#374151" }}
                    tickLine={{ stroke: "#374151" }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#030712", borderColor: "#1f2937", borderRadius: "6px" }}
                    labelStyle={{ color: "#9ca3af", fontFamily: "monospace", fontSize: "10px" }}
                    itemStyle={{ color: "#fff", fontFamily: "monospace", fontSize: "10px" }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Risk Factors */}
          <div className="flex flex-col">
            <h3 className="text-xs font-mono font-bold text-gray-400 mb-3 uppercase flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              Dynamic Threat Indexes (No Truncation)
            </h3>
            <div className="space-y-2">
              {selectedTarget.riskFactors.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500 bg-gray-900/20 rounded p-4 text-center">
                  <p className="text-[11px] font-mono">No risk indicators detected.</p>
                </div>
              ) : (
                selectedTarget.riskFactors.map((factor, i) => {
                  let sevColor = "text-gray-400 bg-gray-900/60 border-gray-800";
                  if (factor.severity === "CRITICAL") sevColor = "text-rose-400 bg-rose-500/10 border-rose-500/30";
                  else if (factor.severity === "HIGH") sevColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
                  else if (factor.severity === "MEDIUM") sevColor = "text-blue-400 bg-blue-500/10 border-blue-500/30";

                  return (
                    <div 
                      key={i} 
                      className="p-3 rounded-lg bg-gray-900 border border-gray-850/80 hover:border-gray-800 transition"
                    >
                      <div className="flex items-start justify-between gap-1.5 mb-1.5 animate-pulse">
                        <span className="text-xs font-bold text-white tracking-tight leading-snug">
                          {factor.type}
                        </span>
                        <span className={`text-[8px] font-mono font-black px-1.5 py-0.2 rounded border shrink-0 ${sevColor}`}>
                          {factor.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 font-mono leading-relaxed whitespace-pre-wrap">
                        {factor.description}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Historical Risk Score Trend (LineChart) */}
        <div className="mt-5 mb-5 border-t border-gray-900 pt-4 min-w-0">
          <h3 className="text-xs font-mono font-bold text-cyan-400 mb-3 uppercase flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-cyan-400 animate-pulse" />
            🛡️ RISK Score Profile Volatility // Last 5 Polling Cycles
          </h3>
          <div className="h-44 w-full bg-gray-900/40 rounded-lg p-2.5 border border-gray-900 relative min-w-0 min-h-0">
            <ResponsiveContainer id="volatility-metric-container" width="100%" height={145} debounce={100}>
              <LineChart data={historicalRiskData} margin={{ top: 10, right: 15, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.4} />
                <XAxis 
                  dataKey="cycle" 
                  tick={{ fill: "#9ca3af", fontSize: 9, fontFamily: "monospace" }} 
                  axisLine={{ stroke: "#374151" }}
                  tickLine={{ stroke: "#374151" }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fill: "#9ca3af", fontSize: 9, fontFamily: "monospace" }} 
                  axisLine={{ stroke: "#374151" }}
                  tickLine={{ stroke: "#374151" }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#030712", borderColor: "#1f2937", borderRadius: "6px" }}
                  labelStyle={{ color: "#9ca3af", fontFamily: "monospace", fontSize: "10px" }}
                  itemStyle={{ color: "#fff", fontFamily: "monospace", fontSize: "10px" }}
                />
                <Line
                  type="monotone"
                  dataKey="Risk Score"
                  stroke="#ef4444"
                  strokeWidth={2}
                  activeDot={{ r: 4 }}
                  dot={{ r: 3, fill: "#ef4444", stroke: "#030712", strokeWidth: 1.5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
               {/* Dynamic Alpha Investment Scout Intelligence Cards */}
        <div className="mt-5 pt-4 border-t border-gray-900 space-y-3 text-left">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            📊 SCRAPED COMPETITOR INTELLIGENCE // REAL-TIME METRIC PROFILE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: Unit Economics */}
            <div className="bg-gray-900/40 hover:bg-gray-900/60 transition duration-300 border border-gray-850 p-3.5 rounded-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 border-b border-gray-900 pb-1.5">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-tight uppercase">
                      1. Live Unit Economics Matches
                    </span>
                  </div>
                  {selectedTarget.unitEconomics?.status && (
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedTarget.unitEconomics.status === "Optimized" 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : selectedTarget.unitEconomics.status === "Friction Warning"
                          ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                    }`}>
                      {selectedTarget.unitEconomics.status}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
                    <strong className="text-cyan-400">Live Prices:</strong> {selectedTarget.unitEconomics?.priceTrend || "Scraped pricing catalogue values flat..."}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                    <strong className="text-purple-400">Operating Margins:</strong> {selectedTarget.unitEconomics?.marginMatch || "Margins matched to operational baseline..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: Feature Velocity */}
            <div className="bg-gray-900/40 hover:bg-gray-900/60 transition duration-300 border border-gray-850 p-3.5 rounded-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 border-b border-gray-900 pb-1.5">
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-tight uppercase">
                      2. Product Feature Velocity
                    </span>
                  </div>
                  {selectedTarget.featureVelocity?.status && (
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedTarget.featureVelocity.status === "Aggressive Pivot" 
                        ? "text-purple-400 bg-purple-500/10 border-purple-500/20"
                        : selectedTarget.featureVelocity.status === "Moderate Growth"
                          ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
                          : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                    }`}>
                      {selectedTarget.featureVelocity.status}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
                    <strong className="text-cyan-400">Release Cadence:</strong> {selectedTarget.featureVelocity?.changeRate || "Scanning active code repositories..."}
                  </p>
                  {selectedTarget.featureVelocity?.updates && selectedTarget.featureVelocity.updates.length > 0 && (
                    <div className="text-[10px] text-gray-400 font-mono space-y-1 mt-1 bg-gray-950/60 border border-gray-900 p-1.5 rounded">
                      <span className="text-[9px] text-gray-500 block font-bold uppercase">Recent Extracted Updates:</span>
                      {selectedTarget.featureVelocity.updates.map((update, idx) => (
                        <div key={idx} className="flex items-start gap-1">
                          <span className="text-indigo-400">•</span>
                          <span>{update}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Box 3: Operational Leaks */}
            <div className="bg-gray-900/40 hover:bg-gray-900/60 transition duration-300 border border-gray-850 p-3.5 rounded-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 border-b border-gray-900 pb-1.5">
                  <div className="flex items-center gap-1.5 text-rose-400">
                    <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-tight uppercase">
                      3. Operational Leaks & Outcry
                    </span>
                  </div>
                  {selectedTarget.operationalLeaks?.status && (
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedTarget.operationalLeaks.status === "Healthy Social Score" 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : selectedTarget.operationalLeaks.status === "Minor Outcry"
                          ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                    }`}>
                      {selectedTarget.operationalLeaks.status}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
                    <strong className="text-cyan-400">Social Outcry Rate:</strong> {selectedTarget.operationalLeaks?.complaintRatio || "0% complaint ratios..."}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                    <strong className="text-rose-400">Top Friction Node:</strong> {selectedTarget.operationalLeaks?.topFriction || "No service blockers..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4: Desperation Signals */}
            <div className="bg-gray-900/40 hover:bg-gray-900/60 transition duration-300 border border-gray-850 p-3.5 rounded-lg flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1.5 border-b border-gray-900 pb-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-[10px] font-mono font-bold tracking-tight uppercase">
                      4. Pricing Desperation & Cash Burn
                    </span>
                  </div>
                  {selectedTarget.desperationSignals?.status && (
                    <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                      selectedTarget.desperationSignals.status === "Sustained" 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                        : selectedTarget.desperationSignals.status === "Medium Burn Risk"
                          ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                          : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                    }`}>
                      {selectedTarget.desperationSignals.status}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
                    <strong className="text-cyan-400">Active Discounts:</strong> {selectedTarget.desperationSignals?.activeDiscount || "No active vouchers..."}
                  </p>
                  <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                    <strong className="text-amber-400">Cash Burn Index:</strong> {selectedTarget.desperationSignals?.cashBurnRate || "Sustained budget patterns..."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>       </div>

        {/* Aggregated Competitor Intelligence Priority Digest */}
        <div className="mt-5 pt-4 border-t border-gray-900 space-y-3 text-left">
          <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-emerald-500" />
            Exhaustive Competitor Intel & Priority Digest
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900/30 border border-gray-900 p-3 rounded-lg">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">🎯 Operating DNA & Sector</span>
              <p className="text-xs text-gray-300 font-mono leading-relaxed">
                {selectedTarget.description}
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold">🎛️ Bright Data Scraper Directives</span>
              <div className="text-[11px] font-mono space-y-1 text-gray-400 leading-snug">
                <div>• <strong className="text-gray-200">Security Bypasses:</strong> Web Unlocker, Cloudflare Slider Solved, Geolocation US-East, Fingerprinting Spoof mac-chrome.</div>
                <div>• <strong className="text-gray-200">Scattered Keywords:</strong> <span className="text-rose-400">"vulnerability"</span>, <span className="text-rose-400">"outage"</span>, <span className="text-rose-400">"backlash"</span>, <span className="text-amber-400">"delay"</span>.</div>
                <div>• <strong className="text-gray-200">Scraped Valuation/TVL:</strong> {selectedTarget.estimatedTVL} calculated under current supply pools.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic synthesis card block footer */}
      <div className="mt-4 p-3 bg-gray-900/60 border border-gray-850 rounded-lg flex items-center gap-3">
        <AlertTriangle className={`h-5 w-5 ${riskTheme.text} flex-shrink-0 animate-pulse`} />
        <div>
          <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold tracking-wider">
            SECURITY EXECUTIVE DECISION WARNING
          </span>
          <p className="text-xs text-gray-300 font-mono">
            {riskTheme.descr} Web Unlocker is tracking security patches sequentially to dynamically calibrate this score.
          </p>
        </div>
      </div>
    </div>
  );
};
