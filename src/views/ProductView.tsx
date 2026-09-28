import React from 'react';
import { TabType } from '../types/formulation';
import { CELLULAR_HERO_IMAGE } from '../data/mockData';
import {
  ArrowRight,
  Play,
  TrendingDown,
  Zap,
  Leaf,
  Layers,
  FlaskConical,
  Activity,
  Microscope,
  Cpu,
  Sliders,
  DollarSign,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Smile
} from 'lucide-react';

interface ProductViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
  onActivateDemo?: (productName?: string) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({
  onNavigate,
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-32 pt-20 max-w-6xl mx-auto gap-10 text-[#17201C]">
      {/* Hero Section */}
      <section className="relative w-full rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-10 shadow-card overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #E5EAE7 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Scientific Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] w-fit">
            <span className="w-2 h-2 rounded-full bg-[#059669]" />
            <span className="text-xs font-semibold text-[#059669] tracking-wide uppercase">
              Computational Food R&amp;D Platform
            </span>
          </div>

          {/* Main Title & Hero Statements */}
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="text-xs font-bold tracking-widest text-[#059669] uppercase">
              VEGANFORM AI
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#17201C] leading-[1.15]">
              Computational Food R&amp;D
            </h1>
            <p className="text-xl sm:text-2xl text-[#66716B] font-medium leading-snug italic mt-1">
              "Design the next generation of plant-based foods."
            </p>
            <p className="text-sm sm:text-base text-[#66716B] leading-relaxed mt-2 font-normal">
              Convert conventional animal food concepts into optimized plant-based formulations through in-silico biopolymer permutation, functional mapping, and rheological parity modeling — before entering the wet lab.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => onNavigate('formulate')}
              className="py-3.5 px-6 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-subtle hover:shadow-card transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Start Formulation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('candidates')}
              className="py-3.5 px-6 rounded-xl bg-white hover:bg-[#F8FAF9] border border-[#E5EAE7] hover:border-[#D1DCD6] text-[#17201C] font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-subtle"
            >
              <Layers className="w-4 h-4 text-[#059669]" />
              <span>Explore Candidates</span>
            </button>

            <button
              onClick={() => handleLaunchDemo('Chicken Nugget')}
              className="py-3.5 px-5 rounded-xl bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] font-medium text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-subtle"
            >
              <Play className="w-4 h-4 text-[#D97706] fill-[#D97706]" />
              <span>Try Interactive Demo</span>
            </button>
          </div>

          {/* Microscopy Preview Card */}
          <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#E5EAE7] bg-[#F8FAF9] shadow-subtle group mt-2">
            <img
              src={CELLULAR_HERO_IMAGE}
              alt="Fluorescent cellular microscopy scan of plant-based protein matrix"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/90 text-[#17201C] border border-white/40 text-[11px] font-semibold tracking-wide backdrop-blur-xs">
                In-Silico Simulation #4982-B
              </span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/20">
                <Microscope className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">SEM Tomography: Cross-Linked Legumin Globulin Matrix (λ = 0.74)</span>
              </div>
              <span className="text-[11px] text-white/80 hidden sm:inline">
                200μm Scan Resolution
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Capability Cards: Taste, Texture, Nutrition, Cost, Sustainability */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#17201C]">Computational R&amp;D Capabilities</h2>
            <p className="text-xs text-[#66716B] mt-0.5">
              Five multi-objective optimization pillars evaluated across every candidate formulation
            </p>
          </div>
          <span className="text-xs font-semibold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
            5 Objective Pillars
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* 1. Taste */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669] mb-3">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#17201C]">Taste</h3>
              <p className="text-xs text-[#66716B] mt-1.5 leading-relaxed">
                Volatile aroma and flavor compound mapping matching natural savory and umami precursors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs">
              <span className="text-[#66716B]">Target Parity</span>
              <span className="font-semibold text-[#059669]">94% Match</span>
            </div>
          </div>

          {/* 2. Texture */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#059669] mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#17201C]">Texture</h3>
              <p className="text-xs text-[#66716B] mt-1.5 leading-relaxed">
                Shear-cell fibrillar alignment and moisture retention mimicking muscle grain and bite.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs">
              <span className="text-[#66716B]">Shear Parity</span>
              <span className="font-semibold text-[#059669]">96% Parity</span>
            </div>
          </div>

          {/* 3. Nutrition */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#17201C]">Nutrition</h3>
              <p className="text-xs text-[#66716B] mt-1.5 leading-relaxed">
                Complete DIAAS-equivalent amino acid profiles with low saturated fat and sodium controls.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs">
              <span className="text-[#66716B]">Protein Target</span>
              <span className="font-semibold text-[#0284C7]">22g / 100g</span>
            </div>
          </div>

          {/* 4. Cost */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center text-[#D97706] mb-3">
                <DollarSign className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#17201C]">Cost</h3>
              <p className="text-xs text-[#66716B] mt-1.5 leading-relaxed">
                Live ingredient market pricing ensuring commercial viability under strict target cost ceilings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs">
              <span className="text-[#66716B]">Ceiling</span>
              <span className="font-semibold text-[#D97706]">&lt; $2.20 / kg</span>
            </div>
          </div>

          {/* 5. Sustainability */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669] mb-3">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-[#17201C]">Sustainability</h3>
              <p className="text-xs text-[#66716B] mt-1.5 leading-relaxed">
                Biocentric LCA modeling estimating greenhouse gas emissions and blue water footprint savings.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5EAE7] flex items-center justify-between text-xs">
              <span className="text-[#66716B]">GHG Reduction</span>
              <span className="font-semibold text-[#059669]">-78% CO₂e</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Telemetry Impact Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        <div className="flex flex-col p-4 rounded-2xl bg-white border border-[#E5EAE7] shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#66716B] uppercase font-semibold">Velocity</span>
            <Zap className="w-4 h-4 text-[#059669]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#17201C] leading-none">4.2x</span>
          <span className="text-xs text-[#66716B] mt-1.5">Faster R&amp;D Pipeline</span>
        </div>

        <div className="flex flex-col p-4 rounded-2xl bg-white border border-[#E5EAE7] shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#66716B] uppercase font-semibold">Bench Cycles</span>
            <TrendingDown className="w-4 h-4 text-[#059669]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#059669] leading-none">-65%</span>
          <span className="text-xs text-[#66716B] mt-1.5">Formulation Iterations</span>
        </div>

        <div className="flex flex-col p-4 rounded-2xl bg-white border border-[#E5EAE7] shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#66716B] uppercase font-semibold">Pilot Efficiency</span>
            <Leaf className="w-4 h-4 text-[#059669]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#17201C] leading-none">0.0 kg</span>
          <span className="text-xs text-[#66716B] mt-1.5">Phase-1 Bench Waste</span>
        </div>

        <div className="flex flex-col p-4 rounded-2xl bg-white border border-[#E5EAE7] shadow-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#66716B] uppercase font-semibold">Reliability</span>
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold text-[#059669] leading-none">100%</span>
          <span className="text-xs text-[#66716B] mt-1.5">Deterministic Engines</span>
        </div>
      </section>

      {/* Real-time Rheology & Texture Radar Telemetry */}
      <section className="flex flex-col rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#059669] rounded-sm" />
              <h2 className="text-lg sm:text-xl font-bold text-[#17201C]">Organoleptic Equilibrium Model</h2>
            </div>
            <p className="text-xs text-[#66716B] mt-0.5">
              Multi-dimensional Pareto frontier comparing botanical candidate against animal reference control
            </p>
          </div>
          <span className="text-xs font-semibold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#BBF7D0] self-start sm:self-auto">
            Sensory Benchmark
          </span>
        </div>

        {/* Clean SVG Radar Chart */}
        <div className="relative w-full py-4 flex items-center justify-center bg-[#F8FAF9] rounded-2xl border border-[#E5EAE7] overflow-hidden">
          <svg className="w-full h-64 max-w-md" viewBox="0 0 240 190">
            {/* Concentric Pentagons */}
            <polygon points="120,20 190,60 170,145 70,145 50,60" fill="none" stroke="#E5EAE7" strokeWidth="1.2" />
            <polygon points="120,45 165,72 152,128 88,128 75,72" fill="none" stroke="#E5EAE7" strokeDasharray="2,2" strokeWidth="1" />
            <polygon points="120,70 145,85 137,112 103,112 95,85" fill="none" stroke="#E5EAE7" strokeWidth="0.8" />

            {/* Axis Lines */}
            <line x1="120" y1="90" x2="120" y2="20" stroke="#E5EAE7" strokeWidth="1" />
            <line x1="120" y1="90" x2="190" y2="60" stroke="#E5EAE7" strokeWidth="1" />
            <line x1="120" y1="90" x2="170" y2="145" stroke="#E5EAE7" strokeWidth="1" />
            <line x1="120" y1="90" x2="70" y2="145" stroke="#E5EAE7" strokeWidth="1" />
            <line x1="120" y1="90" x2="50" y2="60" stroke="#E5EAE7" strokeWidth="1" />

            {/* Baseline Animal Reference (Rose Dashed) */}
            <polygon
              points="120,28 178,66 158,136 82,134 58,68"
              fill="#F43F5E"
              fillOpacity="0.08"
              stroke="#F43F5E"
              strokeDasharray="3,3"
              strokeWidth="1.5"
            />

            {/* In-Silico Synthesis Polygon (Emerald) */}
            <polygon
              points="120,24 182,64 162,140 78,141 54,64"
              fill="#059669"
              fillOpacity="0.15"
              stroke="#059669"
              strokeWidth="2"
            />

            {/* Vertices */}
            <circle cx="120" cy="24" r="3" fill="#059669" />
            <circle cx="182" cy="64" r="3" fill="#059669" />
            <circle cx="162" cy="140" r="3" fill="#059669" />
            <circle cx="78" cy="141" r="3" fill="#059669" />
            <circle cx="54" cy="64" r="3" fill="#059669" />

            {/* Axis Labels */}
            <text x="120" y="12" fill="#66716B" fontSize="9" fontWeight="600" textAnchor="middle">
              Mastication / Chew
            </text>
            <text x="202" y="62" fill="#66716B" fontSize="9" fontWeight="600" textAnchor="start">
              Moisture Retention
            </text>
            <text x="175" y="158" fill="#66716B" fontSize="9" fontWeight="600" textAnchor="start">
              Fibrillar Shear
            </text>
            <text x="65" y="158" fill="#66716B" fontSize="9" fontWeight="600" textAnchor="end">
              Lipid Emulsion
            </text>
            <text x="38" y="62" fill="#66716B" fontSize="9" fontWeight="600" textAnchor="end">
              Umami Volatiles
            </text>
          </svg>

          {/* Overlay Legend */}
          <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-[#E5EAE7] text-xs shadow-subtle">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#F43F5E] border-dashed" />
              <span className="text-[#66716B]">Animal Target Control</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-1 bg-[#059669] rounded-full" />
              <span className="text-[#059669] font-medium">Candidate Alpha-1 (In-Silico)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Stage Computational Wet-Lab Flow */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-[#ECFDF5] text-[#059669] border border-[#BBF7D0] font-semibold">
              Pipeline Methodology
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#17201C] tracking-tight mt-1">
            5-Stage Computational Wet-Lab Flow
          </h2>
          <p className="text-xs sm:text-sm text-[#66716B]">
            Structured pipeline transforming animal molecular and rheological properties into plant-native equivalents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              title: 'Target Deconstruction',
              desc: 'Biochemical profiling of fibrillar actomyosin or casein micelle arrays.',
              tag: 'Baseline Spec'
            },
            {
              step: '02',
              title: 'Functional Mapping',
              desc: 'Gelation thresholds, water activity, and shear denaturation points.',
              tag: 'Rheology'
            },
            {
              step: '03',
              title: 'Botanical Permutation',
              desc: 'Screening 3,800+ plant isolates for complementary texturizing synergy.',
              tag: '1,420 Biopolymers'
            },
            {
              step: '04',
              title: 'Pareto Optimization',
              desc: 'Multi-objective balancing across taste, chew, protein, and unit cost.',
              tag: 'Pareto Front'
            },
            {
              step: '05',
              title: 'Lab Assay Directive',
              desc: 'Ready-to-run 100kg batch recipe with HMEC twin-screw thermal parameters.',
              tag: 'Pilot Dispatch'
            }
          ].map((item) => (
            <div key={item.step} className="p-4 rounded-2xl bg-white border border-[#E5EAE7] flex flex-col justify-between shadow-subtle">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-lg bg-[#ECFDF5] border border-[#BBF7D0] text-[#059669] flex items-center justify-center text-xs font-semibold">
                    {item.step}
                  </span>
                  <span className="text-[10px] text-[#66716B] bg-[#F8FAF9] px-1.5 py-0.5 rounded border border-[#E5EAE7]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-[#17201C] text-sm mt-1">{item.title}</h3>
                <p className="text-xs text-[#66716B] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Platform Capabilities (Bento Grid) */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-[#17201C]">Platform Capabilities</h2>
          <span className="text-xs text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#BBF7D0] font-semibold">
            Enterprise R&amp;D
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] flex flex-col gap-2.5 shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F8FAF9] text-[#059669] border border-[#E5EAE7]">
                Ontology Graph
              </span>
            </div>
            <h3 className="font-semibold text-[#17201C] text-base">Botanical Ingredient Intelligence</h3>
            <p className="text-xs text-[#66716B] leading-relaxed">
              Predictive cross-reactivity mapping for over 3,800 botanical proteins, starch scaffolds, and lipid dispersions with verified water holding capacity and thermal gelation properties.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] flex flex-col gap-2.5 shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                <Sliders className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F8FAF9] text-[#059669] border border-[#E5EAE7]">
                Pareto Optimizer
              </span>
            </div>
            <h3 className="font-semibold text-[#17201C] text-base">Multi-Objective Pareto Engine</h3>
            <p className="text-xs text-[#66716B] leading-relaxed">
              Dynamically balance competing priorities across taste similarity, tensile cutting resistance, protein density, commercial cost ceilings, and prototype carbon reduction.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] flex flex-col gap-2.5 shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F8FAF9] text-[#059669] border border-[#E5EAE7]">
                Strict Exclusion
              </span>
            </div>
            <h3 className="font-semibold text-[#17201C] text-base">Authoritative Allergen Enforcement</h3>
            <p className="text-xs text-[#66716B] leading-relaxed">
              Zero tolerance for declared allergen cross-contamination. Formulations with active restrictions (Soy, Gluten, Tree Nuts, Dairy, Egg) are strictly filtered and repaired before ranking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E5EAE7] flex flex-col gap-2.5 shadow-subtle">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#F8FAF9] text-[#059669] border border-[#E5EAE7]">
                Extrusion Regimens
              </span>
            </div>
            <h3 className="font-semibold text-[#17201C] text-base">Extrusion Directives &amp; Pilot Scaling</h3>
            <p className="text-xs text-[#66716B] leading-relaxed">
              Generates ready-to-run 5-zone thermal profiles for High-Moisture Extrusion (HMEC), low moisture texturization, and wet spinning to match parallel fibrillar alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Mandatory Laboratory Protocol Callout */}
      <section className="flex items-start gap-3.5 p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-subtle">
        <ShieldCheck className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-[#059669] font-bold uppercase tracking-wider">
            Mandatory Laboratory Validation Protocol
          </span>
          <p className="text-xs text-[#166534] leading-relaxed">
            All generated formulations constitute in-silico computational predictions. Prior to commercial scale-up or sensory taste panels, formulations must undergo benchtop pilot trials, microbiological shelf-life assays, and formal allergen confirmation according to standard food safety regulations.
          </p>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5EAE7] shadow-card">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-[#17201C]">Ready to Formulate a Bio-Equivalent Target?</h2>
          <p className="text-xs text-[#66716B]">
            Configure custom parameters or load a benchmark food target to run in-silico biopolymer permutation.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('formulate')}
            className="flex-1 sm:flex-initial py-3 px-5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-subtle transition-all cursor-pointer"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleLaunchDemo('Chicken Nugget')}
            className="py-3 px-4 rounded-xl bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />
            <span>Demo Mode</span>
          </button>
        </div>
      </section>
    </div>
  );
};
