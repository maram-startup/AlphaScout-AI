import React from "react";
import { TargetCompetitor } from "../types";
import { Shield, Coins, Activity, TrendingUp, AlertCircle, ArrowUpRight, Flame } from "lucide-react";

interface CompetitorCardProps {
  target: TargetCompetitor;
  isSelected: boolean;
  onSelect: () => void;
}

export const CompetitorCard: React.FC<CompetitorCardProps> = ({
  target,
  isSelected,
  onSelect,
}) => {
  // Determine risk level color scheme
  let riskTheme = {
    bar: "bg-emerald-500",
    text: "text-emerald-400",
    bg: "border-emerald-500/20 bg-emerald-500/5",
  };
  if (target.riskScore >= 36 && target.riskScore <= 70) {
    riskTheme = {
      bar: "bg-amber-500",
      text: "text-amber-400",
      bg: "border-amber-500/20 bg-amber-500/5",
    };
  } else if (target.riskScore > 70) {
    riskTheme = {
      bar: "bg-rose-500",
      text: "text-rose-400",
      bg: "border-rose-500/20 bg-rose-500/5",
    };
  }

  // Determine sentiment pill color
  let sentimentTheme = "bg-gray-800 text-gray-300 border-gray-700";
  if (target.sentimentLabel === "Bullish") sentimentTheme = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  else if (target.sentimentLabel === "Skeptical") sentimentTheme = "bg-amber-500/10 text-amber-400 border-amber-500/30";
  else if (target.sentimentLabel === "Bearish") sentimentTheme = "bg-rose-500/10 text-rose-400 border-rose-500/30";

  return (
    <div
      onClick={onSelect}
      className={`relative group rounded-lg p-5 border text-left cursor-pointer select-none transition-all duration-350 flex flex-col justify-between h-full bg-gray-950 ${
        isSelected
          ? "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.06)] scale-[1.01]"
          : "border-gray-850 hover:border-gray-700 hover:scale-[1.005]"
      }`}
    >
      {/* Target logo marker */}
      <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-lg" style={{ backgroundColor: target.tickerColor }} />

      <div>
        {/* Name and Ticker header */}
        <div className="flex items-start justify-between gap-2 mb-2 pl-2">
          <div className="flex items-start gap-2.5">
            {target.logoUrl && (
              <img referrerPolicy="no-referrer" src={target.logoUrl} className="w-9 h-9 rounded-full object-cover border border-white/10 mt-1" alt={target.symbol} />
            )}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white" style={{ backgroundColor: target.tickerColor + "22", border: `1px solid ${target.tickerColor}44`, color: target.tickerColor }}>
                  {target.symbol}
                </span>
                <span className="text-xs text-gray-400 font-mono tracking-tight">
                  {target.category}
                </span>
                {target.marketCapRank && (
                  <span className="text-[9px] bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono px-1.5 py-0.5 rounded font-bold">
                    Rank #{target.marketCapRank}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold font-sans text-white tracking-tight mt-1.5 group-hover:text-emerald-400 transition-colors">
                {target.name}
              </h3>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${sentimentTheme}`}>
              {target.sentimentLabel}
            </span>
            {target.livePriceUsd !== undefined && (
              <div className="text-right mt-1">
                <div className="text-xs font-mono font-bold text-white">
                  ${target.livePriceUsd >= 1 ? target.livePriceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : target.livePriceUsd.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 5 })}
                </div>
                {target.livePriceChange24h !== undefined && (
                  <div className={`text-[9px] font-mono font-bold flex items-center justify-end gap-0.5 ${target.livePriceChange24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {target.livePriceChange24h >= 0 ? "▲ +" : "▼ "}
                    {target.livePriceChange24h.toFixed(2)}%
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description summary */}
        <p className="text-xs text-gray-400 mb-4 pl-2 leading-relaxed">
          {target.description}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="border-t border-gray-900 pt-4 pl-2 flex flex-col gap-3">
        {/* TVL / Market Cap Indicator */}
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-gray-500 flex items-center gap-1">
            <Coins className="h-3.5 w-3.5 text-gray-500" /> Capital Pool:
          </span>
          <span className="font-bold text-gray-200">{target.estimatedTVL}</span>
        </div>

        {/* Risk Score Indicator */}
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-gray-500 flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-gray-500" /> Risk Index:
            </span>
            <span className={`font-bold ${riskTheme.text}`}>{target.riskScore}/100</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-850">
            <div
              className={`h-full rounded-full transition-all duration-500 ${riskTheme.bar}`}
              style={{ width: `${target.riskScore}%` }}
            />
          </div>
        </div>

        {/* Website anchors */}
        <div className="flex items-center gap-3 pt-1 text-[11px] font-mono">
          <a
            href={target.website}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="text-gray-500 hover:text-white flex items-center gap-1 group/link transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Website</span>
            <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
          {target.twitterUrl && (
            <a
              href={target.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="text-gray-500 hover:text-white flex items-center gap-1 group/link transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Socials</span>
              <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
