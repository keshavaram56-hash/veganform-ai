import React, { useState } from 'react';
import { TabType, BaselineTarget, FormulationRequest } from '../types/formulation';
import { BASELINE_TARGETS, ACTOMYOSIN_SCAN_IMAGE } from '../data/mockData';
import {
  Search,
  FlaskConical,
  Sliders,
  ShieldAlert,
  Ban,
  Check,
  Info,
  Cpu,
  Sparkles,
  RotateCcw,
  CheckSquare,
  Square,
  Microscope,
  Leaf,
  Layers,
  Circle,
  Dna,
  Zap,
  CheckCircle2,
  ChevronRight,
  Target,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Play
} from 'lucide-react';

interface FormulateViewProps {
  onNavigate: (tab: TabType) => void;
  onSynthesize: (request: FormulationRequest) => void;
  isSynthesizing: boolean;
  currentSimulationStep?: string;
  simulationStepIndex?: number;
  totalSimulationSteps?: number;
  initialTargetName?: string;
  isDemoMode?: boolean;
}

const DEMO_PRESETS = [
  {
    id: 'salmon',
    name: 'Atlantic Salmon',
    subtitle: 'Marine Teleost Flake Matrix',
    proteinTarget: 20.4,
    costCeiling: 320,
    tastePriority: 96,
    texturePriority: 97,
    nutritionPriority: 92,
    costPriority: 74,
    sustainabilityPriority: 90,
    primaryBase: 'pea' as const,
    extrusionTech: 'hmec' as const,
    allergens: []
  },
  {
    id: 'white-fish',
    name: 'White Fish Fillet',
    subtitle: 'Demersal Pearlescent Flake',
    proteinTarget: 17.8,
    costCeiling: 220,
    tastePriority: 95,
    texturePriority: 96,
    nutritionPriority: 88,
    costPriority: 82,
    sustainabilityPriority: 88,
    primaryBase: 'pea' as const,
    extrusionTech: 'lmec' as const,
    allergens: []
  },
  {
    id: 'mutton',
    name: 'Braised Mutton',
    subtitle: 'Slow-Twitch Ovine Matrix',
    proteinTarget: 20.3,
    costCeiling: 260,
    tastePriority: 96,
    texturePriority: 97,
    nutritionPriority: 90,
    costPriority: 78,
    sustainabilityPriority: 92,
    primaryBase: 'pea' as const,
    extrusionTech: 'hmec' as const,
    allergens: []
  },
  {
    id: 'beef',
    name: 'Ground Beef Patty',
    subtitle: 'Bovine Coarse Grind Matrix',
    proteinTarget: 21.5,
    costCeiling: 240,
    tastePriority: 97,
    texturePriority: 97,
    nutritionPriority: 92,
    costPriority: 80,
    sustainabilityPriority: 94,
    primaryBase: 'pea' as const,
    extrusionTech: 'hmec' as const,
    allergens: []
  },
  {
    id: 'chicken-nugget',
    name: 'Chicken Nugget',
    subtitle: 'Whole Muscle Emulsion',
    proteinTarget: 22,
    costCeiling: 220,
    tastePriority: 94,
    texturePriority: 96,
    nutritionPriority: 88,
    costPriority: 76,
    sustainabilityPriority: 85,
    primaryBase: 'pea' as const,
    extrusionTech: 'hmec' as const,
    allergens: []
  },
  {
    id: 'mozzarella-cheese',
    name: 'Mozzarella Cheese',
    subtitle: 'Curd & Stretch Matrix',
    proteinTarget: 20,
    costCeiling: 260,
    tastePriority: 96,
    texturePriority: 95,
    nutritionPriority: 82,
    costPriority: 75,
    sustainabilityPriority: 85,
    primaryBase: 'cashew' as const,
    extrusionTech: 'lmec' as const,
    allergens: []
  },
  {
    id: 'milk',
    name: 'Milk',
    subtitle: 'Colloidal Bovine Dispersion',
    proteinTarget: 3.4,
    costCeiling: 65,
    tastePriority: 92,
    texturePriority: 90,
    nutritionPriority: 90,
    costPriority: 88,
    sustainabilityPriority: 92,
    primaryBase: 'oat' as const,
    extrusionTech: 'spinning' as const,
    allergens: []
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    subtitle: 'Cryogenic Frozen Emulsion',
    proteinTarget: 4.0,
    costCeiling: 190,
    tastePriority: 98,
    texturePriority: 94,
    nutritionPriority: 70,
    costPriority: 72,
    sustainabilityPriority: 80,
    primaryBase: 'coconut' as const,
    extrusionTech: 'lmec' as const,
    allergens: []
  },
  {
    id: 'egg',
    name: 'Egg',
    subtitle: 'Albumin & Vitellin Colloid',
    proteinTarget: 13,
    costCeiling: 140,
    tastePriority: 93,
    texturePriority: 95,
    nutritionPriority: 89,
    costPriority: 80,
    sustainabilityPriority: 88,
    primaryBase: 'chickpea' as const,
    extrusionTech: 'spinning' as const,
    allergens: []
  },
  {
    id: 'mayonnaise',
    name: 'Mayonnaise',
    subtitle: 'Oil-in-Water Colloid Matrix',
    proteinTarget: 1.5,
    costCeiling: 175,
    tastePriority: 95,
    texturePriority: 97,
    nutritionPriority: 65,
    costPriority: 82,
    sustainabilityPriority: 84,
    primaryBase: 'aquafaba' as const,
    extrusionTech: 'lmec' as const,
    allergens: []
  }
];

const SIMULATION_PIPELINE_STEPS = [
  'Deconstructing target matrix',
  'Mapping botanical ingredients',
  'Modeling texture interactions',
  'Generating candidates',
  'Validating constraints',
  'Estimating nutrition',
  'Estimating sustainability',
  'Finalizing formulation'
];

type WorkbenchStage = 'target' | 'constraints' | 'formulation' | 'analysis';

export const FormulateView: React.FC<FormulateViewProps> = ({
  onNavigate,
  onSynthesize,
  isSynthesizing,
  currentSimulationStep,
  simulationStepIndex = 1,
  totalSimulationSteps = 8,
  initialTargetName = 'Chicken Nugget',
  isDemoMode = false
}) => {
  const [workbenchStage, setWorkbenchStage] = useState<WorkbenchStage>('target');
  const [productQuery, setProductQuery] = useState(initialTargetName);
  const [selectedBaseline, setSelectedBaseline] = useState<BaselineTarget>(BASELINE_TARGETS[0]);

  // Priority weights (0-100)
  const [tastePriority, setTastePriority] = useState(94);
  const [texturePriority, setTexturePriority] = useState(96);
  const [nutritionPriority, setNutritionPriority] = useState(88);
  const [costPriority, setCostPriority] = useState(76);
  const [sustainabilityPriority, setSustainabilityPriority] = useState(85);

  // Numerical constraints
  const [costCeiling, setCostCeiling] = useState(250);
  const [proteinTarget, setProteinTarget] = useState(22);

  // Allergen restrictions
  const [allergenRestrictions, setAllergenRestrictions] = useState<string[]>([]);

  // Additional requirements text
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Processing constraints
  const [selectedBase, setSelectedBase] = useState<'pea' | 'soy' | 'mycoprotein' | 'faba'>('pea');
  const [extrusionTech, setExtrusionTech] = useState<'hmec' | 'lmec' | 'spinning' | 'bioprint'>('hmec');
  const [nonGmoOnly, setNonGmoOnly] = useState(true);
  const [sodiumCap, setSodiumCap] = useState(420);

  // Preset selection
  const handleSelectPreset = (presetName: string) => {
    setProductQuery(presetName);
    const preset = DEMO_PRESETS.find(p => p.name.toLowerCase() === presetName.toLowerCase());
    const matchedBaseline = BASELINE_TARGETS.find(b => b.name.toLowerCase().includes(presetName.toLowerCase().split(' ')[0])) || BASELINE_TARGETS[0];

    setSelectedBaseline(matchedBaseline);

    if (preset) {
      setProteinTarget(preset.proteinTarget);
      setCostCeiling(preset.costCeiling);
      setTastePriority(preset.tastePriority);
      setTexturePriority(preset.texturePriority);
      setNutritionPriority(preset.nutritionPriority);
      setCostPriority(preset.costPriority);
      setSustainabilityPriority(preset.sustainabilityPriority);
    }
  };

  const toggleAllergen = (allergen: string) => {
    setAllergenRestrictions(prev => {
      const isCurrentlySelected = prev.includes(allergen);
      const next = isCurrentlySelected ? prev.filter(a => a !== allergen) : [...prev, allergen];
      if (!isCurrentlySelected && allergen.toLowerCase().includes('soy') && selectedBase === 'soy') {
        setSelectedBase('pea');
      }
      return next;
    });
  };

  const handleResetForm = () => {
    handleSelectPreset('Chicken Nugget');
    setAllergenRestrictions([]);
    setAdditionalRequirements('');
    setSelectedBase('pea');
    setExtrusionTech('hmec');
    setNonGmoOnly(true);
    setSodiumCap(420);
    setWorkbenchStage('target');
  };

  const handleRunSynthesis = () => {
    const targetName = productQuery.trim() || selectedBaseline.name;
    const request: FormulationRequest = {
      productName: targetName,
      tastePriority,
      texturePriority,
      nutritionPriority,
      costPriority,
      sustainabilityPriority,
      costCeiling,
      proteinTarget,
      allergenRestrictions,
      additionalRequirements,
      primaryBase: selectedBase,
      extrusionTech
    };

    onSynthesize(request);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#10231D]">
      {/* Demo Mode Notice Banner if active */}
      {isDemoMode && (
        <div className="p-3.5 rounded-2xl bg-[#D99A32]/10 border border-[#D99A32]/30 flex items-center justify-between gap-3 text-xs shadow-subtle min-w-0">
          <div className="flex items-center gap-2 text-[#92400e] min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#D99A32] animate-pulse shrink-0" />
            <span className="font-semibold font-mono text-[11px] shrink-0">DEMO MODE ACTIVE:</span>
            <span className="truncate">Deterministic in-silico simulation active. Zero network reliance.</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-white text-[#92400e] border border-[#D99A32]/30 text-[10px] font-mono font-medium shrink-0">
            OFFLINE READY
          </span>
        </div>
      )}

      {/* Workbench Stage Stepper Navigation Header */}
      <section className="p-4 sm:p-5 rounded-3xl bg-white border border-[#D9E2DC] shadow-card flex flex-col gap-4 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E2DC]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#063B2E] text-[#35D39A] flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
              <FlaskConical className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider uppercase text-[#063B2E] font-bold">
                  FORMULATION WORKBENCH // R&amp;D INSTRUMENT
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#0A9F6E] animate-pulse" />
              </div>
              <h1 className="text-base sm:text-lg font-display font-bold text-[#10231D] truncate">
                {productQuery || selectedBaseline.name} Synthesis Workbench
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              onClick={handleResetForm}
              className="flex items-center gap-1.5 text-xs text-[#61706A] hover:text-[#10231D] transition-colors cursor-pointer font-mono px-2.5 py-1 rounded-lg bg-[#EEF3ED] border border-[#D9E2DC]"
              title="Reset all fields to standard defaults"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#063B2E]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 4 Multi-Panel R&D Composition */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { id: 'target', step: '01', title: 'Target Profile', subtitle: 'Archetype & benchmarks', icon: Target },
            { id: 'constraints', step: '02', title: 'Constraints', subtitle: 'Allergens & boundaries', icon: ShieldCheck },
            { id: 'formulation', step: '03', title: 'Formulation', subtitle: 'Pareto loss & base isolate', icon: Sliders },
            { id: 'analysis', step: '04', title: 'Computational Analysis', subtitle: 'In-silico preview & launch', icon: Cpu }
          ].map((stage) => {
            const isActive = workbenchStage === stage.id;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setWorkbenchStage(stage.id as WorkbenchStage)}
                className={`p-3 rounded-2xl text-left transition-all cursor-pointer border min-w-0 flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-xs'
                    : 'bg-[#F6F7F2] text-[#61706A] border-[#D9E2DC] hover:bg-white hover:border-[#063B2E]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#35D39A]' : 'text-[#063B2E]'}`}>
                    {stage.step}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#35D39A]' : 'text-[#61706A]'}`} />
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
      </section>

      {/* STAGE 1: TARGET FOOD ARCHETYPE */}
      {workbenchStage === 'target' && (
        <div className="flex flex-col gap-6 min-w-0">
          <section className="relative rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card overflow-hidden min-w-0">
            <div className="flex flex-col gap-5 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0A9F6E]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#063B2E]">
                    STAGE 01 // TARGET FOOD ARCHETYPE
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#61706A] bg-[#EEF3ED] px-2.5 py-0.5 rounded border border-[#D9E2DC]">
                  CONVENTIONAL REFERENCE
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="text-2xl font-display font-extrabold text-[#10231D] break-words">
                  Define Conventional Target Matrix
                </h2>
                <p className="text-xs sm:text-sm text-[#61706A] mt-1 max-w-2xl leading-relaxed">
                  Select a standardized reference archetype or input a custom animal product to deconstruct its myofibrillar or colloidal structure for plant-based replacement.
                </p>
              </div>

              {/* Target Search / Input Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#61706A] w-4 h-4" />
                <input
                  type="text"
                  value={productQuery}
                  onChange={(e) => setProductQuery(e.target.value)}
                  placeholder="Enter conventional food target (e.g. Chicken Nugget, Mozzarella Cheese, Milk, Ice Cream, Egg...)"
                  className="w-full bg-[#F6F7F2] border border-[#D9E2DC] rounded-xl pl-10 pr-4 py-3 text-sm text-[#10231D] placeholder-[#61706A]/60 focus:outline-none focus:border-[#063B2E] focus:bg-white transition-all font-sans"
                />
              </div>

              {/* Benchmark Target Preset Chips */}
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span className="text-xs text-[#61706A] font-mono font-medium mr-1">
                  Preset Benchmarks:
                </span>
                {DEMO_PRESETS.map((demo) => {
                  const isSelected = productQuery.toLowerCase() === demo.name.toLowerCase();
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleSelectPreset(demo.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#063B2E] text-white shadow-xs font-semibold'
                          : 'bg-[#EEF3ED] text-[#61706A] hover:text-[#10231D] hover:bg-white border border-[#D9E2DC]'
                      }`}
                    >
                      <span>{demo.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#35D39A]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Decoded Baseline Specs */}
          <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card overflow-hidden min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#D9E2DC]">
              <div className="min-w-0">
                <span className="text-xs font-mono text-[#063B2E] font-semibold uppercase tracking-wider">
                  DECODED BASELINE ARCHETYPE
                </span>
                <h3 className="text-xl font-display font-extrabold text-[#10231D] mt-1 break-words">
                  {selectedBaseline.name} Biochemical Profile
                </h3>
                <p className="text-xs text-[#61706A]">{selectedBaseline.subtitle}</p>
              </div>
              <span className="text-xs font-mono font-medium text-[#063B2E] bg-[#EEF3ED] px-3 py-1 rounded-xl border border-[#D9E2DC] shrink-0">
                {selectedBaseline.rasterCode}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5 items-center">
              <div className="md:col-span-4 relative h-40 rounded-2xl overflow-hidden border border-[#D9E2DC] bg-[#EEF3ED] group min-w-0">
                <img
                  src={selectedBaseline.archetypeImage || ACTOMYOSIN_SCAN_IMAGE}
                  alt={selectedBaseline.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063B2E]/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                  SEM Tomography Matrix
                </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                  <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Target Protein</div>
                  <div className="text-base font-display font-bold text-[#10231D] mt-1">{proteinTarget}g / 100g</div>
                  <div className="text-[10px] font-mono text-[#063B2E] mt-0.5 font-semibold">Biochemical floor</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                  <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Cost Ceiling</div>
                  <div className="text-base font-display font-bold text-[#063B2E] mt-1">₹{costCeiling} / kg</div>
                  <div className="text-[10px] font-mono text-[#61706A] mt-0.5">Commercial max</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                  <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Thermal Gelation</div>
                  <div className="text-base font-display font-bold text-[#10231D] mt-1">{selectedBaseline.thermalGelation}</div>
                  <div className="text-[10px] font-mono text-[#61706A] mt-0.5">Denaturation pt</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                  <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Water Activity</div>
                  <div className="text-base font-display font-bold text-[#063B2E] mt-1">{selectedBaseline.waterActivity}</div>
                  <div className="text-[10px] font-mono text-[#61706A] mt-0.5">Hydration level</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-[#D9E2DC]">
              <button
                onClick={() => setWorkbenchStage('constraints')}
                className="px-5 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-display font-bold text-xs flex items-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>Proceed to Constraints</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#35D39A]" />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* STAGE 2: BOUNDARY CONSTRAINTS */}
      {workbenchStage === 'constraints' && (
        <div className="flex flex-col gap-6 min-w-0">
          <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-[#10231D] text-base break-words">Big-8 Allergen Exclusion Matrix</h3>
                <p className="text-xs text-[#61706A]">
                  Zero-tolerance filtering. Formulations with active restrictions are strictly purged before candidate ranking.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 mt-4 min-w-0">
              {['Soy', 'Gluten', 'Nuts', 'Dairy', 'Egg'].map((allergen) => {
                const isRestricted = allergenRestrictions.includes(allergen);
                return (
                  <button
                    key={allergen}
                    type="button"
                    onClick={() => toggleAllergen(allergen)}
                    className={`px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer border ${
                      isRestricted
                        ? 'bg-rose-50 text-rose-700 border-rose-200 font-semibold shadow-xs'
                        : 'bg-[#F6F7F2] text-[#61706A] hover:text-[#10231D] hover:bg-white border-[#D9E2DC]'
                    }`}
                  >
                    {isRestricted ? (
                      <Ban className="w-3.5 h-3.5 text-rose-600" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-[#61706A]" />
                    )}
                    <span>Exclude {allergen}</span>
                    {isRestricted && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-bold">
                        EXCLUDED
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Numerical Boundaries: Cost Ceiling & Protein Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#D9E2DC]">
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D]">Cost Target Ceiling</span>
                  <span className="font-mono text-[#063B2E] font-bold">₹{costCeiling} / kg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="450"
                  step="5"
                  value={costCeiling}
                  onChange={(e) => setCostCeiling(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Economical (₹50)</span>
                  <span>Artisanal Spec (₹450)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D]">Target Protein Density Floor</span>
                  <span className="font-mono text-[#063B2E] font-bold">{proteinTarget}g / 100g</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="0.5"
                  value={proteinTarget}
                  onChange={(e) => setProteinTarget(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Standard (1g)</span>
                  <span>High Performance (35g)</span>
                </div>
              </div>
            </div>

            {/* Quality & Clean-Label Flags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#D9E2DC]">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] cursor-pointer hover:bg-white transition-colors min-w-0">
                <input
                  type="checkbox"
                  checked={nonGmoOnly}
                  onChange={(e) => setNonGmoOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#063B2E] rounded shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[#10231D] truncate">Non-GMO Certified Isolates</div>
                  <div className="text-[11px] text-[#61706A] truncate">Identity-preserved non-transgenic supply</div>
                </div>
              </label>

              <div className="p-3.5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#10231D] font-medium">Sodium Ceiling</span>
                  <span className="font-mono text-[#063B2E] font-bold">{sodiumCap} mg</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="600"
                  step="10"
                  value={sodiumCap}
                  onChange={(e) => setSodiumCap(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer mt-1"
                />
              </div>
            </div>

            {/* Qualitative Notes */}
            <div className="mt-4 pt-4 border-t border-[#D9E2DC]">
              <label className="text-xs text-[#61706A] font-mono font-medium block mb-1.5">
                Qualitative Directives &amp; Clean-Label Notes
              </label>
              <input
                type="text"
                value={additionalRequirements}
                onChange={(e) => setAdditionalRequirements(e.target.value)}
                placeholder="e.g. Clean label, zero synthetic gums, high pan-fry crispness, calcium fortification..."
                className="w-full bg-[#F6F7F2] border border-[#D9E2DC] rounded-xl px-4 py-2.5 text-xs text-[#10231D] placeholder-[#61706A]/60 focus:outline-none focus:border-[#063B2E] focus:bg-white transition-colors font-sans"
              />
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#D9E2DC] flex-wrap gap-2">
              <button
                onClick={() => setWorkbenchStage('target')}
                className="text-xs font-mono text-[#61706A] hover:text-[#10231D] cursor-pointer"
              >
                &larr; Back to Target Profile
              </button>

              <button
                onClick={() => setWorkbenchStage('formulation')}
                className="px-5 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-display font-bold text-xs flex items-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>Proceed to Formulation</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#35D39A]" />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* STAGE 3: FORMULATION (BASE ISOLATE & PARETO OPTIMIZATION) */}
      {workbenchStage === 'formulation' && (
        <div className="flex flex-col gap-6 min-w-0">
          {/* Base Isolate Selection Card */}
          <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E] shrink-0">
                <Leaf className="w-4 h-4 text-[#0A9F6E]" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-[#10231D] text-base break-words">Primary Botanical Protein Substrate</h3>
                <p className="text-xs text-[#61706A]">Select foundational botanical isolate matrix compatible with target food</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { id: 'pea', label: 'Yellow Pea 85%', desc: 'High gel strength, low allergen' },
                { id: 'soy', label: 'Defatted Soy 90%', desc: 'Classic fibrillar matrix', allergen: 'Soy' },
                { id: 'mycoprotein', label: 'Mycoprotein 65%', desc: 'Natural mycelial web' },
                { id: 'faba', label: 'Faba Bean 82%', desc: 'Neutral flavor, rapid hydrate' }
              ].map((base) => {
                const isRestricted = base.allergen ? allergenRestrictions.some(a => a.toLowerCase().includes(base.allergen!.toLowerCase())) : false;
                const active = selectedBase === base.id;
                return (
                  <button
                    key={base.id}
                    disabled={isRestricted}
                    onClick={() => !isRestricted && setSelectedBase(base.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-all min-w-0 flex flex-col justify-between ${
                      isRestricted
                        ? 'opacity-40 bg-[#F6F7F2] border-rose-200 cursor-not-allowed'
                        : active
                        ? 'bg-[#EEF3ED] border-[#063B2E] shadow-xs cursor-pointer ring-2 ring-[#0A9F6E]/30'
                        : 'bg-[#F6F7F2] border-[#D9E2DC] hover:border-[#063B2E]/40 hover:bg-white cursor-pointer'
                    }`}
                  >
                    <div className={`text-xs font-bold break-words ${isRestricted ? 'text-rose-600' : active ? 'text-[#063B2E]' : 'text-[#10231D]'}`}>
                      {base.label}
                    </div>
                    <div className="text-[10px] font-mono text-[#61706A] mt-1 leading-snug break-words">
                      {isRestricted ? 'Excluded by constraint' : base.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Pareto Loss Sliders */}
          <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E] shrink-0">
                  <Sliders className="w-4 h-4 text-[#0A9F6E]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-extrabold text-[#10231D] text-base break-words">Multi-Objective Loss Function Weights</h3>
                  <p className="text-xs text-[#61706A]">Calibrate multi-objective trade-offs for in-silico Pareto frontier ranking</p>
                </div>
              </div>

              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-[#EEF3ED] text-[#063B2E] border border-[#D9E2DC] self-start sm:self-auto shrink-0">
                Σ WEIGHTS CALIBRATED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Taste Priority */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D]">Taste &amp; Flavor Volatiles</span>
                  <span className="font-mono text-[#063B2E] font-bold">{tastePriority}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={tastePriority}
                  onChange={(e) => setTastePriority(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Moderate Umami (20%)</span>
                  <span>Identical Volatiles (100%)</span>
                </div>
              </div>

              {/* Texture Priority */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D]">Texture &amp; Tensile Bite</span>
                  <span className="font-mono text-[#063B2E] font-bold">{texturePriority}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={texturePriority}
                  onChange={(e) => setTexturePriority(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Tender Soft (20%)</span>
                  <span>Anisotropic Fibrillar (100%)</span>
                </div>
              </div>

              {/* Nutrition Priority */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D]">Nutritional Equivalence</span>
                  <span className="font-mono text-[#063B2E] font-bold">{nutritionPriority}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={nutritionPriority}
                  onChange={(e) => setNutritionPriority(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Standard Macro (20%)</span>
                  <span>Complete Parity + Fe/B12 (100%)</span>
                </div>
              </div>

              {/* Cost Priority */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D]">Cost Efficiency</span>
                  <span className="font-mono text-[#063B2E] font-bold">{costPriority}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={costPriority}
                  onChange={(e) => setCostPriority(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Artisanal Spec (20%)</span>
                  <span>Strict Minimization (100%)</span>
                </div>
              </div>

              {/* Sustainability Priority */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] sm:col-span-2 min-w-0">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-[#10231D] flex items-center gap-1.5">
                    <span>Carbon &amp; Water Reduction</span>
                    <span className="text-[10px] font-mono text-[#61706A] font-normal hidden sm:inline">(Prototype estimate)</span>
                  </span>
                  <span className="font-mono text-[#063B2E] font-bold">{sustainabilityPriority}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={sustainabilityPriority}
                  onChange={(e) => setSustainabilityPriority(Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#61706A]">
                  <span>Standard Botanical Base (20%)</span>
                  <span>Maximum CO2e &amp; Water Savings (100%)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#D9E2DC] flex-wrap gap-2">
              <button
                onClick={() => setWorkbenchStage('constraints')}
                className="text-xs font-mono text-[#61706A] hover:text-[#10231D] cursor-pointer"
              >
                &larr; Back to Constraints
              </button>

              <button
                onClick={() => setWorkbenchStage('analysis')}
                className="px-5 py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-display font-bold text-xs flex items-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>Proceed to Computational Analysis</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#35D39A]" />
              </button>
            </div>
          </section>
        </div>
      )}

      {/* STAGE 4: COMPUTATIONAL ANALYSIS */}
      {workbenchStage === 'analysis' && (
        <div className="flex flex-col gap-6 min-w-0">
          {/* Live In-Silico Predictive Telemetry Matrix */}
          <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-[#D9E2DC] mb-5 gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E] shrink-0">
                  <Cpu className="w-4 h-4 text-[#0A9F6E]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-extrabold text-[#10231D] text-base break-words">In-Silico Predictive Telemetry</h3>
                  <p className="text-xs text-[#61706A]">Real-time outcome modeling based on current constraints and loss weights</p>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#EEF3ED] text-[#063B2E] border border-[#D9E2DC] font-bold shrink-0">
                PARITY CONFIDENCE: HIGH
              </span>
            </div>

            {/* 4 Outcome Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Predicted DIAAS</div>
                <div className="text-2xl font-mono font-extrabold text-[#063B2E] mt-1">1.14</div>
                <div className="text-[10px] font-mono text-[#063B2E] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#0A9F6E]" />
                  <span>Complete Parity</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Est. Unit Cost</div>
                <div className="text-2xl font-mono font-extrabold text-[#10231D] mt-1">₹{Math.round(costCeiling * 0.82)}</div>
                <div className="text-[10px] font-mono text-[#063B2E] mt-1">
                  -28% vs Animal Target
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Carbon LCA Delta</div>
                <div className="text-2xl font-mono font-extrabold text-[#063B2E] mt-1">-88%</div>
                <div className="text-[10px] font-mono text-[#61706A] mt-1">
                  CO₂e vs Conventional
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Shear Anisotropy</div>
                <div className="text-2xl font-mono font-extrabold text-[#10231D] mt-1">λ = 0.78</div>
                <div className="text-[10px] font-mono text-[#063B2E] mt-1">
                  Fibrous Alignment
                </div>
              </div>
            </div>

            {/* Comparative Structure Table - Wrapped with horizontal overflow to prevent collision */}
            <div className="mt-5 p-4 rounded-2xl bg-[#EEF3ED]/70 border border-[#D9E2DC] min-w-0">
              <div className="text-[11px] font-mono font-bold text-[#063B2E] uppercase mb-2">
                Comparative Parity Matrix (Animal Benchmark vs Prospective Formulation)
              </div>
              <div className="overflow-x-auto min-w-0">
                <div className="min-w-[560px]">
                  <div className="grid grid-cols-5 gap-2 text-xs font-mono text-[#10231D] py-1.5 border-b border-[#D9E2DC] font-bold">
                    <span>Metric</span>
                    <span>Animal Target</span>
                    <span>Prospective Plant</span>
                    <span>Variance</span>
                    <span>Status</span>
                  </div>
                  <div className="flex flex-col gap-1.5 pt-2 text-xs font-mono">
                    <div className="grid grid-cols-5 gap-2 text-[#61706A]">
                      <span className="font-semibold text-[#10231D]">Protein Content</span>
                      <span>{proteinTarget}g/100g</span>
                      <span className="text-[#063B2E] font-bold">{proteinTarget}g/100g</span>
                      <span>±0.0g</span>
                      <span className="text-[#063B2E] font-bold">1:1 Parity</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-[#61706A]">
                      <span className="font-semibold text-[#10231D]">Production Cost</span>
                      <span>₹{Math.round(costCeiling * 1.25)}</span>
                      <span className="text-[#063B2E] font-bold">₹{Math.round(costCeiling * 0.82)}</span>
                      <span className="text-[#063B2E]">-₹{Math.round(costCeiling * 1.25) - Math.round(costCeiling * 0.82)}</span>
                      <span className="text-[#063B2E] font-bold">Commercial Win</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-[#61706A]">
                      <span className="font-semibold text-[#10231D]">Allergen Clear</span>
                      <span>Complex Bovine</span>
                      <span className="text-[#063B2E] font-bold">{allergenRestrictions.length > 0 ? `${allergenRestrictions.length} Restricted` : 'Clean Label'}</span>
                      <span>0 Violations</span>
                      <span className="text-[#063B2E] font-bold">FALCPA Pass</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Extrusion Technology Selection */}
            <div className="flex flex-col gap-2 mt-5 min-w-0">
              <label className="text-xs text-[#61706A] font-mono font-medium">
                Thermomechanical Texturization Regimen
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { id: 'hmec', name: 'HMEC Twin-Screw', param: '145°C • 2.4 MPa' },
                  { id: 'lmec', name: 'Low Moisture Extrusion', param: '120°C • 1.1 MPa' },
                  { id: 'spinning', name: 'Wet Fiber Spinning', param: 'pH 4.6 Coagulation' },
                  { id: 'bioprint', name: 'Multi-Nozzle 3D Food', param: '0.4mm Lattice Gel' }
                ].map((tech) => {
                  const active = extrusionTech === tech.id;
                  return (
                    <button
                      key={tech.id}
                      onClick={() => setExtrusionTech(tech.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer min-w-0 ${
                        active
                          ? 'bg-[#EEF3ED] border-[#063B2E] shadow-xs ring-2 ring-[#0A9F6E]/30'
                          : 'bg-[#F6F7F2] border-[#D9E2DC] hover:border-[#063B2E]/40 hover:bg-white'
                      }`}
                    >
                      <div className={`text-xs font-bold break-words ${active ? 'text-[#063B2E]' : 'text-[#10231D]'}`}>
                        {tech.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#61706A] mt-0.5">{tech.param}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Pre-Flight Synthesis Dispatch Card */}
          <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-5 min-w-0">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-[#063B2E] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#35D39A]" />
              </div>
              <div className="min-w-0">
                <div className="text-base font-display font-bold text-[#10231D] flex items-center gap-2 flex-wrap">
                  <span>Pre-Flight Verification Complete</span>
                  <span className="text-[10px] font-mono bg-[#EEF3ED] text-[#063B2E] px-2 py-0.5 rounded border border-[#D9E2DC] font-semibold">
                    READY FOR SYNTHESIS
                  </span>
                </div>
                <p className="text-xs text-[#61706A] mt-1 break-words">
                  Target: <strong className="text-[#063B2E]">{productQuery}</strong> • Base: <strong className="text-[#063B2E] capitalize">{selectedBase}</strong> • Extruder: <strong className="text-[#063B2E] uppercase">{extrusionTech}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={handleRunSynthesis}
              disabled={isSynthesizing}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-display font-bold text-sm tracking-wide shadow-card hover:shadow-card-hover transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isSynthesizing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#35D39A]" />
                  <span>RUN IN-SILICO SYNTHESIS</span>
                </>
              )}
            </button>
          </section>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="rounded-2xl bg-white border border-[#D9E2DC] p-4 text-xs text-[#61706A] flex items-start gap-3 shadow-subtle min-w-0">
        <Info className="w-5 h-5 text-[#063B2E] shrink-0 mt-0.5" />
        <div className="min-w-0">
          <span className="text-[#10231D] font-bold">Research Prototype Disclaimer: </span>
          AI-generated prototype. All formulation outputs require physical laboratory validation and regulatory allergen screening before food production or human consumption.
        </div>
      </div>

      {/* Step-by-Step Staged AI Processing Modal (Clinical Lab HUD) */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-[#082A23]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#D9E2DC] p-7 max-w-lg w-full shadow-dropdown flex flex-col gap-6 text-left min-w-0">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9E2DC]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#063B2E] flex items-center justify-center text-[#35D39A] shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-display font-bold text-[#063B2E] tracking-wide uppercase truncate">
                    In-Silico Biopolymer Solver
                  </h2>
                  <p className="text-xs font-mono text-[#61706A] truncate">
                    Stage {simulationStepIndex} of {totalSimulationSteps} in progress
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-semibold text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-md border border-[#D9E2DC] shrink-0">
                STAGE 0{simulationStepIndex} / 0{totalSimulationSteps}
              </span>
            </div>

            {/* 8-Stage Step Checklist */}
            <div className="space-y-2.5">
              {SIMULATION_PIPELINE_STEPS.map((step, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < simulationStepIndex;
                const isCurrent = stepNum === simulationStepIndex;

                return (
                  <div key={step} className="flex items-center gap-3 text-xs py-0.5">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-[#EEF3ED] text-[#063B2E] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full bg-[#EEF3ED] text-[#063B2E] flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#35D39A] animate-ping" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-[#D9E2DC] flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9E2DC]" />
                      </div>
                    )}
                    <span className={`text-xs ${isCurrent ? 'font-semibold text-[#10231D] font-sans' : isCompleted ? 'text-[#61706A]' : 'text-[#61706A]/50'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar & Subtext */}
            <div className="space-y-2 pt-2 border-t border-[#D9E2DC]">
              <div className="w-full bg-[#EEF3ED] h-2 rounded-full overflow-hidden border border-[#D9E2DC]">
                <div
                  className="h-full bg-[#063B2E] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.round((simulationStepIndex / totalSimulationSteps) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-[#61706A]">
                <span>Active Target: <strong className="text-[#063B2E]">{productQuery}</strong></span>
                <span>{Math.round((simulationStepIndex / totalSimulationSteps) * 100)}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
