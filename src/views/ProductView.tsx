import React from 'react';
import { TabType } from '../types/formulation';
import { CELLULAR_HERO_IMAGE, ACTOMYOSIN_SCAN_IMAGE } from '../data/mockData';
import {
  Atom,
  ArrowRight,
  Play,
  TrendingDown,
  Zap,
  Leaf,
  ShieldCheck,
  Layers,
  FlaskConical,
  Activity,
  Microscope,
  Cpu,
  Sliders,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ProductViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
  onActivateDemo?: (productName?: string) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  onNavigate,
  onSelectCandidate,
  onActivateDemo
}) => {
  const handleLaunchDemo = (product = 'Chicken Nugget') => {
    if (onActivateDemo) {
      onActivateDemo(product);
    } else {
      onNavigate('demo');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-32 pt-20 max-w-5xl mx-auto gap-8 text-[#dfe4e0]">
      {/* Hero Section */}
      <section className="relative w-full rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Subtle scientific grid backdrop */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient subtle glow spots */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#059669]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Scientific Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121d17] border border-[#10b981]/30 w-fit shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="font-mono text-[11px] text-[#10b981] font-semibold tracking-widest uppercase">
              COMPUTATIONAL FOOD R&amp;D PLATFORM
            </span>
          </div>

          {/* Main Title & Lead */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              VEGANFORM AI <br />
              <span className="text-[#10b981] font-mono text-2xl sm:text-4xl block mt-1">
                Computational Food R&amp;D
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-[#8da396] leading-relaxed mt-2 font-normal">
              Convert conventional animal food concepts into optimized plant-based formulations through in-silico biopolymer permutation, functional mapping, and rheological parity modeling — before entering the wet lab.
            </p>
          </div>

          {/* Microscopy Scan Preview Card */}
          <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#1b2b22] bg-[#080d0b] shadow-xl group">
            <img
              src={CELLULAR_HERO_IMAGE}
              alt="High-resolution fluorescent cellular microscopy scan of plant-based protein matrix"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e0c] via-[#090e0c]/40 to-transparent" />

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#090e0c]/80 text-[#10b981] border border-[#10b981]/40 font-mono text-[10px] font-semibold tracking-wider">
                IN-SILICO SIMULATION #4982-B
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-xs text-white">
              <div className="flex items-center gap-2 bg-[#090e0c]/85 px-3 py-1.5 rounded-lg border border-[#1b2b22]">
                <Microscope className="w-4 h-4 text-[#10b981]" />
                <span className="text-[11px]">SEM Tomography: Cross-Linked Legumin Globulin Matrix (λ = 0.74)</span>
              </div>
              <span className="text-[10px] text-[#8da396] hidden sm:inline">
                200μm SCAN RESOLUTION
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
            <button
              onClick={() => onNavigate('formulate')}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:shadow-[0_0_32px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Launch Formulation Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleLaunchDemo('Chicken Nugget')}
              className="py-3.5 px-6 rounded-xl bg-[#121d17] hover:bg-[#182820] border border-[#1b2b22] hover:border-[#10b981]/50 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
            >
              <Play className="w-4 h-4 text-[#10b981] fill-[#10b981]" />
              <span>Launch Interactive Demo (Offline Ready)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Key Telemetry Impact Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
        <div className="flex flex-col p-4 rounded-2xl bg-[#0e1612] border border-[#1b2b22] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">VELOCITY</span>
            <Zap className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white font-mono leading-none">4.2x</span>
          <span className="text-xs text-[#8da396] mt-1.5">Faster R&amp;D Pipeline</span>
        </div>

        <div className="flex flex-col p-4 rounded-2xl bg-[#0e1612] border border-[#1b2b22] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">BENCH CYCLES</span>
            <TrendingDown className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#10b981] font-mono leading-none">-65%</span>
          <span className="text-xs text-[#8da396] mt-1.5">Formulation Iterations</span>
        </div>

        <div className="flex flex-col p-4 rounded-2xl bg-[#0e1612] border border-[#1b2b22] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">PILOT EFFICIENCY</span>
            <Leaf className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-white font-mono leading-none">0.0 kg</span>
          <span className="text-xs text-[#8da396] mt-1.5">Phase-1 Bench Waste</span>
        </div>

        <div className="flex flex-col p-4 rounded-2xl bg-[#0e1612] border border-[#1b2b22] shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono text-[10px] text-[#8da396] uppercase font-semibold">BIO-CALCULATIONS</span>
            <Atom className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#10b981] font-mono leading-none">100%</span>
          <span className="text-xs text-[#8da396] mt-1.5">Deterministic Engines</span>
        </div>
      </section>

      {/* Real-time Rheology & Texture Radar Telemetry */}
      <section className="flex flex-col rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-6 shadow-xl gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#10b981] rounded-sm shadow-[0_0_8px_#10b981]" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Organoleptic Equilibrium Model</h2>
            </div>
            <p className="text-xs text-[#8da396] mt-0.5">
              Multi-dimensional Pareto frontier comparing botanical candidate against animal reference control
            </p>
          </div>
          <span className="font-mono text-[10px] text-[#10b981] bg-[#121d17] px-2.5 py-1 rounded-md border border-[#10b981]/25 self-start sm:self-auto font-semibold">
            PARETO FRONTIER v3.2
          </span>
        </div>

        {/* Interactive SVG Spider Chart */}
        <div className="relative w-full py-4 flex items-center justify-center bg-[#080d0b] rounded-2xl border border-[#1b2b22] overflow-hidden">
          <svg className="w-full h-64 max-w-md" viewBox="0 0 240 190">
            {/* Concentric Pentagons */}
            <polygon points="120,20 190,60 170,145 70,145 50,60" fill="none" stroke="#1f3328" strokeWidth="1.2" />
            <polygon points="120,45 165,72 152,128 88,128 75,72" fill="none" stroke="#1f3328" strokeDasharray="2,2" strokeWidth="1" />
            <polygon points="120,70 145,85 137,112 103,112 95,85" fill="none" stroke="#1f3328" strokeWidth="0.8" />

            {/* Axis Lines */}
            <line x1="120" y1="90" x2="120" y2="20" stroke="#1b2b22" strokeWidth="1" />
            <line x1="120" y1="90" x2="190" y2="60" stroke="#1b2b22" strokeWidth="1" />
            <line x1="120" y1="90" x2="170" y2="145" stroke="#1b2b22" strokeWidth="1" />
            <line x1="120" y1="90" x2="70" y2="145" stroke="#1b2b22" strokeWidth="1" />
            <line x1="120" y1="90" x2="50" y2="60" stroke="#1b2b22" strokeWidth="1" />

            {/* Baseline Animal Reference (Subtle Rose Dashed) */}
            <polygon
              points="120,28 178,66 158,136 82,134 58,68"
              fill="#fb7185"
              fillOpacity="0.08"
              stroke="#fb7185"
              strokeDasharray="3,3"
              strokeWidth="1.5"
            />

            {/* In-Silico Synthesis Polygon (Refined Emerald) */}
            <polygon
              points="120,24 182,64 162,140 78,141 54,64"
              fill="#10b981"
              fillOpacity="0.22"
              stroke="#10b981"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}
            />

            {/* Vertices */}
            <circle cx="120" cy="24" r="3" fill="#10b981" />
            <circle cx="182" cy="64" r="3" fill="#10b981" />
            <circle cx="162" cy="140" r="3" fill="#10b981" />
            <circle cx="78" cy="141" r="3" fill="#10b981" />
            <circle cx="54" cy="64" r="3" fill="#10b981" />

            {/* Axis Labels */}
            <text x="120" y="12" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="middle">
              MASTICATION / CHEW
            </text>
            <text x="202" y="62" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="start">
              MOISTURE RETENTION
            </text>
            <text x="175" y="158" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="start">
              FIBRILLAR SHEAR
            </text>
            <text x="65" y="158" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="end">
              LIPID EMULSION
            </text>
            <text x="38" y="62" fill="#dfe4e0" fontFamily="JetBrains Mono" fontSize="8" fontWeight="600" textAnchor="end">
              UMAMI VOLATILES
            </text>
          </svg>

          {/* Overlay Legend */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 bg-[#0e1612]/95 backdrop-blur-md p-2.5 rounded-xl border border-[#1b2b22] font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#fb7185] border-dashed" />
              <span className="text-[#8da396]">Animal Target Control</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#10b981] shadow-[0_0_6px_#10b981]" />
              <span className="text-[#10b981] font-semibold">Candidate Alpha-1 (In-Silico)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Computational Wet-Lab Flow */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#121d17] text-[#10b981] border border-[#10b981]/25 font-semibold">
              PIPELINE METHODOLOGY
            </span>
            <span className="font-mono text-[10px] text-[#8da396]">STAGE ARCHITECTURE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            5-Stage Computational Wet-Lab Flow
          </h2>
          <p className="text-xs sm:text-sm text-[#8da396]">
            Structured pipeline transforming animal molecular and rheological properties into plant-native equivalents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              title: 'Target Deconstruction',
              desc: 'Biochemical profiling of fibrillar actomyosin or casein micelle arrays.',
              tag: 'BASELINE SPEC'
            },
            {
              step: '02',
              title: 'Functional Mapping',
              desc: 'Gelation thresholds, water activity, and shear denaturation points.',
              tag: 'RHEOLOGY'
            },
            {
              step: '03',
              title: 'Botanical Permutation',
              desc: 'Screening 3,800+ plant isolates for complementary texturizing synergy.',
              tag: '1,420 BIOPOLYMERS'
            },
            {
              step: '04',
              title: 'Pareto Optimization',
              desc: 'Multi-objective balancing across taste, chew, protein, and unit cost.',
              tag: 'PARETO FRONT'
            },
            {
              step: '05',
              title: 'Lab Assay Directive',
              desc: 'Ready-to-run 100kg batch recipe with HMEC twin-screw thermal parameters.',
              tag: 'PILOT DISPATCH'
            }
          ].map((item) => (
            <div key={item.step} className="p-4 rounded-2xl bg-[#0c1410] border border-[#1b2b22] flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#121d17] border border-[#10b981]/30 text-[#10b981] flex items-center justify-center font-mono text-xs font-bold">
                    {item.step}
                  </span>
                  <span className="font-mono text-[9px] text-[#8da396] bg-[#080d0b] px-1.5 py-0.5 rounded border border-[#1b2b22]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-white text-sm mt-1">{item.title}</h3>
                <p className="text-xs text-[#8da396] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Biocentric Capabilities (Bento Grid) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white">Platform Capabilities</h2>
          <span className="font-mono text-[10px] text-[#10b981] bg-[#121d17] px-2 py-0.5 rounded border border-[#10b981]/25">
            ENTERPRISE SUITE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#0c1410] border border-[#1b2b22] flex flex-col gap-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#121d17] border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#080d0b] text-[#10b981] border border-[#1b2b22]">
                ONTOLOGY GRAPH
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Botanical Ingredient Intelligence</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Predictive cross-reactivity mapping for over 3,800 botanical proteins, starch scaffolds, and lipid dispersions with verified water holding capacity and thermal gelation properties.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1410] border border-[#1b2b22] flex flex-col gap-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#121d17] border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#080d0b] text-[#10b981] border border-[#1b2b22]">
                PARETO OPTIMIZER
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Multi-Objective Pareto Engine</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Dynamically balance competing priorities across taste similarity, tensile cutting resistance, protein density, commercial cost ceilings, and prototype carbon reduction.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1410] border border-[#1b2b22] flex flex-col gap-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#121d17] border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#080d0b] text-[#10b981] border border-[#1b2b22]">
                STRICT EXCLUSION
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Authoritative Allergen Enforcement</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Zero tolerance for declared allergen cross-contamination. Formulations with active restrictions (Soy, Gluten, Tree Nuts, Dairy, Egg) are strictly filtered and repaired before ranking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0c1410] border border-[#1b2b22] flex flex-col gap-2.5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#121d17] border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#080d0b] text-[#10b981] border border-[#1b2b22]">
                EXTRUSION REGIMENS
              </span>
            </div>
            <h3 className="font-bold text-white text-base">Extrusion Directives &amp; Pilot Scaling</h3>
            <p className="text-xs text-[#8da396] leading-relaxed">
              Generates ready-to-run 5-zone thermal profiles for High-Moisture Extrusion (HMEC), low moisture texturization, and wet spinning to match parallel fibrillar alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Laboratory Protocol Callout */}
      <section className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#0e1713] border border-[#10b981]/30 shadow-md">
        <ShieldCheck className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs text-[#10b981] font-bold uppercase tracking-wider">
            Mandatory Laboratory Validation Protocol
          </span>
          <p className="text-xs text-[#8da396] leading-relaxed">
            All generated formulations constitute in-silico computational predictions. Prior to commercial scale-up or sensory taste panels, formulations must undergo benchtop pilot trials, microbiological shelf-life assays, and formal allergen confirmation according to standard food safety regulations.
          </p>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 rounded-3xl bg-gradient-to-r from-[#0c1410] via-[#121f17] to-[#0c1410] border border-[#10b981]/40 shadow-2xl">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-white">Ready to Formulate a Bio-Equivalent Target?</h2>
          <p className="text-xs text-[#8da396]">
            Configure custom parameters or load a benchmark food target to run in-silico biopolymer permutation.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('formulate')}
            className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleLaunchDemo('Chicken Nugget')}
            className="py-3 px-4 rounded-xl bg-[#080d0b] hover:bg-[#121d17] border border-[#1b2b22] text-[#dfe4e0] font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#10b981]" />
            <span>Demo Mode</span>
          </button>
        </div>
      </section>
    </div>
  );
};
