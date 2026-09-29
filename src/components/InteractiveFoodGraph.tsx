import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dna,
  Layers,
  FlaskConical,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Info
} from 'lucide-react';

interface FoodGraphData {
  id: string;
  name: string;
  archetype: string;
  biology: string;
  targetMetrics: {
    protein: string;
    moisture: string;
    textureKey: string;
    textureVal: string;
  };
  botanicalNodes: {
    id: string;
    name: string;
    role: string;
    wt: string;
    property: string;
  }[];
  functionalNodes: {
    label: string;
    metric: string;
    parity: string;
  }[];
  candidate: {
    code: string;
    name: string;
    score: number;
    cost: string;
    protein: string;
    carbon: string;
  };
}

const GRAPH_TARGETS: FoodGraphData[] = [
  {
    id: 'chicken-nugget',
    name: 'Chicken Nugget',
    archetype: 'Gallus gallus domesticus',
    biology: 'Myofibrillar Actomyosin Network',
    targetMetrics: {
      protein: '22g / 100g',
      moisture: '64.2%',
      textureKey: 'Shear Anisotropy',
      textureVal: 'λ = 0.74'
    },
    botanicalNodes: [
      { id: 'b1', name: 'Yellow Pea 85%', role: 'Core Structural Globulin', wt: '24.5%', property: 'High gel strength, low allergen' },
      { id: 'b2', name: 'Methylcellulose E461', role: 'Thermal Hydrocolloid Scaffold', wt: '1.8%', property: 'Reversible thermal gelation at 68°C' },
      { id: 'b3', name: 'Sunflower Lipid Matrix', role: 'Intramuscular Adipose Mimic', wt: '8.2%', property: 'Lipid melting curve matching poultry fat' },
      { id: 'b4', name: 'Faba Bean Isolate 82%', role: 'Emulsion & Water Retention', wt: '6.4%', property: 'Rapid hydration, clean savory profile' }
    ],
    functionalNodes: [
      { label: 'Fibril Alignment', metric: 'λ = 0.76', parity: '96% Parity' },
      { label: 'Warner-Bratzler Shear', metric: '18.2 N', parity: '94% Parity' },
      { label: 'Thermal Gel Plateau', metric: '72°C', parity: '98% Parity' },
      { label: 'Water Activity (aw)', metric: '0.94', parity: '95% Parity' }
    ],
    candidate: {
      code: 'NUG-P88-F',
      name: 'Alpha-1 Fibrillar Matrix',
      score: 94,
      cost: '$2.10/kg',
      protein: '22.4g/100g',
      carbon: '-78% CO₂e'
    }
  },
  {
    id: 'mozzarella',
    name: 'Mozzarella Cheese',
    archetype: 'Bos taurus Casein',
    biology: 'Micellar Calcium Phosphate Colloid',
    targetMetrics: {
      protein: '20g / 100g',
      moisture: '52.0%',
      textureKey: 'Stretch Elongation',
      textureVal: 'ε = 4.2'
    },
    botanicalNodes: [
      { id: 'b1', name: 'Cashew Emulsion 70%', role: 'Colloidal Cream Base', wt: '32.0%', property: 'Micro-lipid dispersion resembling milk fat' },
      { id: 'b2', name: 'Tapioca Scaffold Starch', role: 'Thermo-Reversible Stretch', wt: '14.5%', property: 'High peak amylopectin elongation' },
      { id: 'b3', name: 'Microbial Transglutaminase', role: 'Protein Cross-Linker', wt: '0.4%', property: 'Covalent acyl-transfer cross-linking' },
      { id: 'b4', name: 'Fractionated Coconut Oil', role: 'Low-Temp Melt Point', wt: '18.2%', property: 'Melt transition at 34°C with zero off-notes' }
    ],
    functionalNodes: [
      { label: 'Tensile Stretch', metric: '42 cm pull', parity: '95% Parity' },
      { label: 'Melt Flow Index', metric: '78 mm', parity: '92% Parity' },
      { label: 'Oil Separation', metric: '2.1%', parity: '96% Parity' },
      { label: 'Brownability Index', metric: 'L* = 54', parity: '91% Parity' }
    ],
    candidate: {
      code: 'MOZ-C72-S',
      name: 'Alpha-2 Curd & Stretch',
      score: 92,
      cost: '$2.60/kg',
      protein: '19.8g/100g',
      carbon: '-82% CO₂e'
    }
  },
  {
    id: 'whole-milk',
    name: 'Whole Milk',
    archetype: 'Bovine Lacteal Matrix',
    biology: 'Sub-Micron Lipid-in-Water Emulsion',
    targetMetrics: {
      protein: '3.4g / 100g',
      moisture: '87.5%',
      textureKey: 'Colloidal Viscosity',
      textureVal: '1.8 mPa·s'
    },
    botanicalNodes: [
      { id: 'b1', name: 'Enzymatic Oat Base 12%', role: 'Soluble Beta-Glucan Scaffolding', wt: '84.0%', property: 'Amylase digestion delivering natural sweetness' },
      { id: 'b2', name: 'Pea Protein Micelle', role: 'Suspension Buffer & Calcium', wt: '2.8%', property: 'Micro-milled protein isolate suspended at pH 6.8' },
      { id: 'b3', name: 'Dipottasium Phosphate', role: 'Acid-Heat Curdling Stabilizer', wt: '0.4%', property: 'Buffering coffee thermal shock without curdling' },
      { id: 'b4', name: 'High-Oleic Sunflower Oil', role: 'Sub-Micron Fat Globules', wt: '3.2%', property: 'High-pressure homogenization at 250 bar' }
    ],
    functionalNodes: [
      { label: 'Viscosity (20°C)', metric: '1.82 mPa·s', parity: '98% Parity' },
      { label: 'Coffee Stability', metric: 'pH 4.8 Stable', parity: '99% Parity' },
      { label: 'Microfoam Density', metric: '0.28 g/mL', parity: '93% Parity' },
      { label: 'Lactose Parity', metric: '0.0g (Sugar 4.2g)', parity: '94% Parity' }
    ],
    candidate: {
      code: 'MLK-O84-E',
      name: 'Alpha-3 Barista Dispersion',
      score: 95,
      cost: '$0.65/L',
      protein: '3.4g/100g',
      carbon: '-88% CO₂e'
    }
  },
  {
    id: 'egg',
    name: 'Whole Egg',
    archetype: 'Gallus gallus Ovalbumin',
    biology: 'Thermal Gelation & Emulsion Colloid',
    targetMetrics: {
      protein: '13g / 100g',
      moisture: '74.5%',
      textureKey: 'Coagulation Point',
      textureVal: '65°C - 70°C'
    },
    botanicalNodes: [
      { id: 'b1', name: 'Chickpea Albumin Isolate', role: 'Heat-Set Gel Matrix', wt: '16.5%', property: 'Thermal unfolding matching ovalbumin coagulation' },
      { id: 'b2', name: 'Sunflower Lecithin 95%', role: 'Phospholipid Emulsifier', wt: '2.4%', property: 'HLB 8.0 natural lipophilic dispersion' },
      { id: 'b3', name: 'Methylcellulose Scaffolding', role: 'Cold Viscosity & Structure', wt: '1.2%', property: 'Synergistic gelation during pan heating' },
      { id: 'b4', name: 'Turmeric & Carrot Carotenoids', role: 'Natural Yolk Spectrum', wt: '0.3%', property: 'Heat-stable lutein beta-carotene index' }
    ],
    functionalNodes: [
      { label: 'Coagulation Temp', metric: '68°C', parity: '96% Parity' },
      { label: 'Emulsion Capacity', metric: '820 mL oil/g', parity: '94% Parity' },
      { label: 'Foam Expansion', metric: '380%', parity: '91% Parity' },
      { label: 'Crumb Springiness', metric: '0.86', parity: '95% Parity' }
    ],
    candidate: {
      code: 'EGG-C16-A',
      name: 'Alpha-4 Biomimetic Scramble',
      score: 93,
      cost: '$1.40/kg',
      protein: '13.2g/100g',
      carbon: '-84% CO₂e'
    }
  }
];

interface InteractiveFoodGraphProps {
  onSelectTarget?: (targetName: string) => void;
  onStartFormulation?: (targetName: string) => void;
}

export const InteractiveFoodGraph: React.FC<InteractiveFoodGraphProps> = ({
  onSelectTarget,
  onStartFormulation
}) => {
  const [selectedTargetIndex, setSelectedTargetIndex] = useState(0);
  const [activeBotanicalId, setActiveBotanicalId] = useState<string | null>(null);
  const [isSynthesizingPulse, setIsSynthesizingPulse] = useState(false);

  const activeData = GRAPH_TARGETS[selectedTargetIndex];

  // Trigger brief synthesis pulse when switching targets
  const handleSwitchTarget = (idx: number) => {
    setSelectedTargetIndex(idx);
    setIsSynthesizingPulse(true);
    setTimeout(() => setIsSynthesizingPulse(false), 500);
    if (onSelectTarget) {
      onSelectTarget(GRAPH_TARGETS[idx].name);
    }
  };

  const activeNode = activeBotanicalId
    ? activeData.botanicalNodes.find(b => b.id === activeBotanicalId) || activeData.botanicalNodes[0]
    : activeData.botanicalNodes[0];

  return (
    <div className="relative w-full rounded-3xl bg-white border border-[#D9E2DC] p-5 sm:p-7 shadow-card overflow-hidden flex flex-col gap-5 min-w-0">
      {/* Top Telemetry Header & Interactive Target Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D9E2DC] min-w-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#063B2E] text-[#35D39A] flex items-center justify-center shrink-0 shadow-xs">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-wider uppercase text-[#063B2E] font-bold">
                COMPUTATIONAL SYNTHESIS GRAPH
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#35D39A] animate-pulse" />
            </div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[#10231D] truncate">
              Biomimetic Pathway Engine
            </h3>
          </div>
        </div>

        {/* Quick Target Switcher Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 min-w-0">
          {GRAPH_TARGETS.map((t, idx) => {
            const isSelected = selectedTargetIndex === idx;
            return (
              <button
                key={t.id}
                onClick={() => handleSwitchTarget(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-xs font-semibold'
                    : 'bg-[#EEF3ED] text-[#61706A] hover:text-[#10231D] border-[#D9E2DC] hover:bg-white'
                }`}
              >
                <span>{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 4-Stage Pathway Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-w-0">
        {/* Stage 1: Target Conventional Archetype (Col 1-3) */}
        <div className="lg:col-span-3 flex flex-col justify-between p-4 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#61706A] uppercase pb-2 border-b border-[#D9E2DC]">
              <span>Stage 01: Archetype</span>
              <span className="text-[#063B2E] font-semibold">Animal Target</span>
            </div>

            <div className="mt-3">
              <h4 className="font-display font-bold text-base text-[#10231D] break-words">
                {activeData.name}
              </h4>
              <p className="text-[11px] font-mono text-[#063B2E] mt-0.5">
                {activeData.archetype}
              </p>
              <p className="text-[11px] text-[#61706A] mt-1 leading-snug break-words">
                {activeData.biology}
              </p>
            </div>

            {/* Target Spec Pills */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="p-2 rounded-lg bg-white border border-[#D9E2DC] min-w-0">
                <div className="text-[9px] font-mono text-[#61706A] uppercase truncate">Protein</div>
                <div className="text-xs font-display font-bold text-[#10231D] mt-0.5 truncate">
                  {activeData.targetMetrics.protein}
                </div>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#D9E2DC] min-w-0">
                <div className="text-[9px] font-mono text-[#61706A] uppercase truncate">Moisture</div>
                <div className="text-xs font-display font-bold text-[#10231D] mt-0.5 truncate">
                  {activeData.targetMetrics.moisture}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#D9E2DC] flex items-center justify-between text-[10px] font-mono text-[#61706A]">
            <span className="truncate">{activeData.targetMetrics.textureKey}</span>
            <span className="font-bold text-[#063B2E] shrink-0 ml-2">{activeData.targetMetrics.textureVal}</span>
          </div>
        </div>

        {/* Stage 2 & 3: Botanical Isolates & Functional Rheology (Col 4-8) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 rounded-2xl bg-[#ffffff] border border-[#D9E2DC] shadow-subtle min-w-0">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#61706A] uppercase pb-2 border-b border-[#D9E2DC]">
            <span>Stage 02 &amp; 03: Botanical Permutation</span>
            <span className="text-[#063B2E] font-semibold">1,420 Screened</span>
          </div>

          {/* Interactive Botanical Node Chips */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-mono font-medium text-[#61706A]">
              Selected Complementary Isolates:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeData.botanicalNodes.map((b) => {
                const isActive = activeBotanicalId === b.id || (!activeBotanicalId && b.id === 'b1');
                return (
                  <button
                    key={b.id}
                    onClick={() => setActiveBotanicalId(b.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer min-w-0 ${
                      isActive
                        ? 'bg-[#EEF3ED] border-[#063B2E] shadow-xs'
                        : 'bg-white border-[#D9E2DC] hover:border-[#0A9F6E]/40 hover:bg-[#EEF3ED]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-display font-bold text-xs text-[#10231D] truncate">
                        {b.name}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-[#063B2E] shrink-0">{b.wt}</span>
                    </div>
                    <p className="text-[10px] text-[#61706A] truncate mt-0.5">{b.role}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Inspector Card for Selected Botanical Node */}
          <div className="p-3 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] text-xs min-w-0">
            <div className="flex items-center justify-between mb-1 gap-2">
              <span className="font-display font-bold text-[#10231D] text-xs truncate">
                {activeNode.name}
              </span>
              <span className="text-[10px] font-mono text-[#063B2E] bg-white px-1.5 py-0.2 rounded border border-[#D9E2DC] shrink-0">
                {activeNode.wt} Blend Ratio
              </span>
            </div>
            <p className="text-[11px] text-[#61706A] leading-relaxed break-words">
              {activeNode.property}
            </p>
          </div>

          {/* Functional Parity Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 border-t border-[#D9E2DC]">
            {activeData.functionalNodes.map((fn, i) => (
              <div key={i} className="p-2 rounded-lg bg-[#EEF3ED] border border-[#D9E2DC] text-center min-w-0">
                <div className="text-[9px] font-mono text-[#61706A] truncate">{fn.label}</div>
                <div className="text-[11px] font-mono font-bold text-[#10231D] mt-0.5 truncate">{fn.metric}</div>
                <div className="text-[9px] font-mono text-[#063B2E] font-medium mt-0.5 truncate">{fn.parity}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 4: Synthesized Pareto Candidate (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#063B2E] to-[#082A23] text-white shadow-card min-w-0">
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono text-[#35D39A] uppercase pb-2 border-b border-white/10">
              <span>Stage 04: Pareto Convergence</span>
              <span className="bg-[#35D39A]/20 px-2 py-0.5 rounded text-white font-semibold">TOP RESULT</span>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-white/70">
                    REF #{activeData.candidate.code}
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mt-0.5 break-words">
                    {activeData.candidate.name}
                  </h4>
                </div>

                {/* Score Dial Pill */}
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shrink-0">
                  <span className="font-display font-bold text-xl text-[#35D39A] leading-none">
                    {activeData.candidate.score}
                  </span>
                  <span className="text-[8px] font-mono text-white/70 leading-none mt-0.5">
                    / 100
                  </span>
                </div>
              </div>
            </div>

            {/* Spec Matrix */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 min-w-0">
                <div className="text-[9px] font-mono text-white/70 uppercase truncate">Protein</div>
                <div className="text-xs font-display font-bold text-white mt-0.5 truncate">
                  {activeData.candidate.protein}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 min-w-0">
                <div className="text-[9px] font-mono text-white/70 uppercase truncate">Unit Cost</div>
                <div className="text-xs font-display font-bold text-[#35D39A] mt-0.5 truncate">
                  {activeData.candidate.cost}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 min-w-0">
                <div className="text-[9px] font-mono text-white/70 uppercase truncate">LCA Delta</div>
                <div className="text-xs font-display font-bold text-[#35D39A] mt-0.5 truncate">
                  {activeData.candidate.carbon}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-white/70">
              Pilot Batch Ready
            </span>
            <button
              onClick={() => onStartFormulation ? onStartFormulation(activeData.name) : undefined}
              className="px-4 py-2 rounded-xl bg-[#35D39A] hover:bg-[#0A9F6E] text-[#063B2E] font-display font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle shrink-0"
            >
              <span>Load in Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Computational Synthesis Spine (Bottom telemetry ticker) */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#61706A] pt-1 px-1 min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#35D39A] shrink-0" />
          <span className="truncate">IN-SILICO PATHWAY: {activeData.archetype} &rarr; {activeData.botanicalNodes[0].name} + {activeData.botanicalNodes[1].name} &rarr; {activeData.candidate.code}</span>
        </div>
        <span className="hidden sm:inline text-[#063B2E] font-semibold shrink-0 ml-2">CONVERGENCE &lt; 42ms</span>
      </div>
    </div>
  );
};
