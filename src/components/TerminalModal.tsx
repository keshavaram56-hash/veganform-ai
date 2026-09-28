import React, { useState, useEffect } from 'react';
import { Activity, X, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Bio-Computational Physics Engine initialized on deterministic matrix cores',
    '[LOAD] Botanical ontology loaded: 3,842 verified molecular isolates across 14 categories',
    '[SPECTRO] Reference myofibrillar deconstruction complete: Actin (18.2%), Myosin (43.1%)',
    '[CONSTRAINTS] Boundary enforcement active: Zero allergen cross-contamination verified',
    '[PARETO] Exploring multi-objective frontier: Taste, Texture, Nutrition, Cost, Carbon LCA',
    '[SIM_RUN #8841-B] Converged in 38.4ms. Top 3 candidates synthesized with Pareto efficiency',
    '[READY] In-silico twin-screw texturization model verified. Ready for pilot lab export.'
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const liveTelemetry = [
        `[TELEMETRY] Extruder Zone 4 barrel shear rate: 320 RPM | Die pressure: 2.2 MPa | pH: 6.84`,
        `[SPECTRO] Real-time confocal laser telemetry stable: Zero off-target biopolymer denaturations.`,
        `[CALC] In-memory graph query latency: 0.16ms | Deterministic cache hit ratio: 99.6%`,
      ];
      const randomLine = liveTelemetry[Math.floor(Math.random() * liveTelemetry.length)];
      setLogs((prev) => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${randomLine}`]);
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const cmd = inputVal.trim();
    setInputVal('');

    setLogs((prev) => [...prev, `$ ${cmd}`]);

    if (cmd.toLowerCase() === 'clear') {
      setLogs([]);
      return;
    }

    if (cmd.toLowerCase() === 'help') {
      setLogs((prev) => [
        ...prev,
        'Available diagnostic commands:',
        '  status     - Show bio-engine and deterministic thread status',
        '  recompute  - Trigger in-silico Pareto frontier re-synthesis',
        '  clear      - Clear diagnostic log stream',
        '  ping       - Test pilot formulation server connection'
      ]);
      return;
    }

    if (cmd.toLowerCase() === 'recompute') {
      setIsSimulating(true);
      setLogs((prev) => [...prev, '>>> Running iterative shear-cell permutations...']);
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          '>>> Permutation complete: Pareto frontier re-converged. Candidate VFA-CHK-092 maintains #1.'
        ]);
        setIsSimulating(false);
      }, 1200);
      return;
    }

    setLogs((prev) => [...prev, `Command executed: "${cmd}". Type "help" for diagnostic commands.`]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-[#E5EAE7] rounded-2xl shadow-dropdown overflow-hidden flex flex-col h-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="px-5 py-3.5 bg-[#F8FAF9] border-b border-[#E5EAE7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
            <Activity className="w-4 h-4 text-[#059669]" />
            <span className="text-xs font-semibold text-[#17201C]">
              R&amp;D Engine Telemetry &amp; Diagnostics
            </span>
            <span className="text-[11px] bg-[#ECFDF5] text-[#059669] px-2 py-0.5 rounded border border-[#BBF7D0] font-medium">
              Live Link
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLogs([])}
              className="text-xs text-[#66716B] hover:text-[#17201C] px-2.5 py-1 rounded-md bg-white border border-[#E5EAE7] transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="text-[#66716B] hover:text-[#17201C] p-1 rounded-lg hover:bg-[#F3F6F4] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logs Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-[#334155] space-y-1.5 bg-[#F8FAF9]">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.startsWith('$')
                  ? 'text-[#059669] font-semibold'
                  : log.includes('[SPECTRO]')
                  ? 'text-[#0284C7]'
                  : log.includes('[PARETO]')
                  ? 'text-[#D97706]'
                  : log.includes('[READY]')
                  ? 'text-[#059669] font-medium'
                  : 'text-[#64748B]'
              }`}
            >
              {log}
            </div>
          ))}
          {isSimulating && (
            <div className="flex items-center gap-2 text-[#059669] animate-pulse font-medium">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running parallel in-silico texturization tensors...</span>
            </div>
          )}
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleCommand} className="p-3 bg-white border-t border-[#E5EAE7] flex items-center gap-2">
          <span className="font-mono text-xs text-[#059669] font-bold pl-1">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'recompute', 'status', or custom bio-query..."
            className="flex-1 bg-transparent font-mono text-xs text-[#17201C] placeholder-[#66716B]/60 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#F0FDF4] border border-[#BBF7D0] text-[#059669] text-xs font-medium rounded-lg hover:bg-[#DCFCE7] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>Run</span>
          </button>
        </form>
      </div>
    </div>
  );
};
