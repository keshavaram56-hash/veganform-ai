import React, { useState } from 'react';
import { TabType } from '../types/formulation';
import { ArrowRight } from 'lucide-react';

interface TargetFoodItem {
  id: string;
  key: string;
  name: string;
  category: string;
  visualTag: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  proteinPer100g: number;
  fatPer100g: number;
  moisturePercent: number;
  carbonKgPerKg: number;
  structuralTarget: string;
  molecularChallenge: string;
  keyBioMarkers: string[];
  recommendedBotanicals: string[];
}

interface TargetFoodsSectionProps {
  onSelectTarget: (targetName: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const TARGET_FOODS_DATA: TargetFoodItem[] = [
  {
    id: 'salmon',
    key: 'SALMON',
    name: 'Atlantic Salmon',
    category: 'Anadromous Marine Teleost Matrix',
    visualTag: 'Marine Teleost // Cold-Water',
    accentColor: '#E99A86',
    badgeBg: 'bg-[#E99A86]/20',
    badgeText: 'text-[#8b4331]',
    borderClass: 'border-[#E99A86]/40 hover:border-[#E99A86]',
    proteinPer100g: 20.4,
    fatPer100g: 13.4,
    moisturePercent: 65,
    carbonKgPerKg: 11.9,
    structuralTarget: 'Lamellar Myotome Sheet Cleavage',
    molecularChallenge: 'Replicating w-shaped muscle bands and delicate 48°C denaturation without rubbery rebound.',
    keyBioMarkers: ['Astaxanthin Carotenoid', 'Collagenous Myosepta', 'EPA / DHA Long-Chain Lipids'],
    recommendedBotanicals: ['Textured Pea Isolate', 'Tapioca Gel Matrix', 'Algal Micro-Lipids']
  },
  {
    id: 'fish',
    key: 'FISH',
    name: 'White Fish Fillet',
    category: 'Demersal Teleost Muscle Matrix',
    visualTag: 'Demersal Lean // Pearlescent',
    accentColor: '#8DB9C9',
    badgeBg: 'bg-[#8DB9C9]/20',
    badgeText: 'text-[#245263]',
    borderClass: 'border-[#8DB9C9]/40 hover:border-[#8DB9C9]',
    proteinPer100g: 17.8,
    fatPer100g: 0.8,
    moisturePercent: 80,
    carbonKgPerKg: 5.4,
    structuralTarget: 'Pearlescent Brittle Flake Fracture',
    molecularChallenge: 'Translucent-to-opaque 52°C heat set and fragile flake separation with ultra-low fat (<1%).',
    keyBioMarkers: ['Actomyosin Reticulum', 'Delicate Myocommata', 'Oceanic Osmolytes'],
    recommendedBotanicals: ['Native Potato Starch', 'Cold-Set Methylcellulose', 'Kelp Sea Minerals']
  },
  {
    id: 'mutton',
    key: 'MUTTON',
    name: 'Braised Mutton',
    category: 'Ovine Ruminant Muscle Matrix',
    visualTag: 'Slow-Twitch Ovine // Tallow Rich',
    accentColor: '#A8B98E',
    badgeBg: 'bg-[#A8B98E]/20',
    badgeText: 'text-[#3d5225]',
    borderClass: 'border-[#A8B98E]/40 hover:border-[#A8B98E]',
    proteinPer100g: 20.3,
    fatPer100g: 17.0,
    moisturePercent: 61,
    carbonKgPerKg: 39.2,
    structuralTarget: 'Dense Fibrous Chewy Pull & Tallow Coat',
    molecularChallenge: 'High melting point (44°C) tallow mouth-coating and branched-chain fatty acid gamey depth.',
    keyBioMarkers: ['Slow-Twitch Type I Fibers', 'Stearic Acid Tallow', 'Elevated Myoglobin Content'],
    recommendedBotanicals: ['High-Moisture Extruded Pea', 'Green Jackfruit Core', 'Lauric Plant Stearin']
  },
  {
    id: 'beef',
    key: 'BEEF',
    name: 'Ground Beef Patty',
    category: 'Bovine Skeletal Myofibrillar Matrix',
    visualTag: 'Bovine Skeletal // Coarse Grind',
    accentColor: '#C98278',
    badgeBg: 'bg-[#C98278]/20',
    badgeText: 'text-[#73352c]',
    borderClass: 'border-[#C98278]/40 hover:border-[#C98278]',
    proteinPer100g: 21.5,
    fatPer100g: 15.0,
    moisturePercent: 62,
    carbonKgPerKg: 60.0,
    structuralTarget: 'Coarse Grind Granule & Sizzle Sear',
    molecularChallenge: 'Biphasic lipid rendering (solid marble at cold, molten sizzle in pan) and heme pyrazine aroma.',
    keyBioMarkers: ['Dense Actomyosin Fibrils', 'Intermuscular Fat Pockets', 'Catalytic Heme Volatiles'],
    recommendedBotanicals: ['Textured Plant Protein 85%', 'Deodorized Coconut Fat', 'Betalain Browning Extract']
  }
];

export const TargetFoodsSection: React.FC<TargetFoodsSectionProps> = ({
  onSelectTarget,
  onNavigate
}) => {
  const [activeHoverId, setActiveHoverId] = useState<string>('salmon');

  const handleLaunchTarget = (food: TargetFoodItem) => {
    onSelectTarget(food.name);
    onNavigate('formulate');
  };

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Editorial Header Strip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-[#D9E2DC]">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A9F6E]" />
            <span className="text-[11px] font-mono tracking-wider text-[#063B2E] font-bold uppercase">
              TARGET ARCHETYPE SELECTION // 01
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#10231D] tracking-tight mt-1.5 break-words">
            Target Foods Architecture
          </h2>
          <p className="text-xs sm:text-sm text-[#61706A] mt-1.5 max-w-2xl leading-relaxed">
            Select an animal matrix archetype to deconstruct its microstructural fiber alignment, thermal phase kinetics, and lipid distribution into computational botanical formulation parameters.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-[#61706A] hidden sm:inline">
            4 Distinct Biopolymer Benchmarks
          </span>
          <div className="px-3.5 py-1.5 rounded-xl bg-white border border-[#D9E2DC] text-[11px] font-mono text-[#10231D] font-bold shadow-subtle">
            SELECT TO FORMULATE &rarr;
          </div>
        </div>
      </div>

      {/* 4 Multi-Panel Cards Grid - Content-Driven Heights with Zero Text Overlap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {TARGET_FOODS_DATA.map((food) => {
          const isHovered = activeHoverId === food.id;

          return (
            <div
              key={food.id}
              onMouseEnter={() => setActiveHoverId(food.id)}
              className={`group relative rounded-3xl bg-white border p-6 flex flex-col justify-between transition-all duration-300 shadow-card hover:shadow-card-hover cursor-pointer min-w-0 ${food.borderClass} ${
                isHovered ? 'ring-2 ring-[#0A9F6E]/30 -translate-y-1' : ''
              }`}
            >
              {/* Subtle top background accent tint */}
              <div
                className="absolute inset-x-0 top-0 h-32 rounded-t-3xl opacity-20 pointer-events-none transition-opacity"
                style={{
                  background: `linear-gradient(180deg, ${food.accentColor} 0%, transparent 100%)`
                }}
              />

              <div className="relative z-10 flex flex-col gap-4 min-w-0">
                {/* Header Tag & Pill */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${food.badgeBg} ${food.badgeText}`}>
                    {food.key}
                  </span>
                  <span className="text-[10px] font-mono text-[#61706A] truncate">
                    {food.visualTag.split('//')[0].trim()}
                  </span>
                </div>

                {/* Title & Classification */}
                <div className="min-w-0">
                  <h3 className="text-xl font-display font-extrabold text-[#10231D] tracking-tight group-hover:text-[#063B2E] transition-colors break-words">
                    {food.name}
                  </h3>
                  <p className="text-xs text-[#61706A] font-mono mt-1 break-words leading-snug">
                    {food.category}
                  </p>
                </div>

                {/* Key Metrics Tape */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-2xl bg-[#EEF3ED]/70 border border-[#D9E2DC]">
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Protein</div>
                    <div className="text-xs font-mono font-bold text-[#10231D]">
                      {food.proteinPer100g}g
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Lipid</div>
                    <div className="text-xs font-mono font-bold text-[#10231D]">
                      {food.fatPer100g}g
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Carbon</div>
                    <div className="text-xs font-mono font-bold text-[#063B2E]">
                      {food.carbonKgPerKg}kg
                    </div>
                  </div>
                </div>

                {/* Structural Parity Challenge - Content-driven without cut-off */}
                <div className="flex flex-col gap-1.5 text-xs min-w-0">
                  <div className="text-[11px] font-mono text-[#063B2E] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A9F6E]" />
                    <span>Structural Target:</span>
                  </div>
                  <div className="font-bold text-[#10231D] text-xs break-words">
                    {food.structuralTarget}
                  </div>
                  <p className="text-xs text-[#61706A] leading-relaxed break-words">
                    {food.molecularChallenge}
                  </p>
                </div>

                {/* Botanical Solution Tags */}
                <div className="flex flex-col gap-1.5 pt-3 border-t border-[#D9E2DC] min-w-0">
                  <span className="text-[10px] font-mono text-[#61706A] uppercase font-bold">
                    Botanical Replacements:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {food.recommendedBotanicals.map((botanical, bIdx) => (
                      <span
                        key={bIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#F6F7F2] border border-[#D9E2DC] text-[#063B2E] font-medium break-words"
                      >
                        {botanical}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button: Transition to Formulation Workspace */}
              <div className="relative z-10 mt-6 pt-4 border-t border-[#D9E2DC]">
                <button
                  onClick={() => handleLaunchTarget(food)}
                  className="w-full py-2.5 px-3 rounded-2xl bg-[#063B2E] hover:bg-[#082A23] text-white text-xs font-mono font-semibold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle group-hover:shadow-card"
                >
                  <span>Formulate {food.key}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#35D39A]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
