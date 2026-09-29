import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  PieChart,
  DollarSign,
  Leaf,
  Layers,
  ShieldCheck,
  Dna,
  ArrowRight,
  TrendingDown,
  Sparkles,
  BarChart3,
  Info
} from 'lucide-react';

interface AnalyticsData {
  targetName: string;
  nutrition: {
    metric: string;
    conventional: string;
    botanical: string;
    delta: string;
    pct: number;
  }[];
  aminoAcids: {
    name: string;
    animal: number;
    plant: number;
    unit: string;
  }[];
  composition: {
    name: string;
    wt: number;
    color: string;
    category: string;
  }[];
  costDrivers: {
    ingredient: string;
    costPerKg: number;
    sharePct: number;
  }[];
  sustainability: {
    label: string;
    reduction: string;
    benchmarkAnimal: string;
    botanicalPrototype: string;
  }[];
  texture: {
    parameter: string;
    targetValue: string;
    computedValue: string;
    parityPct: number;
  }[];
  allergens: {
    name: string;
    status: 'Excluded' | 'Present' | 'None';
    substitute: string;
  }[];
}

const ANALYTICS_DATASETS: Record<string, AnalyticsData> = {
  'Chicken Nugget': {
    targetName: 'Chicken Nugget (Gallus gallus)',
    nutrition: [
      { metric: 'Protein Density', conventional: '20.0g', botanical: '22.4g', delta: '+12.0%', pct: 100 },
      { metric: 'Total Fat', conventional: '14.0g', botanical: '7.8g', delta: '-44.3%', pct: 55 },
      { metric: 'Saturated Fat', conventional: '3.6g', botanical: '0.9g', delta: '-75.0%', pct: 25 },
      { metric: 'Dietary Fiber', conventional: '0.0g', botanical: '4.8g', delta: '+4.8g', pct: 85 },
      { metric: 'Sodium Content', conventional: '540mg', botanical: '380mg', delta: '-29.6%', pct: 70 },
      { metric: 'Cholesterol', conventional: '48mg', botanical: '0.0mg', delta: '-100%', pct: 0 }
    ],
    aminoAcids: [
      { name: 'Leucine', animal: 1.62, plant: 1.68, unit: 'g/100g' },
      { name: 'Lysine', animal: 1.74, plant: 1.58, unit: 'g/100g' },
      { name: 'Methionine', animal: 0.56, plant: 0.52, unit: 'g/100g' },
      { name: 'Threonine', animal: 0.88, plant: 0.84, unit: 'g/100g' },
      { name: 'Tryptophan', animal: 0.24, plant: 0.26, unit: 'g/100g' }
    ],
    composition: [
      { name: 'Yellow Pea Isolate 85%', wt: 24.5, color: '#063B2E', category: 'Core Globulin Protein' },
      { name: 'Chilled Alkaline Water', wt: 58.0, color: '#8DB9C9', category: 'Hydration Matrix' },
      { name: 'High-Oleic Sunflower Oil', wt: 8.2, color: '#D99A32', category: 'Lipid Dispersion' },
      { name: 'Faba Bean Isolate 82%', wt: 6.4, color: '#0A9F6E', category: 'Emulsion Stabilizer' },
      { name: 'Methylcellulose E461', wt: 1.8, color: '#A8B98E', category: 'Thermal Gel Scaffold' },
      { name: 'Natural Umami Seasoning', wt: 1.1, color: '#E99A86', category: 'Volatiles & Yeast' }
    ],
    costDrivers: [
      { ingredient: 'Yellow Pea 85%', costPerKg: 0.86, sharePct: 41.0 },
      { ingredient: 'Sunflower Lipid', costPerKg: 0.42, sharePct: 20.0 },
      { ingredient: 'Faba Bean Isolate', costPerKg: 0.38, sharePct: 18.1 },
      { ingredient: 'Methylcellulose', costPerKg: 0.28, sharePct: 13.3 },
      { ingredient: 'Water & Minerals', costPerKg: 0.16, sharePct: 7.6 }
    ],
    sustainability: [
      { label: 'Greenhouse Gas Delta', reduction: '-78%', benchmarkAnimal: '8.2 kg CO₂e / kg', botanicalPrototype: '1.8 kg CO₂e / kg' },
      { label: 'Blue Water Consumption', reduction: '-89%', benchmarkAnimal: '4,325 L / kg', botanicalPrototype: '475 L / kg' },
      { label: 'Agricultural Land Ratio', reduction: '-92%', benchmarkAnimal: '12.4 m² / kg', botanicalPrototype: '1.0 m² / kg' }
    ],
    texture: [
      { parameter: 'Anisotropic Shear Ratio (λ)', targetValue: '0.74 ± 0.05', computedValue: '0.76', parityPct: 97 },
      { parameter: 'Warner-Bratzler Peak Force', targetValue: '18.9 N', computedValue: '18.2 N', parityPct: 96 },
      { parameter: 'Thermal Gelation Plateau', targetValue: '70°C - 74°C', computedValue: '72°C', parityPct: 98 },
      { parameter: 'Moisture Retention Capacity', targetValue: '62.0%', computedValue: '64.2%', parityPct: 96 }
    ],
    allergens: [
      { name: 'Soy', status: 'Excluded', substitute: 'Yellow Pea Isolate 85%' },
      { name: 'Gluten / Wheat', status: 'Excluded', substitute: 'Tapioca & Native Corn Scaffold' },
      { name: 'Tree Nuts & Peanuts', status: 'Excluded', substitute: 'Zero nut precursors utilized' },
      { name: 'Dairy (Casein/Whey)', status: 'Excluded', substitute: '100% Botanical Plant Proteins' },
      { name: 'Egg (Albumin)', status: 'Excluded', substitute: 'Thermally responsive hydrocolloids' }
    ]
  },
  'Mozzarella Cheese': {
    targetName: 'Mozzarella Cheese (Bos taurus)',
    nutrition: [
      { metric: 'Protein Density', conventional: '22.0g', botanical: '19.8g', delta: '-10.0%', pct: 90 },
      { metric: 'Total Fat', conventional: '22.4g', botanical: '18.2g', delta: '-18.7%', pct: 80 },
      { metric: 'Saturated Fat', conventional: '13.2g', botanical: '6.4g', delta: '-51.5%', pct: 48 },
      { metric: 'Dietary Fiber', conventional: '0.0g', botanical: '3.2g', delta: '+3.2g', pct: 60 },
      { metric: 'Sodium Content', conventional: '620mg', botanical: '410mg', delta: '-33.8%', pct: 66 },
      { metric: 'Cholesterol', conventional: '79mg', botanical: '0.0mg', delta: '-100%', pct: 0 }
    ],
    aminoAcids: [
      { name: 'Leucine', animal: 1.84, plant: 1.54, unit: 'g/100g' },
      { name: 'Lysine', animal: 1.68, plant: 1.42, unit: 'g/100g' },
      { name: 'Methionine', animal: 0.52, plant: 0.44, unit: 'g/100g' },
      { name: 'Threonine', animal: 0.92, plant: 0.78, unit: 'g/100g' },
      { name: 'Tryptophan', animal: 0.28, plant: 0.24, unit: 'g/100g' }
    ],
    composition: [
      { name: 'Cashew Emulsion 70%', wt: 32.0, color: '#063B2E', category: 'Lipid-Protein Cream' },
      { name: 'Purified Water', wt: 34.9, color: '#8DB9C9', category: 'Hydration Phase' },
      { name: 'Fractionated Coconut Oil', wt: 18.2, color: '#D99A32', category: 'Melt Triglycerides' },
      { name: 'Tapioca Scaffold Starch', wt: 14.5, color: '#0A9F6E', category: 'Stretch Hydrocolloid' },
      { name: 'Microbial Transglutaminase', wt: 0.4, color: '#A8B98E', category: 'Enzyme Cross-Link' }
    ],
    costDrivers: [
      { ingredient: 'Cashew Base', costPerKg: 1.25, sharePct: 48.0 },
      { ingredient: 'Coconut Oil', costPerKg: 0.65, sharePct: 25.0 },
      { ingredient: 'Tapioca Starch', costPerKg: 0.45, sharePct: 17.3 },
      { ingredient: 'Enzymes & Salts', costPerKg: 0.25, sharePct: 9.7 }
    ],
    sustainability: [
      { label: 'Greenhouse Gas Delta', reduction: '-82%', benchmarkAnimal: '14.8 kg CO₂e / kg', botanicalPrototype: '2.6 kg CO₂e / kg' },
      { label: 'Blue Water Consumption', reduction: '-75%', benchmarkAnimal: '5,060 L / kg', botanicalPrototype: '1,240 L / kg' },
      { label: 'Agricultural Land Ratio', reduction: '-88%', benchmarkAnimal: '18.2 m² / kg', botanicalPrototype: '2.1 m² / kg' }
    ],
    texture: [
      { parameter: 'Stretch Extension Pull', targetValue: '45 cm', computedValue: '42 cm', parityPct: 93 },
      { parameter: 'Melt Transition Temperature', targetValue: '34°C - 38°C', computedValue: '36°C', parityPct: 97 },
      { parameter: 'Free Oil Separation', targetValue: '< 2.5%', computedValue: '2.1%', parityPct: 96 },
      { parameter: 'Chewiness Modulus', targetValue: '14.2 N', computedValue: '13.8 N', parityPct: 97 }
    ],
    allergens: [
      { name: 'Dairy & Lactose', status: 'Excluded', substitute: 'Cashew Emulsion & Plant Lipids' },
      { name: 'Soy', status: 'Excluded', substitute: 'Tapioca & Cashew Scaffolding' },
      { name: 'Gluten / Wheat', status: 'Excluded', substitute: 'Certified Gluten-Free Starches' },
      { name: 'Egg', status: 'Excluded', substitute: 'Enzymatic cross-linking' },
      { name: 'Tree Nuts', status: 'Present', substitute: 'Cashew active (Swap to Oat/Faba for Nut-Free)' }
    ]
  }
};

export const ComputationalAnalyticsSection: React.FC = () => {
  const [selectedTargetKey, setSelectedTargetKey] = useState<string>('Chicken Nugget');
  const [activeTab, setActiveTab] = useState<'nutrition' | 'composition' | 'cost' | 'sustainability' | 'texture' | 'allergens'>('nutrition');

  const dataset = ANALYTICS_DATASETS[selectedTargetKey] || ANALYTICS_DATASETS['Chicken Nugget'];

  return (
    <section className="flex flex-col gap-6 w-full">
      {/* Section Header & Target Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A9F6E]" />
            <span className="font-mono text-xs font-semibold text-[#063B2E] uppercase tracking-wider">
              QUANTITATIVE R&amp;D TELEMETRY // MULTI-OBJECTIVE SOLVER
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#10231D] tracking-tight mt-1.5 break-words">
            Computational Analytics Suite
          </h2>
          <p className="text-xs sm:text-sm text-[#61706A] mt-1.5 max-w-2xl leading-relaxed">
            Live biochemical stoichiometry, DIAAS amino acid parity, pilot formulation costs, and biocentric LCA metrics calculated across in-silico prototypes.
          </p>
        </div>

        {/* Target Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-[#61706A] hidden sm:inline">Benchmark:</span>
          {Object.keys(ANALYTICS_DATASETS).map((target) => (
            <button
              key={target}
              onClick={() => setSelectedTargetKey(target)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                selectedTargetKey === target
                  ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-xs font-semibold'
                  : 'bg-white text-[#61706A] hover:text-[#10231D] border-[#D9E2DC]'
              }`}
            >
              {target}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analytics Container with Navigation Tabs */}
      <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card flex flex-col gap-6 min-w-0">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-[#D9E2DC] pb-3 overflow-x-auto min-w-0">
          {[
            { id: 'nutrition', label: 'Nutritional Parity', icon: Activity },
            { id: 'composition', label: 'Batch Composition', icon: PieChart },
            { id: 'cost', label: 'Unit Cost Drivers', icon: DollarSign },
            { id: 'sustainability', label: 'Biocentric LCA', icon: Leaf },
            { id: 'texture', label: 'Shear & Rheology', icon: Layers },
            { id: 'allergens', label: 'Allergen Audit', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                  active
                    ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-xs font-semibold'
                    : 'bg-white text-[#61706A] hover:text-[#10231D] border-[#D9E2DC] hover:bg-[#EEF3ED]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#35D39A]' : 'text-[#61706A]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Nutritional Parity */}
        {activeTab === 'nutrition' && (
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-lg text-[#063B2E] break-words">
                  Macronutrient &amp; Micronutrient Equivalence
                </h3>
                <p className="text-xs text-[#61706A]">
                  Side-by-side comparison per 100g serving between conventional {dataset.targetName} and botanical candidate
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto shrink-0">
                DIAAS &gt; 0.94 EQUIVALENT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataset.nutrition.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col gap-2 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-[#10231D] break-words">{item.metric}</span>
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                      item.delta.startsWith('+') ? 'bg-[#EEF3ED] text-[#063B2E]' : 'bg-white text-[#61706A] border border-[#D9E2DC]'
                    }`}>
                      {item.delta}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#61706A] uppercase truncate">Conventional Animal:</span>
                      <div className="font-mono text-sm font-semibold text-[#61706A] mt-0.5">{item.conventional}</div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#063B2E] uppercase font-bold truncate">Botanical Candidate:</span>
                      <div className="font-mono text-sm font-bold text-[#063B2E] mt-0.5">{item.botanical}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Essential Amino Acid Profile */}
            <div className="p-4 rounded-2xl bg-[#EEF3ED]/70 border border-[#D9E2DC] min-w-0">
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <span className="font-display font-bold text-xs text-[#063B2E] uppercase tracking-wider">
                  Essential Amino Acid Stoichiometry (DIAAS Parity)
                </span>
                <span className="text-[10px] font-mono text-[#61706A]">Grams per 100g protein</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {dataset.aminoAcids.map((aa, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white border border-[#D9E2DC] text-center min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">{aa.name}</div>
                    <div className="text-sm font-display font-bold text-[#10231D] mt-1">{aa.plant} {aa.unit}</div>
                    <div className="text-[9px] font-mono text-[#063B2E] mt-0.5 font-semibold">Control: {aa.animal}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Batch Composition */}
        {activeTab === 'composition' && (
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-lg text-[#063B2E] break-words">
                  100kg Wet-Lab Pilot Stoichiometry (wt%)
                </h3>
                <p className="text-xs text-[#61706A]">
                  Precision mass-balance distribution of plant isolates, hydration phase, and functional hydrocolloids
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto shrink-0">
                TOTAL: 100.0% WT
              </span>
            </div>

            {/* Stacked Composition Bar */}
            <div className="flex h-5 w-full rounded-xl overflow-hidden bg-[#EEF3ED] p-0.5 border border-[#D9E2DC]">
              {dataset.composition.map((item, i) => (
                <div
                  key={i}
                  style={{ width: `${item.wt}%`, backgroundColor: item.color }}
                  className="h-full transition-all duration-500 first:rounded-l-lg last:rounded-r-lg"
                  title={`${item.name}: ${item.wt}%`}
                />
              ))}
            </div>

            {/* Ingredient Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dataset.composition.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex items-center justify-between min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="min-w-0">
                      <div className="font-display font-bold text-xs text-[#10231D] break-words">{item.name}</div>
                      <div className="text-[10px] text-[#61706A] mt-0.5 break-words">{item.category}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <div className="font-mono font-bold text-sm text-[#063B2E]">{item.wt.toFixed(1)}%</div>
                    <div className="text-[10px] font-mono text-[#61706A]">{item.wt.toFixed(1)} kg</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Unit Cost Drivers */}
        {activeTab === 'cost' && (
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-lg text-[#063B2E] break-words">
                  Commercial Cost Viability &amp; Raw Material Drivers
                </h3>
                <p className="text-xs text-[#61706A]">
                  Cost per kilogram calculated deterministically from spot raw material commodity pricing
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto shrink-0">
                BELOW CEILING &lt; $2.20 / KG
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                <div>
                  <span className="text-[10px] font-mono text-[#61706A] uppercase">Total Calculated Formulation Cost</span>
                  <div className="text-3xl font-display font-bold text-[#063B2E] mt-1">$2.10 <span className="text-sm font-normal text-[#61706A]">/ kg</span></div>
                  <p className="text-xs text-[#61706A] mt-2 leading-relaxed">
                    Formulation delivers commercial feasibility with a 24% gross margin threshold at commercial pilot scale (1,000kg batch runs).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#D9E2DC] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#61706A]">Ceiling Limit: $2.20/kg</span>
                  <span className="text-[#063B2E] font-bold">-$0.10 Headroom</span>
                </div>
              </div>

              {/* Drivers Breakdown */}
              <div className="flex flex-col gap-2 min-w-0">
                <span className="text-[11px] font-mono text-[#61706A] font-medium">Cost Distribution by Ingredient:</span>
                {dataset.costDrivers.map((driver, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#F6F7F2] border border-[#D9E2DC] flex items-center justify-between text-xs min-w-0">
                    <span className="font-medium text-[#10231D] truncate pr-2">{driver.ingredient}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[#61706A]">${driver.costPerKg.toFixed(2)} / kg</span>
                      <span className="font-mono font-bold text-[#063B2E] bg-[#EEF3ED] px-2 py-0.5 rounded border border-[#D9E2DC]">
                        {driver.sharePct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Biocentric LCA */}
        {activeTab === 'sustainability' && (
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-lg text-[#063B2E] break-words">
                  Biocentric Lifecycle Assessment (LCA) Savings
                </h3>
                <p className="text-xs text-[#61706A]">
                  Calculated ecological savings per metric ton produced versus conventional animal supply chain
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto shrink-0">
                PROTOTYPE ESTIMATE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dataset.sustainability.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-mono text-[#61706A] uppercase tracking-wider">{item.label}</span>
                    <div className="text-3xl font-display font-bold text-[#063B2E] mt-1">{item.reduction}</div>
                    <div className="text-xs text-[#61706A] mt-2 space-y-1">
                      <div>Conventional: <strong className="text-[#10231D] font-mono">{item.benchmarkAnimal}</strong></div>
                      <div>Botanical: <strong className="text-[#063B2E] font-mono">{item.botanicalPrototype}</strong></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#D9E2DC] text-[10px] font-mono text-[#61706A]">
                    Estimated via Ecoinvent 3.8 database
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Shear & Rheology */}
        {activeTab === 'texture' && (
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-lg text-[#063B2E] break-words">
                  Rheological Modulus &amp; Fibrillar Anisotropy
                </h3>
                <p className="text-xs text-[#61706A]">
                  Physical shear alignment and tensile cutting resistance calibrated against physical animal meat controls
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto shrink-0">
                WARNER-BRATZLER CALIBRATED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataset.texture.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-[#10231D] break-words">{item.parameter}</span>
                    <span className="font-mono text-xs font-bold text-[#063B2E] bg-[#EEF3ED] px-2 py-0.5 rounded border border-[#D9E2DC] shrink-0 ml-2">
                      {item.parityPct}% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#61706A] truncate">Animal Target:</span>
                      <div className="font-mono font-bold text-[#61706A] mt-0.5">{item.targetValue}</div>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[#063B2E] font-bold truncate">Synthesized Value:</span>
                      <div className="font-mono font-bold text-[#063B2E] mt-0.5">{item.computedValue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Allergen Audit */}
        {activeTab === 'allergens' && (
          <div className="flex flex-col gap-6 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-display font-extrabold text-lg text-[#063B2E] break-words">
                  Big-8 Allergen Exclusion &amp; Clean-Label Audit
                </h3>
                <p className="text-xs text-[#61706A]">
                  Deterministic cross-checking guaranteeing active allergen constraints are respected
                </p>
              </div>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto shrink-0">
                ISO-22000 COMPLIANT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {dataset.allergens.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F6F7F2] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-sm text-[#10231D] break-words">{item.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded shrink-0 ml-2 ${
                      item.status === 'Excluded' ? 'bg-[#EEF3ED] text-[#063B2E] border border-[#D9E2DC]' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#61706A] mt-2 break-words">
                    <span className="font-semibold text-[#10231D]">Alternative: </span>
                    {item.substitute}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
