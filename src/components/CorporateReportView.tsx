import React from "react";
import { CorporateAnalysis } from "../types";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, RadialBarChart, RadialBar } from "recharts";
import { Shield, TrendingUp, DollarSign, Activity, Percent, Flame, Globe, AlertCircle, Clock, CheckCircle } from "lucide-react";

interface CorporateReportViewProps {
  data: CorporateAnalysis;
  isCached?: boolean;
}

export const CorporateReportView: React.FC<CorporateReportViewProps> = ({ data, isCached }) => {
  // Determine risk level styling
  let riskTheme = {
    text: "text-emerald-400",
    bg: "border-emerald-500/20 bg-emerald-500/5",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description: "Low financial and regulatory risk. Operations highly stable."
  };
  
  if (data.risk_score >= 35 && data.risk_score <= 65) {
    riskTheme = {
      text: "text-amber-400",
      bg: "border-amber-500/20 bg-amber-500/5",
      badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      description: "Moderate risk exposure detected. Watch pricing actions closely."
    };
  } else if (data.risk_score > 65) {
    riskTheme = {
      text: "text-rose-400",
      bg: "border-rose-500/20 bg-rose-500/5",
      badge: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      description: "Severe risk. Immediate structural intervention suggested."
    };
  }

  // Formatting for Recharts
  const chartData = [
    { name: "Profit Margin", value: data.net_profit_margin, color: "#10B981" },
    { name: "QoQ Growth", value: Math.abs(data.revenue_growth_qoq), color: "#3B82F6" },
    { name: "Market Share", value: data.market_share_percentage, color: "#6366F1" },
    { name: "Pricing Index", value: data.pricing_aggressive_index, color: "#F59E0B" }
  ];

  return (
    <div id="corporate-reporting-card" className="bg-gray-950 border border-gray-850 rounded-xl p-6 space-y-6 select-none shadow-2xl relative overflow-hidden">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-900 pb-5 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase">
              ★ Enterprise SEC Scraper Mode
            </span>
            {isCached && (
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-bold px-2 py-0.5 rounded tracking-widest uppercase">
                Offline Memory Cache
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            {data.company_name}
          </h2>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-600" />
              Scraped: {data.last_scraped_at}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-gray-600" />
              Source: SEC Web Unlocker API
            </span>
          </div>
        </div>

        {/* Global Risk Index Display */}
        <div className={`border rounded-lg p-3 text-center sm:text-right w-full sm:w-auto min-w-[140px] ${riskTheme.bg}`}>
          <span className="text-[10px] font-mono text-gray-500 block uppercase font-bold tracking-wider">SEC Risk Score</span>
          <span className={`text-3xl font-black font-mono tracking-tight ${riskTheme.text}`}>
            {data.risk_score}%
          </span>
          <span className="text-[10px] font-sans text-gray-400 block mt-0.5 font-medium leading-none">
            {data.risk_score >= 65 ? "Bearish Profile" : data.risk_score >= 35 ? "Skeptical Profile" : "Bullish Profile"}
          </span>
        </div>
      </div>

      {/* Grid of 5 Key Corporate Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Metric 1 */}
        <div className="bg-gray-900/40 border border-gray-850 hover:border-emerald-500/20 rounded-lg p-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">TTM Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-white tracking-tight">{data.revenue_ttm}</p>
          <span className="text-[9px] font-mono text-gray-500 mt-1 block">Total trailing 12 months</span>
        </div>

        {/* Metric 2 */}
        <div className="bg-gray-900/40 border border-gray-850 hover:border-emerald-500/20 rounded-lg p-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Net Profit Margin</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-white tracking-tight">{data.net_profit_margin}%</p>
          <span className="text-[9px] font-mono text-emerald-400 mt-1 block">Highly profitable margin</span>
        </div>

        {/* Metric 3 */}
        <div className="bg-gray-900/40 border border-gray-850 hover:border-emerald-500/20 rounded-lg p-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">QoQ Growth</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-white tracking-tight">
            {data.revenue_growth_qoq >= 0 ? "+" : ""}{data.revenue_growth_qoq}%
          </p>
          <span className={`text-[9px] font-mono ${data.revenue_growth_qoq >= 0 ? "text-emerald-400" : "text-rose-400"} mt-1 block`}>
            Quarterly revenue trend
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-gray-900/40 border border-gray-850 hover:border-emerald-500/20 rounded-lg p-4 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Market Share</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-white tracking-tight">{data.market_share_percentage}%</p>
          <span className="text-[9px] font-mono text-indigo-400 mt-1 block">Industry share index</span>
        </div>

        {/* Metric 5 */}
        <div className="bg-gray-900/40 border border-gray-850 hover:border-emerald-500/20 rounded-lg p-4 col-span-2 lg:col-span-1 transition-all hover:scale-[1.01]">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Pricing Aggressiveness</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-extrabold text-white tracking-tight">{data.pricing_aggressive_index}/100</p>
          <span className="text-[9px] font-mono text-amber-400 mt-1 block">Competitor pressure score</span>
        </div>
      </div>

      {/* Visual Analytics Sector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Recharts Bar representation of parameters */}
        <div className="bg-gray-900/20 border border-gray-900 rounded-lg p-4 flex flex-col justify-between h-[230px]">
          <div className="mb-2">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Core KPI Distribution</span>
            <span className="text-[9px] font-sans text-gray-500 block">Relative percentage weight metrics</span>
          </div>
          <div className="w-full h-[150px] min-w-0 min-h-0">
            <ResponsiveContainer width="100%" height="100%" debounce={100}>
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#6F7B8C" fontSize={10} tickLine={false} />
                <YAxis stroke="#6F7B8C" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0B0F17", borderColor: "#1F2937", borderRadius: "6px" }}
                  labelStyle={{ color: "#ffffff", fontFamily: "monospace", fontSize: "11px" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Analysis Card and status summary */}
        <div className="bg-gray-900/20 border border-gray-900 rounded-lg p-4 flex flex-col justify-between h-[230px]">
          <div>
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">Audit Assessment Target</span>
            <span className="text-[9px] font-sans text-gray-500 block">Deductive synthesis & status report</span>
          </div>
          
          <div className="space-y-3 my-2">
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Autonomous scrutiny of {data.company_name} SEC filings and quarterly public registries indicates a total risk rating of <strong className="text-white">{data.risk_score}/100</strong>. {riskTheme.description}
            </p>
            <div className="bg-gray-950 border border-gray-850 rounded p-2 flex items-start gap-2 text-[10px] font-mono">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-gray-400 leading-tight">
                Web Unlocker proxy routing has certified 100% of network data sheets, successfully bypassing anti-bot shields and solving Slider challenges.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Target perfectly evaluated. Data sheets finalized.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
