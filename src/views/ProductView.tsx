import React, { useState } from 'react';
import { TabType } from '../types/formulation';
import { ComputationalOverview } from '../components/ComputationalOverview';
import { TargetFoodsSection } from '../components/TargetFoodsSection';
import { RdWorkflowSection } from '../components/RdWorkflowSection';
import { ComputationalAnalyticsSection } from '../components/ComputationalAnalyticsSection';
import {
  ArrowRight,
  Play,
  TrendingDown,
  Zap,
  Leaf,
  Layers,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface ProductViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
  onActivateDemo?: (productName?: string) => void;
  onSelectTargetFood?: (targetName: string) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  onNavigate,
  onActivateDemo,
  onSelectTargetFood
}) => {
  const [selectedTargetHero, setSelectedTargetHero] = useState<string>('Atlantic Salmon');

  const handleLaunchDemo = (product = 'Atlantic Salmon') => {
    if (onActivateDemo) {
      onActivateDemo(product);
    } else {
      onNavigate('demo');
    }
  };

  const handleTargetSelection = (targetName: string) => {
    setSelectedTargetHero(targetName);
    if (onSelectTargetFood) {
      onSelectTargetFood(targetName);
    } else {
      onNavigate('formulate');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-6xl mx-auto gap-12 text-[#10231D]">
      {/* Visual Narrative Progress Spine */}
      <div className="w-full p-2.5 rounded-2xl bg-white border border-[#D9E2DC] shadow-subtle hidden md:flex items-center justify-between text-xs font-mono text-[#61706A]">
        <div className="flex items-center gap-2 pl-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#0A9F6E] animate-pulse" />
          <span className="font-bold text-[#063B2E]">R&amp;D PIPELINE STAGES:</span>
        </div>
        <div className="flex items-center gap-4 pr-2 overflow-x-auto min-w-0">
          {['Discover', 'Formulate', 'Simulate', 'Compare', 'Validate', 'Optimize', 'Document'].map((step, i) => (
            <div key={step} className="flex items-center gap-1.5 shrink-0">
              <span className="font-bold text-[#063B2E]">0{i + 1}</span>
              <span className="font-medium text-[#10231D]">{step}</span>
              {i < 6 && <span className="text-[#D9E2DC] ml-1">&rarr;</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 1. OVERVIEW — Sophisticated Multi-Panel System */}
      <ComputationalOverview
        onNavigate={onNavigate}
        onSelectTarget={handleTargetSelection}
      />

      {/* 2. TARGET FOODS SELECTION EXPERIENCE (SALMON | FISH | MUTTON | BEEF) */}
      <TargetFoodsSection
        onSelectTarget={handleTargetSelection}
        onNavigate={onNavigate}
      />

      {/* 3. LIVE R&D WORKFLOW PIPELINE (7-Stage Sequential Methodology) */}
      <RdWorkflowSection
        onNavigateFormulate={() => onNavigate('formulate')}
        onNavigateCandidates={() => onNavigate('candidates')}
      />

      {/* 4. COMPUTATIONAL ANALYTICS SUITE (Nutrition, Batch Composition, Cost, LCA, Texture) */}
      <ComputationalAnalyticsSection />

      {/* 5. 4-METRIC CLINICAL IMPACT STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="flex flex-col p-5 rounded-2xl bg-white border border-[#D9E2DC] shadow-subtle min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-[10px] font-mono text-[#61706A] uppercase tracking-wider font-semibold truncate">Bench Velocity</span>
            <Zap className="w-4 h-4 text-[#063B2E] shrink-0" />
          </div>
          <span className="text-3xl font-display font-bold text-[#063B2E] leading-none">4.2x</span>
          <span className="text-xs text-[#61706A] mt-2 font-medium">Faster R&amp;D Pipeline</span>
        </div>

        <div className="flex flex-col p-5 rounded-2xl bg-white border border-[#D9E2DC] shadow-subtle min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-[10px] font-mono text-[#61706A] uppercase tracking-wider font-semibold truncate">Bench Cycles</span>
            <TrendingDown className="w-4 h-4 text-[#0A9F6E] shrink-0" />
          </div>
          <span className="text-3xl font-display font-bold text-[#0A9F6E] leading-none">-65%</span>
          <span className="text-xs text-[#61706A] mt-2 font-medium">Formulation Iterations</span>
        </div>

        <div className="flex flex-col p-5 rounded-2xl bg-white border border-[#D9E2DC] shadow-subtle min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-[10px] font-mono text-[#61706A] uppercase tracking-wider font-semibold truncate">Bench Efficiency</span>
            <Leaf className="w-4 h-4 text-[#063B2E] shrink-0" />
          </div>
          <span className="text-3xl font-display font-bold text-[#063B2E] leading-none">0.0 kg</span>
          <span className="text-xs text-[#61706A] mt-2 font-medium">Phase-1 Bench Waste</span>
        </div>

        <div className="flex flex-col p-5 rounded-2xl bg-white border border-[#D9E2DC] shadow-subtle min-w-0">
          <div className="flex items-center justify-between mb-2 gap-2">
            <span className="text-[10px] font-mono text-[#61706A] uppercase tracking-wider font-semibold truncate">Reliability</span>
            <CheckCircle2 className="w-4 h-4 text-[#0A9F6E] shrink-0" />
          </div>
          <span className="text-3xl font-display font-bold text-[#0A9F6E] leading-none">100%</span>
          <span className="text-xs text-[#61706A] mt-2 font-medium">Deterministic Parity</span>
        </div>
      </section>

      {/* 6. ORGANOLEPTIC EQUILIBRIUM MODEL (Radar Benchmark) */}
      <section className="flex flex-col rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-4 bg-[#0A9F6E] rounded-sm shrink-0" />
              <h2 className="text-lg sm:text-xl font-display font-bold text-[#063B2E] break-words">Organoleptic Equilibrium Model</h2>
            </div>
            <p className="text-xs text-[#61706A] mt-1">
              Multi-dimensional Pareto frontier comparing botanical candidate against animal reference control
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#063B2E] bg-[#EEF3ED] px-3 py-1 rounded-md border border-[#D9E2DC] self-start sm:self-auto shrink-0">
            RADAR BENCHMARK // 5-AXIS
          </span>
        </div>

        {/* Clean SVG Radar Chart */}
        <div className="relative w-full py-6 flex items-center justify-center bg-[#F6F7F2] rounded-2xl border border-[#D9E2DC] overflow-hidden">
          <svg className="w-full h-72 max-w-lg" viewBox="0 0 240 190">
            {/* Concentric Pentagons */}
            <polygon points="120,20 190,60 170,145 70,145 50,60" fill="none" stroke="#D9E2DC" strokeWidth="1.2" />
            <polygon points="120,45 165,72 152,128 88,128 75,72" fill="none" stroke="#D9E2DC" strokeDasharray="2,2" strokeWidth="1" />
            <polygon points="120,70 145,85 137,112 103,112 95,85" fill="none" stroke="#D9E2DC" strokeWidth="0.8" />

            {/* Axis Lines */}
            <line x1="120" y1="90" x2="120" y2="20" stroke="#D9E2DC" strokeWidth="1" />
            <line x1="120" y1="90" x2="190" y2="60" stroke="#D9E2DC" strokeWidth="1" />
            <line x1="120" y1="90" x2="170" y2="145" stroke="#D9E2DC" strokeWidth="1" />
            <line x1="120" y1="90" x2="70" y2="145" stroke="#D9E2DC" strokeWidth="1" />
            <line x1="120" y1="90" x2="50" y2="60" stroke="#D9E2DC" strokeWidth="1" />

            {/* Baseline Animal Reference (Controlled Accent Muted Rose Dashed) */}
            <polygon
              points="120,28 178,66 158,136 82,134 58,68"
              fill="#C98278"
              fillOpacity="0.10"
              stroke="#C98278"
              strokeDasharray="3,3"
              strokeWidth="1.5"
            />

            {/* In-Silico Synthesis Polygon (Deep Botanical Green / Mint) */}
            <polygon
              points="120,24 182,64 162,140 78,141 54,64"
              fill="#0A9F6E"
              fillOpacity="0.18"
              stroke="#063B2E"
              strokeWidth="2.2"
            />

            {/* Vertices */}
            <circle cx="120" cy="24" r="3.5" fill="#063B2E" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="182" cy="64" r="3.5" fill="#063B2E" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="162" cy="140" r="3.5" fill="#063B2E" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="78" cy="141" r="3.5" fill="#063B2E" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="54" cy="64" r="3.5" fill="#063B2E" stroke="#ffffff" strokeWidth="1.5" />

            {/* Axis Labels */}
            <text x="120" y="11" fill="#61706A" fontSize="8.5" fontWeight="600" textAnchor="middle" fontFamily="JetBrains Mono">
              Mastication / Chew
            </text>
            <text x="202" y="62" fill="#61706A" fontSize="8.5" fontWeight="600" textAnchor="start" fontFamily="JetBrains Mono">
              Moisture Retention
            </text>
            <text x="175" y="158" fill="#61706A" fontSize="8.5" fontWeight="600" textAnchor="start" fontFamily="JetBrains Mono">
              Fibrillar Shear
            </text>
            <text x="65" y="158" fill="#61706A" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="JetBrains Mono">
              Lipid Emulsion
            </text>
            <text x="38" y="62" fill="#61706A" fontSize="8.5" fontWeight="600" textAnchor="end" fontFamily="JetBrains Mono">
              Umami Volatiles
            </text>
          </svg>

          {/* Overlay Legend */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-[#D9E2DC] text-xs shadow-subtle font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#C98278] border-dashed" />
              <span className="text-[#61706A] text-[11px]">Animal Control Target</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1.5 bg-[#063B2E] rounded-full" />
              <span className="text-[#10231D] font-bold text-[11px]">Candidate Alpha-1 (In-Silico)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CORE PLATFORM BENTO GRID */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-display font-bold text-[#063B2E]">Platform Capabilities</h2>
          <span className="text-xs font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-0.5 rounded border border-[#D9E2DC] font-semibold">
            ENTERPRISE R&amp;D
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-[#D9E2DC] flex flex-col gap-3 shadow-subtle hover:border-[#0A9F6E]/40 transition-all min-w-0">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F7F2] text-[#063B2E] border border-[#D9E2DC] font-bold">
                ONTOLOGY GRAPH
              </span>
            </div>
            <h3 className="font-display font-bold text-[#10231D] text-base">Botanical Ingredient Intelligence</h3>
            <p className="text-xs text-[#61706A] leading-relaxed">
              Predictive cross-reactivity mapping for over 3,800 botanical proteins, starch scaffolds, and lipid dispersions with verified water holding capacity and thermal gelation properties.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9E2DC] flex flex-col gap-3 shadow-subtle hover:border-[#0A9F6E]/40 transition-all min-w-0">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E]">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F7F2] text-[#063B2E] border border-[#D9E2DC] font-bold">
                PARETO OPTIMIZER
              </span>
            </div>
            <h3 className="font-display font-bold text-[#10231D] text-base">Multi-Objective Pareto Engine</h3>
            <p className="text-xs text-[#61706A] leading-relaxed">
              Dynamically balance competing priorities across taste similarity, tensile cutting resistance, protein density, commercial cost ceilings, and prototype carbon reduction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9E2DC] flex flex-col gap-3 shadow-subtle hover:border-[#0A9F6E]/40 transition-all min-w-0">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F7F2] text-[#063B2E] border border-[#D9E2DC] font-bold">
                STRICT EXCLUSION
              </span>
            </div>
            <h3 className="font-display font-bold text-[#10231D] text-base">Authoritative Allergen Enforcement</h3>
            <p className="text-xs text-[#61706A] leading-relaxed">
              Zero tolerance for declared allergen cross-contamination. Formulations with active restrictions (Soy, Gluten, Tree Nuts, Dairy, Egg) are strictly filtered and repaired before ranking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D9E2DC] flex flex-col gap-3 shadow-subtle hover:border-[#0A9F6E]/40 transition-all min-w-0">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F6F7F2] text-[#063B2E] border border-[#D9E2DC] font-bold">
                EXTRUSION REGIMENS
              </span>
            </div>
            <h3 className="font-display font-bold text-[#10231D] text-base">Extrusion Directives &amp; Pilot Scaling</h3>
            <p className="text-xs text-[#61706A] leading-relaxed">
              Generates ready-to-run 5-zone thermal profiles for High-Moisture Extrusion (HMEC), low moisture texturization, and wet spinning to match parallel fibrillar alignment.
            </p>
          </div>
        </div>
      </section>

      {/* 8. MANDATORY LABORATORY PROTOCOL CALLOUT */}
      <section className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] shadow-subtle">
        <ShieldCheck className="w-5 h-5 text-[#063B2E] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-xs font-mono text-[#063B2E] font-bold uppercase tracking-wider">
            MANDATORY LABORATORY VALIDATION PROTOCOL
          </span>
          <p className="text-xs text-[#61706A] leading-relaxed">
            All generated formulations constitute in-silico computational predictions. Prior to commercial scale-up or sensory taste panels, formulations must undergo benchtop pilot trials, microbiological shelf-life assays, and formal allergen confirmation according to standard food safety regulations.
          </p>
        </div>
      </section>

      {/* 9. BOTTOM WORKBENCH CTA */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E2DC] shadow-card">
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-xl font-display font-bold text-[#063B2E] break-words">Ready to Formulate a Bio-Equivalent Target?</h2>
          <p className="text-xs text-[#61706A]">
            Configure custom parameters or load a benchmark food target to run in-silico biopolymer permutation.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={() => onNavigate('formulate')}
            className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-card transition-all cursor-pointer"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-4 h-4 text-[#35D39A]" />
          </button>
          <button
            onClick={() => handleLaunchDemo('Chicken Nugget')}
            className="py-3 px-4 rounded-xl bg-[#D99A32]/10 hover:bg-[#D99A32]/20 border border-[#D99A32]/30 text-[#92400e] text-xs font-display font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#D99A32] fill-[#D99A32]" />
            <span>Try Demo</span>
          </button>
        </div>
      </section>
    </div>
  );
};
