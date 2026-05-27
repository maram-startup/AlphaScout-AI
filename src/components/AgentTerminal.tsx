import React, { useState, useEffect, useRef } from "react";
import { ScrapingLog } from "../types";
import { Terminal, ShieldAlert, Cpu, Heart, CircleDot, Play, ExternalLink, RefreshCw } from "lucide-react";

interface AgentTerminalProps {
  logs: ScrapingLog[];
  isRunning: boolean;
  onClear: () => void;
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({
  logs,
  isRunning,
  onClear,
}) => {
  const [filter, setFilter] = useState<string>("ALL");
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const filteredLogs = logs.filter((log) => {
    if (filter === "ALL") return true;
    return log.level === filter;
  });

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden flex flex-col h-full select-none">
      {/* Terminal Title Bar */}
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-gray-200 tracking-wide">
            BRIGHT DATA CLIENT TERMINAL FEED
          </span>
          {isRunning && (
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {/* Quick stats */}
          <div className="hidden md:flex items-center gap-4 text-[10px] font-mono text-gray-400">
            <div>
              Status: <span className={isRunning ? "text-emerald-400" : "text-gray-500"}>{isRunning ? "CRAWLING" : "IDLE"}</span>
            </div>
            <div>
              Unlocker Bypass: <span className="text-emerald-400 font-bold">100%</span>
            </div>
            <div>
              Proxy Rotation: <span className="text-emerald-400">RESIDENTIAL</span>
            </div>
          </div>
          <button
            onClick={onClear}
            className="text-[10px] bg-gray-800 hover:bg-gray-700 font-mono text-gray-300 font-bold px-2 py-0.5 rounded border border-gray-700"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Log Level Filters */}
      <div className="bg-gray-950/70 border-b border-gray-800/60 px-4 py-1.5 flex flex-wrap gap-2">
        {["ALL", "INFO", "SUCCESS", "WARNING", "ERROR"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl)}
            className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded transition ${
              filter === lvl
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                : "bg-gray-900/60 text-gray-400 hover:text-white border border-transparent"
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Terminal Lines Container */}
      <div 
        ref={terminalRef}
        className="p-4 flex-1 overflow-y-auto max-h-[300px] md:max-h-[350px] font-mono text-xs space-y-1.5 bg-gray-950 min-h-[180px] scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
      >
        {filteredLogs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 py-6 text-center">
            <Cpu className="h-6 w-6 stroke-1.5 text-gray-600 mb-2" />
            <p className="text-[11px]">No terminal signals recorded.</p>
            <p className="text-[10px] text-gray-600 mt-0.5">Submit an intelligence query to dispatch automated crawlers.</p>
          </div>
        ) : (
          filteredLogs.map((log) => {
            let badgeColor = "text-blue-400 bg-blue-500/10 border-blue-500/20";
            if (log.level === "SUCCESS") badgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
            if (log.level === "WARNING") badgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
            if (log.level === "ERROR") badgeColor = "text-rose-400 bg-rose-500/10 border-rose-500/20";

            return (
              <div 
                key={log.id} 
                className="flex items-start gap-2 py-1 border-b border-gray-900/30 hover:bg-gray-900/20 transition-colors"
              >
                <span className="text-[10px] text-gray-500 select-none flex-shrink-0 pt-0.5">
                  [{log.timestamp.substring(11, 19)}]
                </span>
                <span className={`text-[10px] font-bold uppercase px-1.5 rounded border ${badgeColor} select-none flex-shrink-0`}>
                  {log.level}
                </span>
                <span className="text-gray-300 leading-normal font-mono font-medium">
                  {log.message}
                </span>
                {log.target && (
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-gray-900 text-gray-400 rounded-md border border-gray-850 flex-shrink-0 ml-auto self-start">
                    {log.target}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
