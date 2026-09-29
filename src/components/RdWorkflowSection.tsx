import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Scissors,
  Layers,
  FlaskConical,
  Cpu,
  ShieldCheck,
  Award,
  ArrowRight,
  Play,
  Pause,
  CheckCircle2,
  Sliders,
  Sparkles,
  Microscope,
  Info
} from 'lucide-react';

interface RdWorkflowSectionProps {
  onNavigateFormulate: () => void;
  onNavigateCandidates: () => void;
}

const WORKFLOW_STAGES = [
  {
    step: '01',
    id: 'target',
    title: 'Target Profiling',
    subtitle: 'Animal Food Archetype',
    icon: Target,
    tag: 'Baseline Specification',
    headline: 'Deconstruct Conventional Protein Matrix',
    desc: 'Target food characteristics (e.g. Gallus gallus whole muscle tissue or bovine casein colloid) are quantitatively indexed for fibrillar length, moisture retention, lipid droplet dispersion, and DIAAS essential amino acid thresholds.',
    metrics: [
      { label: 'Reference Substrate', value: 'Avian Myofibril' },
      { label: 'Target Moisture', value: '64.2% wt' },
      { label: 'Protein Minimum', value: '22g / 100g' },
      { label: 'Isoelectric Point', value: 'pH 5.4' }
    ],
    technicalNote: 'Quantifies muscle fascicle diameter (40-60μm) and water-holding capacity (WHC) under physiological salinity (0.6M NaCl).'
  },
  {
    step: '02',
    id: 'deconstruct',
    title: 'Molecular Deconstruction',
    subtitle: 'Rheology & Denaturation',
    icon: Scissors,
    tag: 'Actomyosin Splitting',
    headline: 'Isolate Biomechanical & Sensory Drivers',
    desc: 'The animal product is split into functional building blocks: contractile fibrillar actomyosin, globular sarcoplasmic binders, and emulsion fats. Thermal denaturation plateaus (55°C myosin, 78°C actin) are mapped as benchmarks.',
    metrics: [
      { label: 'Myosin : Actin Ratio', value: '2.4 : 1' },
      { label: 'Thermal Peak 1', value: '58°C (Myosin)' },
      { label: 'Thermal Peak 2', value: '78°C (Actin)' },
      { label: 'Shear Modulus G*', value: '4.8 kPa' }
    ],
    technicalNote: 'Maps viscoelastic storage (G\') and loss modulus (G") across temperature sweep (20°C to 95°C) at 1 Hz oscillatory frequency.'
  },
  {
    step: '03',
    id: 'mapping',
    title: 'Botanical Mapping',
    subtitle: '3,842 Isolates Screened',
    icon: Layers,
    tag: 'Chemotype Matching',
    headline: 'High-Throughput In-Silico Screening',
    desc: 'The platform scans an extensive library of 3,842 botanical proteins, starches, and hydrocolloids. Candidates are evaluated for cross-linking synergy, clean taste profiles, and thermal gelling compatibility without animal inputs.',
    metrics: [
      { label: 'Screened Precursors', value: '3,842 Isolates' },
      { label: 'Primary Selected', value: 'Yellow Pea 85%' },
      { label: 'Secondary Binder', value: 'Faba Bean 82%' },
      { label: 'Hydrocolloid Cross', value: 'Methylcellulose' }
    ],
    technicalNote: 'Algorithms score complementary solubility, hydrophobic surface patches, and sulfhydryl group density for disulfide bridging.'
  },
  {
    step: '04',
    id: 'formulation',
    title: 'Batch Stoichiometry',
    subtitle: '100kg Wet-Lab Pilot Recipe',
    icon: FlaskConical,
    tag: 'Stoichiometric Precision',
    headline: 'Formulation Balancing Under Constraints',
    desc: 'The optimization engine calculates exact weight percentages for a 100kg wet-lab pilot batch. It optimizes dry isolate hydration, fat emulsification, natural flavor volatile complexes, and micronutrient fortificants.',
    metrics: [
      { label: 'Hydration Phase', value: '58.0 kg Water' },
      { label: 'Protein Phase', value: '24.5 kg Pea 85%' },
      { label: 'Lipid Emulsion', value: '8.2 kg Sunflower' },
      { label: 'Binding System', value: '1.8 kg E461' }
    ],
    technicalNote: 'Formulation balances dry-matter ratios (42% solids), salt-to-water ratio (1.2% NaCl), and phosphate buffer capacity.'
  },
  {
    step: '05',
    id: 'simulation',
    title: 'Extrusion Simulation',
    subtitle: 'Twin-Screw Rheology',
    icon: Cpu,
    tag: 'HMEC Process Directives',
    headline: 'Predictive Thermomechanical Texturization',
    desc: 'Models High-Moisture Extrusion Cooking (HMEC). The in-silico physics model calculates 5-zone barrel thermal transitions, screw shear rate, specific mechanical energy (SME), and laminar alignment inside the long cooling die.',
    metrics: [
      { label: 'Extruder Tech', value: 'HMEC Twin-Screw' },
      { label: 'Die Temp', value: '62°C Fixation' },
      { label: 'Screw Speed', value: '320 RPM' },
      { label: 'SME Energy', value: '112 kJ / kg' }
    ],
    technicalNote: 'Anisotropic fiber formation is modeled via 2D Navier-Stokes laminar shear boundary at the slit cooling die entrance.'
  },
  {
    step: '06',
    id: 'validation',
    title: 'Constraint Validation',
    subtitle: 'Allergen & Cost Enforcement',
    icon: ShieldCheck,
    tag: 'Zero-Tolerance Audit',
    headline: 'Rigorous Regulatory & Commercial Filtering',
    desc: 'Formulation permutations are strictly audited against user-specified hard constraints: Big-8 allergen exclusions (Soy, Gluten, Nuts, Dairy), target cost ceiling ($2.20/kg), non-GMO certification, and maximum sodium limits.',
    metrics: [
      { label: 'Allergen Audit', value: '100% Compliant' },
      { label: 'Cost Ceiling', value: '< $2.20 / kg' },
      { label: 'Non-GMO Verified', value: '100% IP Sourced' },
      { label: 'Sodium Ceiling', value: '< 420 mg / 100g' }
    ],
    technicalNote: 'Deterministic validator rejects candidates with undeclared trace allergens and automatically re-routes isolate blends.'
  },
  {
    step: '07',
    id: 'candidates',
    title: 'Pareto Candidate Dispatch',
    subtitle: 'Top 3 Converged Solutions',
    icon: Award,
    tag: 'Multi-Objective Frontier',
    headline: 'Ranked Prototypes Ready for Pilot Batch',
    desc: 'The Pareto optimizer outputs the top 3 balanced formulations. Each candidate is accompanied by a ready-to-run pilot recipe, bio-substitution map, nutrition facts panel, and SEM texture prediction.',
    metrics: [
      { label: 'Top Candidate', value: 'Alpha-1 (Score 94)' },
      { label: 'Unit Cost', value: '$2.10 / kg' },
      { label: 'Protein Density', value: '22.4g / 100g' },
      { label: 'LCA CO₂e Delta', value: '-78% CO₂e' }
    ],
    technicalNote: 'Weights multi-objective loss across taste, shear parity, protein density, commercial cost, and prototype carbon delta.'
  }
];

export const RdWorkflowSection: React.FC<RdWorkflowSectionProps> = ({
  onNavigateFormulate,
  onNavigateCandidates
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeStage = WORKFLOW_STAGES[activeStepIndex];

  // Auto-step timer when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A9F6E]" />
            <span className="font-mono text-xs font-semibold text-[#063B2E] uppercase tracking-wider">
              END-TO-END METHODOLOGY // 7-STAGE PIPELINE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#10231D] tracking-tight mt-1.5 break-words">
            Live Computational R&amp;D Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-[#61706A] mt-1.5 max-w-2xl leading-relaxed">
            Step through how VeganForm AI deconstructs animal molecular structures, screens thousands of plant isolates, and computes production-ready pilot formulations.
          </p>
        </div>

        {/* Auto-Play Control */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer border ${
              isPlaying
                ? 'bg-[#063B2E] text-white border-[#063B2E]'
                : 'bg-white hover:bg-[#EEF3ED] text-[#10231D] border-[#D9E2DC]'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#35D39A]" />
                <span>Pause Auto-Step</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#063B2E] fill-[#063B2E]" />
                <span>Simulate Pipeline</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Scrubbable 7-Stage Horizontal Pipeline Track */}
      <div className="p-2 rounded-2xl bg-white border border-[#D9E2DC] shadow-subtle overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-[760px]">
          {WORKFLOW_STAGES.map((stage, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = idx < activeStepIndex;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStepIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex-1 p-2.5 rounded-xl text-left transition-all cursor-pointer border min-w-0 ${
                  isActive
                    ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-xs'
                    : isCompleted
                    ? 'bg-[#EEF3ED] text-[#063B2E] border-[#D9E2DC] hover:bg-[#D9E2DC]'
                    : 'bg-[#F6F7F2] text-[#61706A] border-[#D9E2DC] hover:border-[#063B2E]/30 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#35D39A]' : isCompleted ? 'text-[#063B2E]' : 'text-[#61706A]'}`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#35D39A]' : isCompleted ? 'text-[#063B2E]' : 'text-[#61706A]'}`} />
                </div>
                <div className={`text-xs font-display font-bold leading-tight break-words ${isActive ? 'text-white' : 'text-[#10231D]'}`}>
                  {stage.title}
                </div>
                <div className={`text-[10px] leading-tight mt-0.5 break-words ${isActive ? 'text-white/70' : 'text-[#61706A]'}`}>
                  {stage.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Deep-Dive Inspection Cassette */}
      <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card flex flex-col gap-6 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#D9E2DC]">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#063B2E] text-[#35D39A] flex items-center justify-center shrink-0 shadow-xs">
              {React.createElement(activeStage.icon, { className: 'w-6 h-6' })}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#063B2E] bg-[#EEF3ED] px-2.5 py-0.5 rounded border border-[#D9E2DC]">
                  STAGE {activeStage.step} // {activeStage.tag.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-[#61706A] bg-[#F6F7F2] px-2 py-0.5 rounded border border-[#D9E2DC]">
                  IN-SILICO TELEMETRY
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#10231D] mt-1 break-words">
                {activeStage.headline}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs font-mono text-[#61706A] hidden sm:inline">Stage Progress:</span>
            <span className="text-xs font-mono font-bold text-[#063B2E] bg-[#EEF3ED] px-3 py-1 rounded-xl border border-[#D9E2DC]">
              {activeStepIndex + 1} of {WORKFLOW_STAGES.length}
            </span>
          </div>
        </div>

        {/* Narrative Description & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4 min-w-0">
            <p className="text-sm text-[#61706A] leading-relaxed break-words">
              {activeStage.desc}
            </p>

            {/* Scientific Rigor Note */}
            <div className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#063B2E] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-[10px] font-mono font-bold text-[#063B2E] uppercase">
                  Computational Science Protocol
                </span>
                <p className="text-xs text-[#61706A] leading-relaxed break-words">
                  {activeStage.technicalNote}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                onClick={onNavigateFormulate}
                className="px-4 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-display font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-subtle"
              >
                <span>Launch in Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#35D39A]" />
              </button>

              <button
                onClick={onNavigateCandidates}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#EEF3ED] text-[#10231D] border border-[#D9E2DC] font-medium text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>View Candidate Output</span>
              </button>
            </div>
          </div>

          {/* Real-time Computed Parameter Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#EEF3ED]/70 border border-[#D9E2DC]">
            {activeStage.metrics.map((m, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <span className="text-[10px] font-mono text-[#61706A] uppercase tracking-wider truncate">
                  {m.label}
                </span>
                <span className="text-sm sm:text-base font-display font-bold text-[#10231D] mt-1 break-words">
                  {m.value}
                </span>
                <span className="text-[9px] font-mono text-[#063B2E] mt-0.5 font-semibold">Verified In-Silico</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
