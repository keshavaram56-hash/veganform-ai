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
  Layers
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
  const [costCeiling, setCostCeiling] = useState(250); // ₹ / kg default
  const [proteinTarget, setProteinTarget] = useState(22); // g / 100g

  // Allergen restrictions (Authoritative constraints)
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Demo Mode Notice Banner if active */}
      {isDemoMode && (
        <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span className="font-semibold">DEMO MODE ACTIVE:</span>
            <span>Formulation will synthesize instantaneously via deterministic in-silico engine.</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 font-mono text-[10px] uppercase font-bold shrink-0">
            OFFLINE READY
          </span>
        </div>
      )}

      {/* Target Product Selection Panel */}
      <section className="relative rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-6 sm:p-7 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-semibold">
                STAGE 01 &bull; TARGET FOOD SPECIFICATION
              </span>
            </div>
            <button
              onClick={handleResetForm}
              className="flex items-center gap-1.5 text-xs font-mono text-[#8da396] hover:text-white transition-colors cursor-pointer"
              title="Reset all fields to standard defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Target Formulation Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#8da396] max-w-2xl leading-relaxed">
              Define the reference conventional food product to deconstruct its functional matrix, establish multi-variable constraints, and synthesize Pareto-optimal plant formulations.
            </p>
          </div>

          {/* Search / Target Product Input Bar */}
          <div className="relative mt-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8da396] w-4 h-4" />
            <input
              type="text"
              value={productQuery}
              onChange={(e) => setProductQuery(e.target.value)}
              placeholder="Enter conventional food target (e.g. Chicken Nugget, Mozzarella Cheese, Milk, Ice Cream, Egg...)"
              className="w-full bg-[#080d0b] border border-[#1b2b22] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#8da396]/60 focus:outline-none focus:border-[#10b981] transition-all font-sans"
            />
          </div>

          {/* Quick Select Preset Targets */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="font-mono text-[11px] text-[#8da396] uppercase tracking-wider mr-1">
              Benchmark Targets:
            </span>
            {DEMO_PRESETS.map((demo) => {
              const isSelected = productQuery.toLowerCase() === demo.name.toLowerCase();
              return (
                <button
                  key={demo.id}
                  onClick={() => handleSelectPreset(demo.name)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#10b981] text-[#052e16] font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#121d17] text-[#8da396] hover:text-white hover:bg-[#182820] border border-[#1b2b22]'
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
      <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#1b2b22]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#10b981] font-semibold uppercase tracking-wider">
                Target Reference Matrix
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#121d17] text-[#8da396] border border-[#1b2b22]">
                {selectedBaseline.rasterCode}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {productQuery || selectedBaseline.name} Cellular Matrix
            </h2>
            <p className="text-xs text-[#8da396]">
              {selectedBaseline.subtitle} &bull; Biochemical reference specs for parity synthesis
            </p>
          </div>

          <span className="font-mono text-xs font-semibold text-[#10b981] bg-[#080d0b] px-3 py-1 rounded-lg border border-[#10b981]/30">
            REFERENCE ARCHETYPE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
          <div className="md:col-span-4 relative h-36 rounded-xl overflow-hidden border border-[#1b2b22] bg-[#080d0b] group">
            <img
              src={selectedBaseline.archetypeImage || ACTOMYOSIN_SCAN_IMAGE}
              alt={selectedBaseline.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-[#080d0b]/80 px-2 py-0.5 rounded border border-[#1b2b22]">
              SEM TOMOGRAPHY SCAN
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
              <div className="text-[10px] font-mono text-[#8da396]">Target Protein Density</div>
              <div className="font-mono text-sm font-bold text-white mt-1">{proteinTarget}g / 100g</div>
              <div className="text-[10px] font-mono text-[#10b981] mt-0.5">Biochemical spec</div>
            </div>

            <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
              <div className="text-[10px] font-mono text-[#8da396]">Cost Ceiling</div>
              <div className="font-mono text-sm font-bold text-[#10b981] mt-1">₹{costCeiling} / kg</div>
              <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Commercial max</div>
            </div>

            <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
              <div className="text-[10px] font-mono text-[#8da396]">Thermal Gelation</div>
              <div className="font-mono text-sm font-bold text-white mt-1">{selectedBaseline.thermalGelation}</div>
              <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Denaturation</div>
            </div>

            <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
              <div className="text-[10px] font-mono text-[#8da396]">Water Activity</div>
              <div className="font-mono text-sm font-bold text-[#10b981] mt-1">{selectedBaseline.waterActivity}</div>
              <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Hydration level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Objective Optimization Priorities (Weights 0-100) */}
      <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#10b981]" />
            <h3 className="font-bold text-white text-base">Multi-Objective Optimization Priorities</h3>
          </div>
          <span className="text-[11px] font-mono text-[#8da396]">
            Weights calibrate the in-silico Pareto ranking function
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Taste Priority */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Taste &amp; Flavor Volatiles</span>
              <span className="font-mono text-[#10b981] font-bold">{tastePriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={tastePriority}
              onChange={(e) => setTastePriority(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Moderate Umami (20%)</span>
              <span>Identical Volatiles (100%)</span>
            </div>
          </div>

          {/* Texture Priority */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Texture &amp; Tensile Bite</span>
              <span className="font-mono text-[#10b981] font-bold">{texturePriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={texturePriority}
              onChange={(e) => setTexturePriority(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Tender Soft (20%)</span>
              <span>Anisotropic Fibrillar (100%)</span>
            </div>
          </div>

          {/* Nutrition Priority */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Nutritional Equivalence</span>
              <span className="font-mono text-[#10b981] font-bold">{nutritionPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={nutritionPriority}
              onChange={(e) => setNutritionPriority(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Standard Macro (20%)</span>
              <span>Complete Parity + Fe/B12 (100%)</span>
            </div>
          </div>

          {/* Cost Priority */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Cost Efficiency</span>
              <span className="font-mono text-[#10b981] font-bold">{costPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={costPriority}
              onChange={(e) => setCostPriority(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Artisanal Premium (20%)</span>
              <span>Strict Minimization (100%)</span>
            </div>
          </div>

          {/* Sustainability Priority */}
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22] sm:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white flex items-center gap-1.5">
                <span>Carbon &amp; Water Reduction</span>
                <span className="text-[10px] font-mono text-[#8da396] font-normal hidden sm:inline">(Prototype estimate — not a lifecycle assessment)</span>
              </span>
              <span className="font-mono text-[#10b981] font-bold">{sustainabilityPriority}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={sustainabilityPriority}
              onChange={(e) => setSustainabilityPriority(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Standard Botanical Base (20%)</span>
              <span>Maximum CO2e &amp; Water Savings (100%)</span>
            </div>
          </div>
        </div>

        {/* Numerical Targets: Cost Ceiling & Protein Density */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-[#1b2b22]">
          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Maximum Cost Ceiling</span>
              <span className="font-mono text-[#10b981] font-bold">₹{costCeiling} / kg</span>
            </div>
            <input
              type="range"
              min="50"
              max="450"
              step="5"
              value={costCeiling}
              onChange={(e) => setCostCeiling(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Economical (₹50)</span>
              <span>Artisanal Spec (₹450)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-white">Target Protein Density</span>
              <span className="font-mono text-[#10b981] font-bold">{proteinTarget}g / 100g</span>
            </div>
            <input
              type="range"
              min="1"
              max="35"
              step="0.5"
              value={proteinTarget}
              onChange={(e) => setProteinTarget(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#8da396]">
              <span>Low (1g)</span>
              <span>High Performance (35g)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Allergen & Dietary Hard Constraints (CRITICAL ENGINE) */}
      <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-1.5">
          <ShieldAlert className="w-5 h-5 text-[#10b981]" />
          <h3 className="font-bold text-white text-base">Allergen Exclusions &amp; Hard Constraints</h3>
        </div>
        <p className="text-xs text-[#8da396] mb-4">
          Active restrictions strictly prohibit violating botanical ingredients from entering the formulation matrix. The backend validation engine is authoritative. All formulations are 100% vegan.
        </p>

        <div className="flex flex-wrap gap-2.5">
          {['Soy', 'Gluten', 'Nuts', 'Dairy', 'Egg'].map((allergen) => {
            const isRestricted = allergenRestrictions.includes(allergen);
            return (
              <button
                key={allergen}
                type="button"
                onClick={() => toggleAllergen(allergen)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 cursor-pointer border ${
                  isRestricted
                    ? 'bg-rose-950/70 text-rose-200 border-rose-500/60 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
                    : 'bg-[#080d0b] text-[#8da396] hover:text-white border-[#1b2b22]'
                }`}
              >
                {isRestricted ? (
                  <Ban className="w-4 h-4 text-rose-400" />
                ) : (
                  <Square className="w-4 h-4 text-[#8da396]" />
                )}
                <span>Exclude {allergen}</span>
                {isRestricted && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-900/70 text-rose-100 font-bold">
                    EXCLUDED
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Additional Requirements Input */}
        <div className="mt-5 pt-4 border-t border-[#1b2b22]">
          <label className="text-xs font-mono text-[#8da396] uppercase tracking-wider block mb-1.5">
            Qualitative R&amp;D Directives &amp; Clean-Label Requirements
          </label>
          <input
            type="text"
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            placeholder="e.g. Clean label, zero synthetic gums, high pan-fry crispness, vitamin D3 & calcium fortification..."
            className="w-full bg-[#080d0b] border border-[#1b2b22] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#8da396]/60 focus:outline-none focus:border-[#10b981] transition-colors font-sans"
          />
        </div>
      </section>

      {/* Biochemical Scaffold & Texturization Regimen */}
      <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="w-5 h-5 text-[#10b981]" />
          <h3 className="font-bold text-white text-base">Biochemical Scaffold &amp; Extrusion Regimen</h3>
        </div>

        {/* Base Isolate Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-[#8da396] uppercase tracking-wider">
            Primary Botanical Protein Isolate
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isRestricted
                      ? 'opacity-40 bg-[#080d0b] border-rose-900/40 cursor-not-allowed'
                      : active
                      ? 'bg-[#121d17] border-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.15)] cursor-pointer'
                      : 'bg-[#080d0b] border-[#1b2b22] hover:border-[#8da396]/40 cursor-pointer'
                  }`}
                >
                  <div className={`text-xs font-semibold ${isRestricted ? 'text-rose-300' : active ? 'text-[#10b981]' : 'text-white'}`}>
                    {base.label}
                  </div>
                  <div className="text-[10px] text-[#8da396] mt-0.5">
                    {isRestricted ? 'Excluded by constraint' : base.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Extrusion Technology Selection */}
        <div className="flex flex-col gap-2 mt-5">
          <label className="text-xs font-mono text-[#8da396] uppercase tracking-wider">
            Thermomechanical Texturization Regimen
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
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
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#121d17] border-[#10b981]'
                      : 'bg-[#080d0b] border-[#1b2b22] hover:border-[#8da396]/40'
                  }`}
                >
                  <div className={`text-xs font-semibold ${active ? 'text-[#10b981]' : 'text-white'}`}>
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#8da396] mt-0.5">{tech.param}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Boundary Toggles: Non-GMO, Sodium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-[#1b2b22]">
          <label className="flex items-center gap-3 p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22] cursor-pointer">
            <input
              type="checkbox"
              checked={nonGmoOnly}
              onChange={(e) => setNonGmoOnly(e.target.checked)}
              className="w-4 h-4 accent-[#10b981] rounded"
            />
            <div>
              <div className="text-xs font-medium text-white">Non-GMO Certified Ingredients</div>
              <div className="text-[10px] text-[#8da396]">Strict identity-preserved botanical isolates</div>
            </div>
          </label>

          <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22] flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white font-medium">Sodium Ceiling</span>
              <span className="font-mono text-[#10b981]">{sodiumCap} mg</span>
            </div>
            <input
              type="range"
              min="200"
              max="600"
              step="10"
              value={sodiumCap}
              onChange={(e) => setSodiumCap(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer mt-1"
            />
          </div>
        </div>
      </section>

      {/* Mandatory Disclaimer */}
      <div className="rounded-2xl bg-[#0c1410] border border-[#1b2b22] p-4 text-xs text-[#8da396] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
        <div>
          <span className="text-white font-medium">Research Prototype Disclaimer: </span>
          AI-generated prototype. All formulation outputs require physical laboratory validation and regulatory allergen screening before food production or human consumption.
        </div>
      </div>

      {/* Generate Formulation Action Card */}
      <section className="rounded-3xl bg-gradient-to-r from-[#0c1410] via-[#122118] to-[#0c1410] border border-[#10b981]/40 p-6 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-6 h-6 text-[#10b981]" />
          </div>
          <div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              Ready to Synthesize Top 3 Formulations
              <span className="font-mono text-[10px] bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded border border-[#10b981]/40">
                AI + BIOCHEMISTRY
              </span>
            </div>
            <p className="text-xs text-[#8da396] mt-0.5">
              Calculates nutrition, cost, and sustainability deterministically from structured ingredient databases.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunSynthesis}
          disabled={isSynthesizing}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
        >
          {isSynthesizing ? (
            <>
              <span className="w-4 h-4 border-2 border-[#052e16] border-t-transparent rounded-full animate-spin" />
              <span>SYNTHESIZING MATRIX...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>GENERATE FORMULATION</span>
            </>
          )}
        </button>
      </section>

      {/* Step-by-Step Staged AI Processing Modal */}
      {isSynthesizing && (
        <div className="fixed inset-0 z-50 bg-[#090e0c]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#10b981]/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-t-[#10b981] border-r-transparent border-b-[#059669] border-l-transparent animate-spin" />
            <FlaskConical className="w-10 h-10 text-[#10b981]" />
          </div>

          <div className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-semibold mb-2">
            IN-SILICO R&amp;D PIPELINE &bull; STAGE {simulationStepIndex} OF {totalSimulationSteps}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 max-w-md">
            {currentSimulationStep || 'ANALYZING TARGET PRODUCT'}
          </h2>

          <p className="text-xs text-[#8da396] max-w-md font-mono mb-5 leading-relaxed">
            Evaluating biopolymer hydrogen bonding, moisture entrapment, lipid dispersion, and multi-objective Pareto ranking.
          </p>

          {/* Progress Bar */}
          <div className="w-64 sm:w-80 h-2 bg-[#121d17] rounded-full overflow-hidden border border-[#1b2b22]">
            <div
              className="h-full bg-[#10b981] transition-all duration-300 shadow-[0_0_10px_#10b981]"
              style={{ width: `${Math.round((simulationStepIndex / totalSimulationSteps) * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
