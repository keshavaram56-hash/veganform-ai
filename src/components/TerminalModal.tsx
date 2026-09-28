import React, { useState, useEffect } from 'react';
import { Terminal, X, RefreshCw, Send, Activity } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Bio-Computational Physics Engine v3.2 initialized on high-throughput matrix cores',
    '[LOAD] Botanical ontology loaded: 3,842 verified molecular isolates across 14 kingdoms',
    '[SPECTRO] Reference myofibrillar deconstruction complete: Actin (18.2%), Myosin Heavy (43.1%)',
    '[CONSTRAINTS] Boundary enforcement active: Zero allergen cross-contamination verified',
    '[PARETO] Exploring multi-objective frontier: Taste, Texture, Nutrition, Cost, Carbon LCA',
    '[SIM_RUN #8841-B] Converged in 38.4ms. Top 3 candidates synthesized with Pareto efficiency',
    '[READY] In-silico twin-screw texturization model verified. Ready for wet-lab assay export.'
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
        '  clear      - Clear terminal log stream',
        '  ping       - Test Pilot Lab formulation server connection'
      ]);
      return;
    }

    if (cmd.toLowerCase() === 'recompute') {
      setIsSimulating(true);
      setLogs((prev) => [...prev, '>>> Running 10,000 iterative Monte-Carlo shear-cell permutations...']);
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          '>>> Iteration 10,000 complete: Pareto front re-converged. Candidate VFA-CHK-092 maintains #1.'
        ]);
        setIsSimulating(false);
      }, 1200);
      return;
    }

    setLogs((prev) => [...prev, `Command executed: "${cmd}". Type "help" for diagnostic commands.`]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#090e0c] border border-[#1b2b22] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col h-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="px-4 py-3 bg-[#0e1713] border-b border-[#1b2b22] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
            <Terminal className="w-4 h-4 text-[#10b981]" />
            <span className="font-mono text-xs font-bold text-white tracking-wide">
              VeganForm CUDA-BIO Synthesis Terminal [PID 0x8F94]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLogs([])}
              className="font-mono text-[10px] text-[#8da396] hover:text-[#10b981] px-2 py-0.5 rounded bg-[#121c17] border border-[#1b2b22] transition-colors cursor-pointer"
            >
              CLEAR
            </button>
            <button
              onClick={onClose}
              className="text-[#8da396] hover:text-white p-1 rounded-lg hover:bg-[#18261f] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Logs Output */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-[#dfe4e0] space-y-1.5 bg-[#090e0c]">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.startsWith('$')
                  ? 'text-[#10b981] font-semibold'
                  : log.includes('[SPECTRO]')
                  ? 'text-cyan-400'
                  : log.includes('[PARETO]')
                  ? 'text-amber-300'
                  : log.includes('[READY]')
                  ? 'text-emerald-400 font-semibold'
                  : 'text-[#8da396]'
              }`}
            >
              {log}
            </div>
          ))}
          {isSimulating && (
            <div className="flex items-center gap-2 text-[#10b981] animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Running parallel in-silico texturization tensors...</span>
            </div>
          )}
        </div>

        {/* Command Line Input */}
        <form onSubmit={handleCommand} className="p-3 bg-[#0e1713] border-t border-[#1b2b22] flex items-center gap-2">
          <span className="font-mono text-xs text-[#10b981] font-bold">$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'recompute', 'status', or custom bio-query..."
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-[#8da396]/50 focus:outline-none"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-[#121c17] border border-[#10b981]/40 text-[#10b981] font-mono text-xs rounded-lg hover:bg-[#10b981] hover:text-black transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3 h-3" />
            <span>EXEC</span>
          </button>
        </form>
      </div>
    </div>
  );
};
