import React from "react";
import { IntelligenceAlert } from "../types";
import { AlertCircle, Flame, ShieldAlert, ArrowUpRight, CheckCircle } from "lucide-react";

interface PriorityAlertListProps {
  alerts: IntelligenceAlert[];
}

export const PriorityAlertList: React.FC<PriorityAlertListProps> = ({ alerts }) => {
  // Sort priority levels so CRITICAL and HIGH alerts always align on top
  const severityValue = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    return (severityValue[b.severity] || 0) - (severityValue[a.severity] || 0);
  });

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg p-5 flex flex-col h-full select-none justify-between">
      <div>
        {/* Alerts block heading */}
        <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-rose-500 animate-pulse" />
            <h2 className="text-sm font-mono font-bold text-gray-400 uppercase tracking-widest">
              ACTIONABLE ALERTS & STRATEGIC PLAYBOOKS
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/30">
            {alerts.length} ALERTS INSTANTIATED
          </span>
        </div>

        {/* Action alerts list stack */}
        <div className="space-y-4 max-h-[310px] overflow-y-auto pr-1">
          {sortedAlerts.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-center text-gray-500">
              <CheckCircle className="h-7 w-7 text-emerald-500/50 mb-2 stroke-1.5" />
              <p className="text-xs font-mono font-bold">No High-Risk Anomalies Scraped.</p>
              <p className="text-[10px] text-gray-600 mt-1">Ecosystem metrics remain within benchmark thresholds.</p>
            </div>
          ) : (
            sortedAlerts.map((alert) => {
              let alertBorder = "border-gray-850 hover:border-gray-850 bg-gray-900/40";
              let sevColor = "text-gray-400 border-gray-800 bg-gray-900";
              let titleColor = "text-white";
              
              if (alert.severity === "CRITICAL") {
                alertBorder = "border-rose-500/30 hover:border-rose-500/50 bg-rose-500/5 shadow-[0_0_15px_rgba(239,68,68,0.03)] animate-pulse";
                sevColor = "text-rose-400 border-rose-500/30 bg-rose-500/15";
                titleColor = "text-rose-200";
              } else if (alert.severity === "HIGH") {
                alertBorder = "border-amber-500/30 hover:border-amber-500/50 bg-amber-500/5";
                sevColor = "text-amber-400 border-amber-500/30 bg-amber-500/15";
                titleColor = "text-amber-200";
              } else if (alert.severity === "MEDIUM") {
                alertBorder = "border-sky-500/20 hover:border-sky-500/40 bg-sky-500/5";
                sevColor = "text-sky-400 border-sky-500/30 bg-sky-500/10";
              }

              return (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border flex flex-col justify-between transition gap-2 ${alertBorder}`}
                >
                  <div>
                    {/* Header: source and priority badge */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono bg-gray-905 text-gray-400 border border-gray-800 px-2 py-0.5 rounded">
                          {alert.targetName}
                        </span>
                      </div>
                      <span className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded border ${sevColor}`}>
                        {alert.severity}
                      </span>
                    </div>

                    {/* Alert Title */}
                    <h4 className={`text-sm font-bold font-sans tracking-tight mb-1.5 ${titleColor}`}>
                      {alert.title}
                    </h4>

                    {/* Description text */}
                    <p className="text-xs text-gray-400 font-mono leading-relaxed mb-3">
                      {alert.description}
                    </p>
                  </div>

                  {/* Immediate Recommendation strategic advice box */}
                  <div className="p-3 bg-gray-950 rounded border border-gray-900 flex items-start gap-2">
                    <div className="text-[11px] font-mono leading-relaxed text-gray-300">
                      <strong className="text-emerald-400 text-[10px] uppercase block mb-1 font-bold tracking-widest flex items-center gap-1">
                        <Flame className="h-3 w-3 stroke-2 animate-bounce" /> Tactical Entry / Exit playbook:
                      </strong>
                      {alert.action}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Footer disclaimer */}
      <div className="hidden sm:block text-[10px] font-mono text-gray-600 border-t border-gray-900 pt-3 mt-4">
        * Recommendations generated via real-time Bright Data scraper telemetry filtered through server-side AI rules. Maintain risk-off scaling postures.
      </div>
    </div>
  );
};
