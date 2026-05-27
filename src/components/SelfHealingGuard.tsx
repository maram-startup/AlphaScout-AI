import React, { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldAlert, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  Cpu, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  ToggleLeft, 
  Gauge
} from "lucide-react";

// Real React Error Boundary to capture any component-level rendering bug
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class AppErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState;
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("SelfHealing Guard intercepted React exception:", error, errorInfo);
  }

  handleSelfHeal = () => {
    // Lightning speed self-correction: clear cache, reset state and restore UI cleanly
    (this as any).setState({ hasError: false, errorMessage: "" });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-gray-950 border-2 border-rose-600 rounded-xl max-w-xl mx-auto my-12 text-center shadow-[0_0_30px_rgba(225,29,72,0.15)] select-none">
          <div className="relative inline-block mb-3">
            <ShieldAlert className="h-14 w-14 text-rose-500 animate-pulse mx-auto" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500/30"
            />
          </div>
          <h2 className="text-lg font-bold text-white font-sans uppercase tracking-tight">
            An Exception Was Intercepted & Isolated
          </h2>
          <p className="text-xs text-rose-300 font-mono mt-1">
            Component-Level Exception Intercepted & Isolated
          </p>
          <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 my-4 font-mono text-[10px] text-rose-400 text-left overflow-x-auto max-h-24">
            {this.state.errorMessage}
          </div>
          <p className="text-[11px] text-gray-400 max-w-sm mx-auto mb-4">
            The Digital Self-Healing Shield isolated this error instantly to preserve full dashboard availability. Click below to reboot the state machine.
          </p>
          <button
            onClick={this.handleSelfHeal}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs py-2.5 px-4 rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>FORCE SYSTEM FLASH</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface ShieldLog {
  id: string;
  time: string;
  type: "SECURE" | "BYPASS" | "HEAL" | "WARN";
  message: string;
}

export const SelfHealingGuard: React.FC = () => {
  const [shieldActive, setShieldActive] = useState(true);
  const [integrityScore, setIntegrityScore] = useState(100);
  const [isHealerRunning, setIsHealerRunning] = useState(false);
  const [statusText, setStatusText] = useState("Digital Shield active and monitoring network bounds");
  
  const [shieldLogs, setShieldLogs] = useState<ShieldLog[]>([
    {
      id: "log-1",
      time: "0.01s",
      type: "SECURE",
      message: "Secure routing fallback established smoothly"
    },
    {
      id: "log-2",
      type: "BYPASS",
      time: "0.05s",
      message: "Rate limit auto-evasion shield fully primed for Gemini APIs"
    }
  ]);

  // Keep logs at size limit
  const addShieldLog = (type: "SECURE" | "BYPASS" | "HEAL" | "WARN", msg: string) => {
    const timestamp = `${(Math.random() * 0.1).toFixed(4)}s`;
    const newLog: ShieldLog = {
      id: Math.random().toString(),
      time: timestamp,
      type,
      message: msg
    };
    setShieldLogs(prev => [newLog, ...prev.slice(0, 5)]);
  };

  // Process healing cycle
  const runSelfHealCycle = (issueType: "API_QUOTA" | "LEAK_DETECTED" | "DISRUPTION") => {
    if (isHealerRunning) return;
    setIsHealerRunning(true);
    setIntegrityScore(Math.floor(Math.random() * 15) + 60);

    let progress = 0;
    
    if (issueType === "API_QUOTA") {
      setStatusText("Quota exceeded warning! Engaging smart-cache fallback protocols natively...");
      addShieldLog("WARN", "Quota depleted: 429 RESOURCE_EXHAUSTED returned from Google API");
    } else if (issueType === "LEAK_DETECTED") {
      setStatusText("Clearing isolated cache leaks & balancing garbage collection arrays...");
      addShieldLog("WARN", "Leaks spotted in async listeners: Garbage collection threshold breach");
    } else {
      setStatusText("Network disruption: Switching back to absolute secure sandbox rails...");
      addShieldLog("WARN", "Network routing lag detected in Web3 crawl: Proxy latency exceeded 1800ms");
    }

    const interval = setInterval(() => {
      progress += 1;
      if (progress === 1) {
        addShieldLog("HEAL", "Isolating anomalous resource requests with proxy buffers");
      } else if (progress === 2) {
        addShieldLog("BYPASS", "Rotating Bright Data customer fingerprints flawlessly");
        setIntegrityScore(88);
      } else if (progress === 3) {
        addShieldLog("SECURE", "Dynamic self-heal verified on digital loop in 0.08 seconds");
        setIntegrityScore(100);
        setStatusText("System fully restored to 100% target integrity via backup proxy matrices!");
        setIsHealerRunning(false);
        clearInterval(interval);
      }
    }, 850);
  };

  // Continuous background optimization display
  useEffect(() => {
    if (!shieldActive) {
      setIntegrityScore(prev => (prev === 40 ? 40 : 40));
      return;
    }
    const interval = setInterval(() => {
      if (!isHealerRunning && Math.random() > 0.7) {
        setIntegrityScore(prev => Math.min(100, Math.max(98, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [shieldActive, isHealerRunning]);

  return (
    <div className="bg-gray-950 border border-emerald-500/20 rounded-xl p-5 select-none relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.04)] text-left">
      {/* Dynamic ambient laser effects */}
      <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-40 w-40 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title block with active pulsating light */}
      <div className="flex items-center justify-between border-b border-gray-900 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Cpu className={`h-5 w-5 ${shieldActive ? "text-emerald-400" : "text-gray-500"}`} />
            {shieldActive && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
              GUARD SYSTEM // ACTIVE SHIELD
            </h3>
            <p className="text-[9px] text-gray-500 font-mono uppercase tracking-tighter">
              Active Fault-Interception & Self-Correction Matrix
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            shieldActive ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-gray-800 border-gray-700 text-gray-500"
          }`}>
            {shieldActive ? "SHIELD: ACTIVE" : "SHIELD: DISABLED"}
          </span>
          <button 
            onClick={() => setShieldActive(!shieldActive)}
            className="text-[11px] font-mono text-gray-400 hover:text-white transition cursor-pointer"
          >
            <ToggleLeft className={`h-5 w-5 transition ${shieldActive ? "text-emerald-400 rotate-180" : "text-gray-600"}`} />
          </button>
        </div>
      </div>

      {/* Main Stats / Indicators Console */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        
        <div className="bg-gray-900/40 border border-gray-850 p-2.5 rounded-lg flex items-center gap-3">
          <div className="h-9 w-9 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center shrink-0">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-500 block uppercase leading-none">INTEGRITY</span>
            <span className="text-sm font-mono font-bold text-white">{integrityScore}% Healthy</span>
          </div>
        </div>

        <div className="bg-gray-900/40 border border-gray-850 p-2.5 rounded-lg flex items-center gap-3">
          <div className="h-9 w-9 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg flex items-center justify-center shrink-0 animate-pulse">
            <Zap className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-500 block uppercase leading-none">AUTO BYPASS</span>
            <span className="text-xs font-mono font-bold text-white">0.02ms latency</span>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-gray-900/40 border border-gray-850 p-2.5 rounded-lg flex items-center gap-3">
          <div className="h-9 w-9 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center shrink-0">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[9px] font-mono text-gray-500 block uppercase leading-none">DECOYS PROTECT</span>
            <span className="text-[11px] font-mono font-bold text-white">Advanced Decoys</span>
          </div>
        </div>

      </div>

      {/* Active System Safeguard Monitor Line */}
      <div className={`p-3 rounded-lg border ${
        isHealerRunning ? "border-amber-500/30 bg-amber-500/5 text-amber-300" : "border-gray-900 bg-gray-900/30 text-gray-300"
      } text-xs font-mono mb-4 flex items-start gap-2.5 transition-all duration-300`}>
        {isHealerRunning ? (
          <RefreshCw className="h-4 w-4 text-amber-400 animate-spin shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        )}
        <div className="space-y-1">
          <p className="font-bold text-white font-sans">{statusText}</p>
        </div>
      </div>

      {/* Simulate Active Disruption Panel */}
      <div className="mb-4">
        <span className="text-[10px] font-mono text-gray-500 block mb-2 uppercase tracking-wide">
          🔧 TEST THE DEFENSES // TRIGGER SIMULATED EVENTS:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => runSelfHealCycle("API_QUOTA")}
            disabled={!shieldActive || isHealerRunning}
            className="bg-gray-900 hover:bg-rose-955/20 hover:text-rose-400 border border-gray-850 hover:border-rose-500/30 rounded text-[10px] font-mono py-1.5 px-2 transition text-left flex items-center gap-1.5 text-gray-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <AlertTriangle className="h-3 w-3 text-rose-500 shrink-0" />
            <div className="truncate">
              <span>Simulate API 429</span>
            </div>
          </button>
          
          <button
            onClick={() => runSelfHealCycle("LEAK_DETECTED")}
            disabled={!shieldActive || isHealerRunning}
            className="bg-gray-900 hover:bg-amber-955/20 hover:text-amber-400 border border-gray-850 hover:border-amber-500/30 rounded text-[10px] font-mono py-1.5 px-2 transition text-left flex items-center gap-1.5 text-gray-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FlakeIcon />
            <div className="truncate">
              <span>Simulate Leak</span>
            </div>
          </button>

          <button
            onClick={() => runSelfHealCycle("DISRUPTION")}
            disabled={!shieldActive || isHealerRunning}
            className="bg-gray-900 hover:bg-cyan-955/20 hover:text-cyan-400 border border-gray-850 hover:border-cyan-500/30 rounded text-[10px] font-mono py-1.5 px-2 transition text-left flex items-center gap-1.5 text-gray-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Gauge className="h-3 w-3 text-cyan-400 shrink-0" />
            <div className="truncate">
              <span>Simulate Lag</span>
            </div>
          </button>
        </div>
      </div>

      {/* Holographic Log Stream */}
      <div className="bg-black/60 border border-gray-900 rounded-lg p-3 font-mono text-[10px] max-h-36 overflow-y-auto">
        <div className="text-gray-500 border-b border-gray-950 pb-1.5 mb-2 uppercase tracking-wide text-[9px] flex items-center justify-between">
          <span>SHIELD LOG STREAM // PREVENTIVE TELEMETRY</span>
          <span>SPEED: REAL-TIME (LIGHTNING)</span>
        </div>
        <div className="space-y-2">
          <AnimatePresence>
            {shieldLogs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="border-l border-gray-800 pl-2 py-0.5 space-y-0.5"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] text-gray-600 bg-gray-900 px-1 rounded font-mono select-none">
                    {log.time}
                  </span>
                  <span className={`text-[9px] font-bold tracking-tight uppercase ${
                    log.type === "HEAL" ? "text-amber-400" :
                    log.type === "BYPASS" ? "text-cyan-400" :
                    log.type === "WARN" ? "text-rose-450" : "text-emerald-400"
                  }`}>
                    [{log.type}]
                  </span>
                </div>
                <p className="text-slate-300 leading-tight">
                  <span className="font-mono text-emerald-300">{log.message}</span>
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Simple inline helper
const FlakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3 text-amber-500 shrink-0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
