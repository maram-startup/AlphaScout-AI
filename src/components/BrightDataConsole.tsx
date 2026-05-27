import React from "react";
import { BrightDataConfig } from "../types";
import { X, Shield, Eye, Settings, HelpCircle, HardDrive, Key } from "lucide-react";

interface BrightDataConsoleProps {
  config: BrightDataConfig;
  onChange: (updated: BrightDataConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const BrightDataConsole: React.FC<BrightDataConsoleProps> = ({
  config,
  onChange,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm select-none">
      <div 
        id="brightdata-console-panel"
        className="w-full max-w-md h-full bg-gray-950 border-l border-gray-800 p-6 flex flex-col justify-between overflow-y-auto"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold font-mono text-white tracking-wide uppercase">
                Crawler Config Desk
              </h2>
            </div>
            <button
              id="btn-close-config"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-900 p-1.5 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Description Section */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-md p-4 mb-6 text-xs text-gray-300">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 font-mono font-medium">
              <Shield className="h-4 w-4" />
              <span>BRIGHT DATA INTEGRATION CAPTURE</span>
            </div>
            We bypass strict bot protections (Cloudflare, AWS WAF, Akamai) using Bright Data's residential rotating crawl proxies. Headless requests are routed via real browsers to securely aggregate sentiment and raw code-bases.
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Scraping Browser endpoint */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                <HardDrive className="h-3 w-3 text-emerald-500" />
                Bright Data Scraping Connection
              </label>
              <input
                type="text"
                value={config.scrapingUrl}
                onChange={(e) => onChange({ ...config, scrapingUrl: e.target.value })}
                placeholder="wss://brd-customer-scraping-browser..."
                className="w-full bg-gray-900 border border-gray-850 px-3 py-2 rounded text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* API Proxy Key Password element */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                <Key className="h-3 w-3 text-emerald-500" />
                SuperProxy Master Key
              </label>
              <input
                type="password"
                value={config.apiKey}
                onChange={(e) => onChange({ ...config, apiKey: e.target.value })}
                placeholder="••••••••••••••••••••••••••••••••"
                className="w-full bg-gray-900 border border-gray-850 px-3 py-2 rounded text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* User Agent Spoofer */}
            <div>
              <label className="block text-[11px] font-mono font-bold text-gray-400 uppercase mb-1 flex items-center gap-1">
                <Eye className="h-3 w-3 text-emerald-500" />
                Browser Fingerprint spoof
              </label>
              <select
                value={config.userAgentHeader}
                onChange={(e) => onChange({ ...config, userAgentHeader: e.target.value })}
                className="w-full bg-gray-900 border border-gray-850 px-3 py-2 rounded text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="chrome-mac">Mozilla/5.0 (Macintosh; Intel Mac OS X 14) Chrome/120</option>
                <option value="safari-ios">Mozilla/5.0 (iPhone; CPU iPhone OS 17) Safari/605</option>
                <option value="firefox-linux">Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/Firefox</option>
              </select>
            </div>

            {/* Toggle Web Unlocker */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.webUnlockerEnabled}
                  onChange={(e) => onChange({ ...config, webUnlockerEnabled: e.target.checked })}
                  className="rounded border-gray-800 text-emerald-500 bg-gray-900 focus:ring-emerald-500/20 focus:ring-opacity-50 h-4 w-4"
                />
                <span className="text-xs font-mono font-bold text-gray-300">
                  ENABLE WEB UNLOCKER (JS BYPASS)
                </span>
              </label>
              <p className="text-[10px] text-gray-500 mt-1 pl-6">
                Unlocks dynamic websites, CAPTCHAs, and Turnstiles using automatic proxy rotations on targeted domains.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-800 pt-4 mt-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-900/40 p-2 rounded">
            <HelpCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span>Proxy Zone: <strong>Residential (HQ)</strong> with active DNS resolution on Bright Data servers.</span>
          </div>
          <button
            id="btn-save-config"
            onClick={onClose}
            className="w-full mt-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs rounded transition-colors"
          >
            CONFIRM SETTINGS
          </button>
        </div>
      </div>
    </div>
  );
};
