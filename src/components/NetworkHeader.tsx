import React, { useState, useEffect } from "react";
import { Shield, Cpu, RefreshCw, Layers, Sliders, Wifi } from "lucide-react";

interface NetworkHeaderProps {
  isSimulation: boolean;
  onOpenConfig: () => void;
  isRunning: boolean;
  onTriggerDefault: (type: string) => void;
}

export const NetworkHeader: React.FC<NetworkHeaderProps> = ({
  isSimulation,
  onOpenConfig,
  isRunning,
  onTriggerDefault,
}) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").substring(0, 19) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md z-10 select-none">
      {/* Brand Logo & Tag */}
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.25)]">
          <Layers className="h-4 w-4 text-black stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xs font-bold tracking-[0.25em] uppercase text-cyan-400 flex items-center gap-2">
            AlphaScout AI
            <span className="text-[9px] font-mono tracking-widest uppercase bg-cyan-400/10 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-400/20 font-bold">
              v1.0-Sec
            </span>
          </h1>
          <p className="text-[10px] text-white/40 font-mono">
            ID: ORBITER_PIPELINE_7749-ALPHA
          </p>
        </div>
      </div>

      {/* Right Controls & Clock */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Connection status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-white/[0.02] border border-white/5 text-[10px] font-mono text-white/60">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">ORCHESTRATOR LIVE</span>
        </div>

        {/* Dynamic simulation warning */}
        {isSimulation && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-300">
            <Shield className="h-3 w-3" />
            <span>SIMULATION</span>
          </div>
        )}

        {/* Live Clock */}
        <div className="hidden md:block text-[10px] font-mono text-white/40 bg-white/[0.01] px-2.5 py-1 rounded border border-white/5">
          {time || "2026-05-25 19:54:37 UTC"}
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block text-right">
            <p className="text-[9px] uppercase tracking-widest text-white/30 mb-0.5">System Health</p>
            <p className="text-[10px] font-mono font-bold text-emerald-400">OPERATIONAL</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        </div>

        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

        {/* Credentials Settings Toggle */}
        <button
          id="btn-open-config"
          onClick={onOpenConfig}
          className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-cyan-400 text-black rounded text-[10px] uppercase font-bold tracking-wider font-mono transition-colors cursor-pointer"
        >
          <Sliders className="h-3 w-3" />
          <span>CONFIG</span>
        </button>
      </div>
    </header>
  );
};

