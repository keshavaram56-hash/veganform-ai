import React, { useState, useEffect } from 'react';
import { Activity, X, RefreshCw, Send, CheckCircle2, Terminal } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#082A23]/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white border border-[#D9E2DC] rounded-3xl shadow-dropdown overflow-hidden flex flex-col h-[520px] min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div className="px-5 py-3.5 bg-[#EEF3ED] border-b border-[#D9E2DC] flex items-center justify-between min-w-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#35D39A] animate-pulse shrink-0" />
            <Activity className="w-4 h-4 text-[#063B2E] shrink-0" />
            <span className="text-xs font-display font-bold text-[#063B2E] truncate">
              R&amp;D Engine Telemetry &amp; Diagnostics
            </span>
            <span className="text-[10px] font-mono bg-white text-[#063B2E] px-2 py-0.5 rounded border border-[#0A9F6E]/30 font-semibold shrink-0">
              CUDA-BIO LIVE
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLogs([])}
              className="text-xs font-mono text-[#61706A] hover:text-[#10231D] px-2.5 py-1 rounded-lg bg-white border border-[#D9E2DC] transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={onClose}
              className="text-[#61706A] hover:text-[#10231D] p-1 rounded-xl hover:bg-[#EEF3ED] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logs Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-[#10231D] space-y-1.5 bg-[#F6F7F2]">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed break-words ${
                log.startsWith('$')
                  ? 'text-[#063B2E] font-bold'
                  : log.includes('[SPECTRO]')
                  ? 'text-[#8DB9C9]'
                  : log.includes('[PARETO]')
                  ? 'text-[#D99A32]'
                  : log.includes('[READY]')
                  ? 'text-[#063B2E] font-semibold'
                  : 'text-[#61706A]'
              }`}
            >
              {log}
            </div>
          ))}
          {isSimulating && (
            <div className="flex items-center gap-2 text-[#063B2E] animate-pulse font-semibold">
              <RefreshCw className="w-4 h-4 animate-spin text-[#0A9F6E]" />
              <span>Running parallel in-silico texturization tensors...</span>
            </div>
          )}
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleCommand} className="p-3 bg-white border-t border-[#D9E2DC] flex items-center gap-2 min-w-0">
          <span className="font-mono text-xs text-[#063B2E] font-bold pl-1 shrink-0">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'recompute', 'status', or custom bio-query..."
            className="flex-1 bg-transparent font-mono text-xs text-[#10231D] placeholder-[#61706A]/60 focus:outline-none min-w-0"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#063B2E] hover:bg-[#082A23] text-white text-xs font-mono font-medium rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle shrink-0"
          >
            <Send className="w-3 h-3 text-[#35D39A]" />
            <span>Run</span>
          </button>
        </form>
      </div>
    </div>
  );
};
