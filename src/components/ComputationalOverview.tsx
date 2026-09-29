import React, { useState } from 'react';
import { TabType } from '../types/formulation';
import {
  Dna,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface ComputationalOverviewProps {
  onNavigate: (tab: TabType) => void;
  onSelectTarget: (targetName: string) => void;
}

export const ComputationalOverview: React.FC<ComputationalOverviewProps> = ({
  onNavigate,
  onSelectTarget
}) => {
  const [activeTarget, setActiveTarget] = useState<'salmon' | 'beef' | 'mutton' | 'fish'>('salmon');
  const [activeBiopolymerIndex, setActiveBiopolymerIndex] = useState<number>(0);

  const targetConfigs = {
    salmon: {
      name: 'Atlantic Salmon',
      tag: 'Marine Teleost',
      targetProtein: '20.4g',
      targetFat: '13.4g',
      moisture: '65%',
      shearForce: '14.2 N',
      shearModulus: 'λ = 0.82',
      primaryChallenge: 'Myotome lamellar sheet cleavage & Omega-3 lipid release',
      candidateName: 'Atlantic Plant Salmon Filet',
      candidateCode: 'VFA-SLM-701',
      candidateScore: 96,
      costDelta: '-34%',
      co2Delta: '-89%',
      diaasScore: '1.14',
      accentColor: '#E99A86',
      botanicals: [
        { name: 'Textured Pea Isolate 85%', role: 'Lamellar Myotome Scaffold', wt: '21.0%' },
        { name: 'Modified Tapioca Starch', role: 'Delicate Flake Fracture', wt: '6.5%' },
        { name: 'Canola & Algal Lipid Blend', role: 'Marine EPA/DHA Emulsion', wt: '8.5%' },
        { name: 'Mushroom 5\'-GMP Extract', role: 'Oceanic Umami Volatiles', wt: '2.0%' }
      ]
    },
    fish: {
      name: 'White Fish Fillet',
      tag: 'Demersal Teleost',
      targetProtein: '17.8g',
      targetFat: '0.8g',
      moisture: '80%',
      shearForce: '11.8 N',
      shearModulus: 'λ = 0.88',
      primaryChallenge: 'Pearlescent flake cleavage and translucent-to-opaque 52°C heat set',
      candidateName: 'Konjac & Pea Flaked Cod Fillet',
      candidateCode: 'VFA-FSH-801',
      candidateScore: 95,
      costDelta: '-42%',
      co2Delta: '-82%',
      diaasScore: '1.10',
      accentColor: '#8DB9C9',
      botanicals: [
        { name: 'Pea Protein Isolate 85%', role: 'Pearlescent Flake Core', wt: '18.0%' },
        { name: 'Modified Cassava Starch', role: 'Brittle Lamellar Fracture', wt: '8.5%' },
        { name: 'Native Potato Starch', role: 'High-Moisture Retention', wt: '5.5%' },
        { name: 'Cold-Set Methylcellulose', role: 'Thermal Poach Cohesion', wt: '2.0%' }
      ]
    },
    mutton: {
      name: 'Braised Mutton',
      tag: 'Ovine Ruminant',
      targetProtein: '20.3g',
      targetFat: '17.0g',
      moisture: '61%',
      shearForce: '24.5 N',
      shearModulus: 'λ = 0.74',
      primaryChallenge: 'Slow-twitch fiber chew & high-melting tallow mouth-coating (44°C)',
      candidateName: 'Slow-Braised Botanical Mutton Chunk',
      candidateCode: 'VFA-MUT-901',
      candidateScore: 97,
      costDelta: '-52%',
      co2Delta: '-94%',
      diaasScore: '1.16',
      accentColor: '#A8B98E',
      botanicals: [
        { name: 'High-Moisture Extruded Pea', role: 'Dense Slow-Twitch Chew', wt: '22.0%' },
        { name: 'Young Green Jackfruit Core', role: 'Coarse Muscle Striations', wt: '16.0%' },
        { name: 'Refined Lauric Coconut Lipid', role: 'High-Melt Ovine Tallow', wt: '6.5%' },
        { name: 'Ovine BCFA Botanical Blend', role: 'Gamey Volatile Synergy', wt: '2.5%' }
      ]
    },
    beef: {
      name: 'Ground Beef Patty',
      tag: 'Bovine Skeletal',
      targetProtein: '21.5g',
      targetFat: '15.0g',
      moisture: '62%',
      shearForce: '22.0 N',
      shearModulus: 'λ = 0.78',
      primaryChallenge: 'Coarse grind chew, heme pyrazine browning, and solid fat sizzle',
      candidateName: 'High-Tensile Sizzle Smash Beef Patty',
      candidateCode: 'VFA-BEF-001',
      candidateScore: 97,
      costDelta: '-48%',
      co2Delta: '-96%',
      diaasScore: '1.18',
      accentColor: '#C98278',
      botanicals: [
        { name: 'Textured Pea Isolate 85%', role: 'Granular Meat Grind Core', wt: '21.0%' },
        { name: 'Marbled Coconut Fat Pockets', role: 'Solid Fat Sizzle Rendering', wt: '12.0%' },
        { name: 'Mushroom Heme Catalysts', role: 'Sear Pyrazine Aromas', wt: '3.5%' },
        { name: 'Betalain Browning Extract', role: 'Raw-to-Caramelized Shift', wt: '1.5%' }
      ]
    }
  };

  const current = targetConfigs[activeTarget];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Editorial Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-[#D9E2DC]">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A9F6E] animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-[#063B2E] font-bold uppercase">
              COMPUTATIONAL FOOD R&amp;D PLATFORM // SYSTEM OVERVIEW
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#10231D] tracking-tight mt-1.5 break-words">
            Formulate with botanical bio-parity.
          </h1>
          <p className="text-xs sm:text-sm text-[#61706A] mt-2 max-w-3xl leading-relaxed">
            VeganForm AI deconstructs animal muscle, milk, and fat architectures down to molecular shear modulus, lipid melting transitions, and DIAAS amino acid profiles — then synthesizes high-fidelity botanical formulations through in-silico biopolymer permutation.
          </p>
        </div>

        {/* Quick Archetype Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-[#EEF3ED] p-1.5 rounded-2xl border border-[#D9E2DC] self-start md:self-auto shrink-0 shadow-subtle">
          {(['salmon', 'fish', 'mutton', 'beef'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTarget(t)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                activeTarget === t
                  ? 'bg-[#063B2E] text-white shadow-xs'
                  : 'text-[#61706A] hover:text-[#10231D] hover:bg-white/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Multi-Panel System Layout - Asymmetric 12-col Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* PANEL 1: TARGET FOOD (Left Column - 3 cols) */}
        <div className="lg:col-span-3 rounded-3xl bg-white border border-[#D9E2DC] p-6 flex flex-col justify-between shadow-card hover:border-[#063B2E]/40 transition-all min-w-0">
          <div className="flex flex-col gap-4 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D9E2DC]">
              <div className="flex items-center gap-2 min-w-0">
                <Dna className="w-4 h-4 text-[#063B2E] shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#063B2E] font-bold">
                  01 // TARGET FOOD
                </span>
              </div>
              <span
                className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase shrink-0"
                style={{ backgroundColor: `${current.accentColor}25`, color: '#10231D' }}
              >
                {current.tag}
              </span>
            </div>

            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#61706A] uppercase">Reference Benchmark</span>
              <h3 className="text-xl font-display font-extrabold text-[#10231D] tracking-tight mt-0.5 break-words">
                {current.name}
              </h3>
            </div>

            {/* Target Biological Telemetry Matrix */}
            <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-[#EEF3ED]/70 border border-[#D9E2DC]">
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Protein Ref</div>
                <div className="text-sm font-mono font-bold text-[#10231D]">{current.targetProtein}</div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Lipid Ref</div>
                <div className="text-sm font-mono font-bold text-[#10231D]">{current.targetFat}</div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Moisture</div>
                <div className="text-sm font-mono font-bold text-[#10231D]">{current.moisture}</div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Shear Modulus</div>
                <div className="text-sm font-mono font-bold text-[#063B2E]">{current.shearModulus}</div>
              </div>
            </div>

            {/* Structural Challenge Box */}
            <div className="p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC]">
              <div className="text-[10px] font-mono text-[#063B2E] uppercase font-bold flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A9F6E]" />
                <span>Microstructural Challenge</span>
              </div>
              <p className="text-xs text-[#61706A] leading-relaxed break-words">
                {current.primaryChallenge}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectTarget(current.name);
              onNavigate('formulate');
            }}
            className="mt-5 w-full py-2.5 px-3 rounded-2xl bg-[#EEF3ED] hover:bg-[#D9E2DC] text-[#10231D] text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D9E2DC]"
          >
            <span>Load in Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#063B2E]" />
          </button>
        </div>

        {/* PANEL 2: CENTRAL COMPUTATIONAL FORMULATION VISUALIZATION (Center - 6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white border border-[#D9E2DC] p-6 flex flex-col justify-between shadow-card relative overflow-hidden min-w-0">
          {/* Subtle laboratory ambient grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#D9E2DC_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-4 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#D9E2DC]">
              <div className="flex items-center gap-2 min-w-0">
                <Cpu className="w-4 h-4 text-[#0A9F6E] shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#063B2E] font-bold break-words">
                  CENTRAL COMPUTATIONAL FORMULATION VISUALIZATION
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#0A9F6E] animate-ping" />
                <span className="text-[10px] font-mono text-[#063B2E] font-bold">
                  LIVE CONVERGENCE
                </span>
              </div>
            </div>

            {/* Interactive Biopolymer Stream Visualization */}
            <div className="py-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-[#61706A] mb-2 gap-1">
                <span>BOTANICAL INGREDIENT SCATTER &amp; EMULSION COUPLING</span>
                <span className="text-[#063B2E] font-bold">4 Active Biopolymers</span>
              </div>

              {/* 4 Interactive Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {current.botanicals.map((botanical, idx) => {
                  const isSelected = activeBiopolymerIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveBiopolymerIndex(idx)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-w-0 ${
                        isSelected
                          ? 'bg-[#EEF3ED] border-[#063B2E] ring-2 ring-[#0A9F6E]/30 shadow-xs'
                          : 'bg-[#F6F7F2] border-[#D9E2DC] hover:border-[#063B2E]/40 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#063B2E]">
                          0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#10231D]">
                          {botanical.wt}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#10231D] mt-1.5 leading-snug break-words">
                        {botanical.name}
                      </div>
                      <div className="text-[10px] text-[#61706A] font-mono mt-1 leading-tight break-words">
                        {botanical.role}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-Silico Cross-Linking & Shear Modulus Display Canvas */}
            <div className="p-4 rounded-2xl bg-[#EEF3ED]/60 border border-[#D9E2DC] flex flex-col gap-3 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-1 border-b border-[#D9E2DC]/60">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#61706A] uppercase">Selected Scaffold Node</span>
                  <div className="text-xs font-bold text-[#10231D] break-words">
                    {current.botanicals[activeBiopolymerIndex]?.name} ({current.botanicals[activeBiopolymerIndex]?.wt})
                  </div>
                </div>
                <div className="sm:text-right min-w-0">
                  <span className="text-[10px] font-mono text-[#063B2E] uppercase font-bold">Functional Role</span>
                  <div className="text-xs font-mono text-[#063B2E] font-medium break-words">
                    {current.botanicals[activeBiopolymerIndex]?.role}
                  </div>
                </div>
              </div>

              {/* Kinetic Modulus Curve Visualizer */}
              <div className="w-full h-18 bg-white rounded-xl border border-[#D9E2DC] p-2 flex items-end justify-between gap-1 overflow-hidden relative">
                <div className="absolute top-1.5 left-2 text-[9px] font-mono text-[#61706A] bg-white/80 px-1 rounded">
                  G' Storage Modulus vs Angular Frequency (rad/s)
                </div>
                {[32, 45, 58, 62, 70, 78, 85, 89, 93, 95, 96, 96, 97, 98, 98, 99].map((val, vIdx) => (
                  <div key={vIdx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-gradient-to-t from-[#063B2E] to-[#0A9F6E] rounded-t-xs transition-all duration-300"
                      style={{ height: `${val * 0.48}px` }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-[#61706A] gap-2 pt-0.5">
                <span>Shear Rate: 1,200 s⁻¹</span>
                <span>Viscoelastic Cross-over: 68°C</span>
                <span className="text-[#063B2E] font-bold">Parity: 97.4%</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Ribbon */}
          <div className="relative z-10 mt-4 pt-3 border-t border-[#D9E2DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#61706A]">
              <Sparkles className="w-3.5 h-3.5 text-[#0A9F6E] shrink-0" />
              <span className="break-words">Multi-Objective Pareto Optimization Engine Ready</span>
            </div>

            <button
              onClick={() => onNavigate('candidates')}
              className="py-2.5 px-4 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle shrink-0"
            >
              <span>Explore Candidates Studio</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#35D39A]" />
            </button>
          </div>
        </div>

        {/* PANEL 3 & 4: CANDIDATE GENERATION & VALIDATION (Right Column - 3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-5 min-w-0">
          
          {/* Candidate Generation Card */}
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-5 flex flex-col gap-3 shadow-card hover:border-[#063B2E]/40 transition-all flex-1 min-w-0">
            <div className="flex items-center justify-between pb-2 border-b border-[#D9E2DC]">
              <div className="flex items-center gap-2 min-w-0">
                <Layers className="w-4 h-4 text-[#063B2E] shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#063B2E] font-bold">
                  03 // GENERATED
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#61706A] font-bold shrink-0">
                {current.candidateCode}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 min-w-0">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-display font-bold text-[#10231D] break-words">
                  {current.candidateName}
                </h4>
                <div className="text-[11px] font-mono text-[#063B2E] mt-0.5 font-semibold">
                  Pareto Optimal Rank #1
                </div>
              </div>

              {/* Minimalist Circular SVG Score Gauge */}
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#D9E2DC]"
                    strokeWidth="3.2"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#0A9F6E]"
                    strokeDasharray={`${current.candidateScore}, 100`}
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[11px] font-mono font-bold text-[#10231D]">
                  {current.candidateScore}
                </span>
              </div>
            </div>

            {/* Key Outcomes */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#D9E2DC]">
              <div className="p-2.5 rounded-xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] truncate">Unit Cost Delta</div>
                <div className="text-xs font-mono font-bold text-[#063B2E]">{current.costDelta}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] truncate">CO₂e Reduction</div>
                <div className="text-xs font-mono font-bold text-[#063B2E]">{current.co2Delta}</div>
              </div>
            </div>
          </div>

          {/* Validation Card - Content-driven layout with zero label/value collision */}
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-5 flex flex-col gap-3 shadow-card hover:border-[#063B2E]/40 transition-all flex-1 min-w-0">
            <div className="flex items-center justify-between pb-2 border-b border-[#D9E2DC]">
              <div className="flex items-center gap-2 min-w-0">
                <ShieldCheck className="w-4 h-4 text-[#0A9F6E] shrink-0" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#063B2E] font-bold">
                  04 // VALIDATION
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EEF3ED] text-[#0A9F6E] font-bold shrink-0 border border-[#D9E2DC]">
                100% CLEAR
              </span>
            </div>

            {/* Stacked rows for zero collision at narrow widths */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex flex-col gap-0.5 py-1 border-b border-[#D9E2DC]/50">
                <span className="text-[10px] font-mono text-[#61706A] uppercase">Allergen Cross-Audit</span>
                <span className="font-mono font-bold text-xs text-[#063B2E]">Big-9 Compliant</span>
              </div>
              <div className="flex flex-col gap-0.5 py-1 border-b border-[#D9E2DC]/50">
                <span className="text-[10px] font-mono text-[#61706A] uppercase">Nutritional DIAAS</span>
                <span className="font-mono font-bold text-xs text-[#063B2E]">{current.diaasScore} (Bovine/Marine Parity)</span>
              </div>
              <div className="flex flex-col gap-0.5 py-1">
                <span className="text-[10px] font-mono text-[#61706A] uppercase">Extruder Compatibility</span>
                <span className="font-mono font-bold text-xs text-[#10231D]">HMEC Twin-Screw Process</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#D9E2DC] text-[10px] font-mono text-[#61706A]">
              FDA / EFSA Novel Food Safety Verified
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
