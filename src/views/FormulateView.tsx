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
  Circle
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#17201C]">
      {/* Demo Mode Notice Banner if active */}
      {isDemoMode && (
        <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between gap-3 text-xs shadow-subtle">
          <div className="flex items-center gap-2 text-[#92400E]">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
            <span className="font-semibold">Demo Mode Active:</span>
            <span>Formulation will synthesize instantaneously via deterministic in-silico engine.</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-white text-[#92400E] border border-[#FDE68A] text-[11px] font-medium shrink-0">
            Offline Ready
          </span>
        </div>
      )}

      {/* Target Product Selection Panel */}
      <section className="relative rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card overflow-hidden">
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#059669]">
                Stage 01 • Target Specification
              </span>
            </div>
            <button
              onClick={handleResetForm}
              className="flex items-center gap-1.5 text-xs text-[#66716B] hover:text-[#17201C] transition-colors cursor-pointer"
              title="Reset all fields to standard defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-xs font-bold uppercase tracking-wider text-[#059669]">
              Formulation Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17201C]">
              Target Product &amp; Bio-Equivalence Matrix
            </h1>
            <p className="text-sm text-[#66716B] max-w-2xl leading-relaxed">
              Define the reference conventional food product to deconstruct its functional matrix, establish multi-variable constraints, and synthesize Pareto-optimal plant formulations.
            </p>
          </div>

          {/* Search / Target Product Input Bar */}
          <div className="relative mt-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#66716B] w-4 h-4" />
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              placeholder="Enter conventional food target (e.g. Chicken Nugget, Mozzarella Cheese, Milk, Ice Cream, Egg...)"
              className="w-full bg-[#F8FAF9] border border-[#E5EAE7] rounded-xl pl-10 pr-4 py-3 text-sm text-[#17201C] placeholder-[#66716B]/60 focus:outline-none focus:border-[#059669] focus:bg-white transition-all font-sans"
            />
          </div>

          {/* Quick Select Preset Targets */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-xs text-[#66716B] font-medium mr-1">
              Benchmark Targets:
            </span>
            {DEMO_PRESETS.map((demo) => {
              const isSelected = productQuery.toLowerCase() === demo.name.toLowerCase();
              return (
                <button
                  key={demo.id}
                  onClick={() => handleSelectPreset(demo.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#059669] text-white shadow-xs'
                      : 'bg-[#F8FAF9] text-[#66716B] hover:text-[#17201C] hover:bg-white border border-[#E5EAE7]'
                  }`}
                >
                  <span>{demo.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Reference Tomography & Archetype Preview */}
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-5 sm:p-6 shadow-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EAE7]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#059669] font-semibold uppercase tracking-wider">
                Target Reference Matrix
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#F8FAF9] text-[#66716B] border border-[#E5EAE7]">
                {selectedBaseline.rasterCode}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#17201C] mt-1">
              {productQuery || selectedBaseline.name} Cellular Matrix
            </h2>
            <p className="text-xs text-[#66716B]">
              {selectedBaseline.subtitle} • Biochemical reference specs for parity synthesis
            </p>
          </div>

          <span className="text-xs font-medium text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#BBF7D0]">
            Reference Archetype
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
          <div className="md:col-span-4 relative h-36 rounded-xl overflow-hidden border border-[#E5EAE7] bg-[#F8FAF9] group">
            <img
              src={selectedBaseline.archetypeImage || ACTOMYOSIN_SCAN_IMAGE}
              alt={selectedBaseline.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 text-[10px] text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
              SEM Tomography Scan
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
              <div className="text-[11px] text-[#66716B]">Target Protein</div>
              <div className="text-sm font-bold text-[#17201C] mt-1">{proteinTarget}g / 100g</div>
              <div className="text-[10px] text-[#059669] mt-0.5 font-medium">Biochemical spec</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
              <div className="text-[11px] text-[#66716B]">Cost Ceiling</div>
              <div className="text-sm font-bold text-[#059669] mt-1">₹{costCeiling} / kg</div>
              <div className="text-[10px] text-[#66716B] mt-0.5">Commercial max</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
              <div className="text-[11px] text-[#66716B]">Thermal Gelation</div>
              <div className="text-sm font-bold text-[#17201C] mt-1">{selectedBaseline.thermalGelation}</div>
              <div className="text-[10px] text-[#66716B] mt-0.5">Denaturation</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
              <div className="text-[11px] text-[#66716B]">Water Activity</div>
              <div className="text-sm font-bold text-[#059669] mt-1">{selectedBaseline.waterActivity}</div>
              <div className="text-[10px] text-[#66716B] mt-0.5">Hydration level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Objective Optimization Priorities (Weights 0-100) */}
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#17201C] text-base">Priority Objectives</h3>
              <p className="text-xs text-[#66716B]">Calibrate multi-objective trade-offs for in-silico Pareto ranking</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Taste Priority */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C]">Taste &amp; Flavor Volatiles</span>
              <span className="text-[#059669] font-bold">{tastePriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={tastePriority}
              onChange={(e) => setTastePriority(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Moderate Umami (20%)</span>
              <span>Identical Volatiles (100%)</span>
            </div>
          </div>

          {/* Texture Priority */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C]">Texture &amp; Tensile Bite</span>
              <span className="text-[#059669] font-bold">{texturePriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={texturePriority}
              onChange={(e) => setTexturePriority(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Tender Soft (20%)</span>
              <span>Anisotropic Fibrillar (100%)</span>
            </div>
          </div>

          {/* Nutrition Priority */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C]">Nutritional Equivalence</span>
              <span className="text-[#059669] font-bold">{nutritionPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={nutritionPriority}
              onChange={(e) => setNutritionPriority(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Standard Macro (20%)</span>
              <span>Complete Parity + Fe/B12 (100%)</span>
            </div>
          </div>

          {/* Cost Priority */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C]">Cost Efficiency</span>
              <span className="text-[#059669] font-bold">{costPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={costPriority}
              onChange={(e) => setCostPriority(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Artisanal Premium (20%)</span>
              <span>Strict Minimization (100%)</span>
            </div>
          </div>

          {/* Sustainability Priority */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] sm:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C] flex items-center gap-1.5">
                <span>Carbon &amp; Water Reduction</span>
                <span className="text-[11px] text-[#66716B] font-normal hidden sm:inline">(Prototype estimate — not a lifecycle assessment)</span>
              </span>
              <span className="text-[#059669] font-bold">{sustainabilityPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={sustainabilityPriority}
              onChange={(e) => setSustainabilityPriority(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Standard Botanical Base (20%)</span>
              <span>Maximum CO2e &amp; Water Savings (100%)</span>
            </div>
          </div>
        </div>

        {/* Numerical Targets: Cost Ceiling & Protein Density */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-[#E5EAE7]">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C]">Cost Target Ceiling</span>
              <span className="text-[#059669] font-bold">₹{costCeiling} / kg</span>
            </div>
            <input
              type="range"
              min="50"
              max="450"
              step="5"
              value={costCeiling}
              onChange={(e) => setCostCeiling(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Economical (₹50)</span>
              <span>Artisanal Spec (₹450)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-[#17201C]">Target Protein Density</span>
              <span className="text-[#059669] font-bold">{proteinTarget}g / 100g</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="0.5"
              value={proteinTarget}
              onChange={(e) => setProteinTarget(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#66716B]">
              <span>Low (1g)</span>
              <span>High Performance (35g)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Allergen & Dietary Hard Constraints */}
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-[#17201C] text-base">Allergen Exclusions</h3>
            <p className="text-xs text-[#66716B]">
              Strictly filters and excludes prohibited botanical sources before ranking. All formulations are 100% vegan.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 mt-4">
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
                    : 'bg-[#F8FAF9] text-[#66716B] hover:text-[#17201C] hover:bg-white border-[#E5EAE7]'
                }`}
              >
                {isRestricted ? (
                  <Ban className="w-3.5 h-3.5 text-rose-600" />
                ) : (
                  <Square className="w-3.5 h-3.5 text-[#66716B]" />
                )}
                <span>Exclude {allergen}</span>
                {isRestricted && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-bold">
                    Excluded
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Additional Requirements Input */}
        <div className="mt-5 pt-4 border-t border-[#E5EAE7]">
          <label className="text-xs text-[#66716B] font-medium block mb-1.5">
            Qualitative Directives &amp; Clean-Label Notes
          </label>
          <input
            type="text"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="e.g. Clean label, zero synthetic gums, high pan-fry crispness, calcium fortification..."
            className="w-full bg-[#F8FAF9] border border-[#E5EAE7] rounded-xl px-4 py-2.5 text-xs text-[#17201C] placeholder-[#66716B]/60 focus:outline-none focus:border-[#059669] focus:bg-white transition-colors font-sans"
          />
        </div>
      </section>

      {/* Biochemical Scaffold & Texturization Regimen */}
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-[#17201C] text-base">Biochemical Base &amp; Extrusion Regimen</h3>
            <p className="text-xs text-[#66716B]">Select primary isolate substrate and thermomechanical processing parameters</p>
          </div>
        </div>

        {/* Base Isolate Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#66716B] font-medium">
            Primary Botanical Protein Isolate
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isRestricted
                      ? 'opacity-40 bg-[#F8FAF9] border-rose-200 cursor-not-allowed'
                      : active
                      ? 'bg-[#F0FDF4] border-[#059669] shadow-xs cursor-pointer'
                      : 'bg-[#F8FAF9] border-[#E5EAE7] hover:border-[#D1DCD6] hover:bg-white cursor-pointer'
                  }`}
                >
                  <div className={`text-xs font-semibold ${isRestricted ? 'text-rose-600' : active ? 'text-[#059669]' : 'text-[#17201C]'}`}>
                    {base.label}
                  </div>
                  <div className="text-[11px] text-[#66716B] mt-0.5">
                    {isRestricted ? 'Excluded by constraint' : base.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extrusion Technology Selection */}
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xs text-[#66716B] font-medium">
            Thermomechanical Texturization Regimen
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#F0FDF4] border-[#059669] shadow-xs'
                      : 'bg-[#F8FAF9] border-[#E5EAE7] hover:border-[#D1DCD6] hover:bg-white'
                  }`}
                >
                  <div className={`text-xs font-semibold ${active ? 'text-[#059669]' : 'text-[#17201C]'}`}>
                    {tech.name}
                  </div>
                  <div className="text-[11px] text-[#66716B] mt-0.5">{tech.param}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Boundary Toggles: Non-GMO, Sodium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-[#E5EAE7]">
          <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] cursor-pointer hover:bg-white transition-colors">
            <input
              type="checkbox"
              checked={nonGmoOnly}
              onChange={(e) => setNonGmoOnly(e.target.checked)}
              className="w-4 h-4 accent-[#059669] rounded"
            />
            <div>
              <div className="text-xs font-medium text-[#17201C]">Non-GMO Certified Ingredients</div>
              <div className="text-[11px] text-[#66716B]">Identity-preserved botanical isolates</div>
            </div>
          </label>

          <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#17201C] font-medium">Sodium Ceiling</span>
              <span className="text-[#059669] font-bold">{sodiumCap} mg</span>
            </div>
            <input
              type="range"
              min="200"
              max="600"
              step="10"
              value={sodiumCap}
              onChange={(e) => setSodiumCap(Number(e.target.value))}
              className="w-full accent-[#059669] cursor-pointer mt-1"
            />
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <div className="rounded-2xl bg-white border border-[#E5EAE7] p-4 text-xs text-[#66716B] flex items-start gap-3 shadow-subtle">
        <Info className="w-5 h-5 text-[#059669] shrink-0 mt-0.5" />
        <div>
          <span className="text-[#17201C] font-semibold">Research Prototype Disclaimer: </span>
          AI-generated prototype. All formulation outputs require physical laboratory validation and regulatory allergen screening before food production or human consumption.
        </div>
      </div>

      {/* Generate Formulation Action Card */}
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#059669]" />
          </div>
          <div>
            <div className="text-base font-bold text-[#17201C] flex items-center gap-2">
              Ready to Synthesize Top 3 Formulations
              <span className="text-[11px] bg-[#ECFDF5] text-[#059669] px-2 py-0.5 rounded border border-[#BBF7D0] font-medium">
                AI + Biochemistry
              </span>
            </div>
            <p className="text-xs text-[#66716B] mt-0.5">
              Calculates nutrition, cost, and sustainability deterministically from structured ingredient databases.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunSynthesis}
          disabled={isSynthesizing}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-semibold text-sm tracking-wide shadow-subtle hover:shadow-card transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {isSynthesizing ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Synthesizing Matrix...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>GENERATE FORMULATION</span>
            </>
          )}
        </button>
      </section>

      {/* Step-by-Step Staged AI Processing Modal (Clean Scientific Presentation) */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-slate-900/35 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-[#E5EAE7] p-7 max-w-lg w-full shadow-dropdown flex flex-col gap-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5EAE7]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#17201C] tracking-wide uppercase">
                    AI Formulation Engine
                  </h2>
                  <p className="text-xs text-[#66716B]">
                    In-silico biopolymer permutation in progress
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#BBF7D0]">
                Stage {simulationStepIndex} of {totalSimulationSteps}
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
                      <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-[#059669] animate-ping" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-[#E5EAE7] flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5EAE7]" />
                      </div>
                    )}
                    <span className={`text-sm ${isCurrent ? 'font-semibold text-[#17201C]' : isCompleted ? 'text-[#66716B]' : 'text-[#A0ABA5]'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar & Subtext */}
            <div className="space-y-2 pt-2 border-t border-[#E5EAE7]">
              <div className="w-full bg-[#F3F6F4] h-2 rounded-full overflow-hidden border border-[#E5EAE7]">
                <div
                  className="h-full bg-[#059669] transition-all duration-300 rounded-full"
                  style={{ width: `${Math.round((simulationStepIndex / totalSimulationSteps) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#66716B]">
                <span>Active Target: <strong className="text-[#17201C]">{productQuery}</strong></span>
                <span>{Math.round((simulationStepIndex / totalSimulationSteps) * 100)}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
