import React, { useState } from 'react';
import { TabType, CandidateFormulation, FormulationWeights } from '../types/formulation';
import { RadarChart, RadarSeries } from '../components/RadarChart';
import { rankFormulationCandidates } from '../engine/rankingEngine';
import { validateFormulation } from '../engine/allergenValidator';
import {
  Sliders,
  RotateCcw,
  ArrowRight,
  Table as TableIcon,
  CheckCircle2,
  AlertTriangle,
  Info,
  Layers,
  Sparkles,
  ShieldCheck,
  Microscope,
  DollarSign
} from 'lucide-react';

interface CandidatesViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
  selectedCandidateId: string;
  candidates: CandidateFormulation[];
  productName: string;
  allergenRestrictions?: string[];
  onRelaxConstraints?: () => void;
  onUpdateWeights?: (weights: FormulationWeights) => void;
  initialWeights?: FormulationWeights;
  isUnknownProduct?: boolean;
}

export const CandidatesView: React.FC<CandidatesViewProps> = ({
  onNavigate,
  onSelectCandidate,
  selectedCandidateId,
  candidates: inputCandidates,
  productName,
  allergenRestrictions = [],
  onRelaxConstraints,
  initialWeights = {
    tasteWeight: 30,
    textureWeight: 25,
    nutritionWeight: 20,
    costWeight: 15,
    sustainabilityWeight: 10
  },
  isUnknownProduct = false
}) => {
  const [weights, setWeights] = useState<FormulationWeights>(initialWeights);
  const [showWeightSliders, setShowWeightSliders] = useState(false);
  const [sortBy, setSortBy] = useState<'score' | 'cost' | 'texture' | 'protein'>('score');
  const [filterBase, setFilterBase] = useState<string>('all');
  const [activeSeriesIds, setActiveSeriesIds] = useState<string[]>(['cand-1', 'cand-2', 'reference']);

  // Validate every candidate immediately before displaying
  // Hard constraint violations are completely excluded from displayed top candidates
  const validCandidates = React.useMemo(() => {
    return (inputCandidates || []).filter(c => {
      const { valid } = validateFormulation(c, allergenRestrictions);
      return valid;
    }).map(c => ({
      ...c,
      constraintCompliant: true
    }));
  }, [inputCandidates, allergenRestrictions]);

  // Dynamically re-score and re-rank valid candidates based on active weights
  const rankedCandidates = React.useMemo(() => {
    return rankFormulationCandidates(validCandidates, weights);
  }, [validCandidates, weights]);

  // Sort logic
  const sortedCandidates = React.useMemo(() => {
    return [...rankedCandidates].sort((a, b) => {
      if (sortBy === 'score') return b.aiScore - a.aiScore;
      if (sortBy === 'cost') return a.costPerKg - b.costPerKg;
      if (sortBy === 'texture') return b.textureParity - a.textureParity;
      if (sortBy === 'protein') return b.proteinPer100g - a.proteinPer100g;
      return 0;
    }).filter(c => {
      if (filterBase === 'all') return true;
      return c.baseIsolate.toLowerCase().includes(filterBase.toLowerCase());
    });
  }, [rankedCandidates, sortBy, filterBase]);

  // Dynamically build radar chart series from top candidates
  const radarSeries: RadarSeries[] = React.useMemo(() => {
    const palette = ['#10b981', '#06b6d4', '#a855f7', '#f43f5e'];
    const fillPalette = ['rgba(16, 185, 129, 0.22)', 'rgba(6, 182, 212, 0.18)', 'rgba(168, 85, 247, 0.18)', 'rgba(244, 63, 94, 0.18)'];

    const dynamicSeries: RadarSeries[] = rankedCandidates.slice(0, 3).map((c, i) => ({
      id: `cand-${i + 1}`,
      name: `${c.name} (${c.code})`,
      color: palette[i % palette.length],
      fillColor: fillPalette[i % fillPalette.length],
      values: [
        c.tasteMatch,
        c.textureParity,
        c.nutritionDensity,
        c.costEfficiency,
        c.sustainabilityLca
      ]
    }));

    // Add animal reference benchmark series
    dynamicSeries.push({
      id: 'reference',
      name: `${productName} Control Benchmark`,
      color: '#94a3b8',
      strokeDash: '4 3',
      values: [95, 95, 80, 85, 45]
    });

    return dynamicSeries;
  }, [rankedCandidates, productName]);

  const toggleSeries = (id: string) => {
    setActiveSeriesIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleWeightChange = (key: keyof FormulationWeights, val: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Top Banner & Target Archetype Badge */}
      <section className="relative rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-6 sm:p-7 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-semibold">
                CANDIDATE RANKING ENGINE &bull; TOP {rankedCandidates.length} FORMULATIONS
              </span>
              <span className="font-mono text-[10px] text-[#8da396] bg-[#080d0b] px-2 py-0.5 rounded border border-[#1b2b22]">
                PROTOTYPE ESTIMATES
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1.5">
              Candidate Formulations &amp; Comparison
            </h1>
            <p className="text-xs sm:text-sm text-[#8da396] mt-1 max-w-xl">
              Target Reference: <span className="text-white font-medium">{productName}</span>. In-silico simulated solutions evaluated against chemical, textural, and economic benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowWeightSliders(!showWeightSliders)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer border ${
                showWeightSliders
                  ? 'bg-[#10b981] text-[#052e16] border-[#10b981] font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-[#121d17] hover:bg-[#182820] text-white border-[#1b2b22]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{showWeightSliders ? 'Hide Ranking Weights' : 'Adjust Priority Weights'}</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className="px-3.5 py-2 rounded-xl bg-[#121d17] hover:bg-[#182820] text-white border border-[#1b2b22] text-xs font-mono transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#10b981]" />
              <span>Re-run Parameters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Weight Adjustment Drawer */}
        {showWeightSliders && (
          <div className="mt-5 p-4 rounded-2xl bg-[#080d0b] border border-[#10b981]/40 flex flex-col gap-3 animate-fade-in">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#1b2b22]">
              <span className="font-mono text-[#10b981] font-semibold flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Dynamic Multi-Objective Re-ranking
              </span>
              <span className="font-mono text-[11px] text-[#8da396]">
                Candidates and radar scores update live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Taste</span>
                  <span className="text-[#10b981] font-bold">{weights.tasteWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.tasteWeight}
                  onChange={(e) => handleWeightChange('tasteWeight', Number(e.target.value))}
                  className="w-full accent-[#10b981] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Texture</span>
                  <span className="text-[#10b981] font-bold">{weights.textureWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.textureWeight}
                  onChange={(e) => handleWeightChange('textureWeight', Number(e.target.value))}
                  className="w-full accent-[#10b981] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Nutrition</span>
                  <span className="text-[#10b981] font-bold">{weights.nutritionWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.nutritionWeight}
                  onChange={(e) => handleWeightChange('nutritionWeight', Number(e.target.value))}
                  className="w-full accent-[#10b981] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Cost</span>
                  <span className="text-[#10b981] font-bold">{weights.costWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.costWeight}
                  onChange={(e) => handleWeightChange('costWeight', Number(e.target.value))}
                  className="w-full accent-[#10b981] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#8da396]">Sustain</span>
                  <span className="text-[#10b981] font-bold">{weights.sustainabilityWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.sustainabilityWeight}
                  onChange={(e) => handleWeightChange('sustainabilityWeight', Number(e.target.value))}
                  className="w-full accent-[#10b981] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Unknown Product Notice if applicable */}
        {isUnknownProduct && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <span className="font-bold">Limited knowledge-base coverage: </span>
                This food target is synthesized using generative conceptual reasoning. Physical laboratory validation is strictly required before commercial pilot use.
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 font-mono text-[10px] uppercase font-semibold shrink-0">
              EXPLORATORY SPEC
            </span>
          </div>
        )}

        {/* Filter & Sort Bar */}
        <div className="mt-5 pt-4 border-t border-[#1b2b22] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-mono text-[#8da396] mr-1">Base Filter:</span>
            {['all', 'pea', 'soy', 'oat', 'cashew', 'chickpea'].map((base) => (
              <button
                key={base}
                onClick={() => setFilterBase(base)}
                className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  filterBase === base
                    ? 'bg-[#10b981] text-[#052e16] font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    : 'bg-[#080d0b] text-[#8da396] hover:text-white border border-[#1b2b22]'
                }`}
              >
                {base}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8da396]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#080d0b] border border-[#1b2b22] rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-[#10b981] cursor-pointer"
            >
              <option value="score">AI Bio-Score (High to Low)</option>
              <option value="cost">Unit Cost / kg (Low to High)</option>
              <option value="texture">Texture Parity % (High to Low)</option>
              <option value="protein">Protein Density (High to Low)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Multi-Objective Organoleptic Radar Arena */}
      <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-white text-base">Multi-Objective Organoleptic Frontier</h3>
            <p className="text-xs text-[#8da396]">
              Equilibrium comparison along 5 bio-physical dimensions against {productName} benchmark
            </p>
          </div>

          {/* Radar Series Legend Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            {radarSeries.map(s => {
              const active = activeSeriesIds.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggleSeries(s.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1.5 transition-all border cursor-pointer ${
                    active
                      ? 'bg-[#080d0b] text-white border-[#1b2b22]'
                      : 'bg-[#080d0b]/40 text-[#8da396] opacity-50 border-transparent'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Radar Graphic Display */}
        <div className="w-full flex items-center justify-center p-2 bg-[#080d0b] rounded-2xl border border-[#1b2b22]">
          <RadarChart
            series={radarSeries.filter(s => activeSeriesIds.includes(s.id))}
            axes={['Taste (AI-estimated)', 'Texture (AI-estimated)', 'Nutrition', 'Cost Efficiency', 'Sustainability (Prototype estimate)']}
            size={360}
          />
        </div>
      </section>

      {/* Empty State when constraints eliminate all candidates */}
      {sortedCandidates.length === 0 ? (
        <section className="rounded-3xl bg-[#0c1410] border border-rose-500/40 p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4 my-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              No formulation satisfies all selected constraints.
            </h3>
            <p className="text-xs sm:text-sm text-[#8da396] leading-relaxed">
              The active hard allergen exclusions ({allergenRestrictions.join(', ')}) combined with cost and protein targets eliminated all formulation routes. Relax constraints to synthesize viable botanical candidates.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
            <button
              onClick={() => onRelaxConstraints ? onRelaxConstraints() : onNavigate('formulate')}
              className="px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Relax Constraints</span>
            </button>
            <button
              onClick={() => onNavigate('formulate')}
              className="px-4 py-2.5 rounded-xl bg-[#121d17] hover:bg-[#182820] text-white border border-[#1b2b22] text-xs font-mono transition-all cursor-pointer"
            >
              Modify Parameters
            </button>
          </div>
        </section>
      ) : (
        /* Candidate Cards Grid */
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Ranked Candidate Formulations</span>
              <span className="font-mono text-xs text-[#10b981] bg-[#121d17] px-2.5 py-0.5 rounded-md border border-[#10b981]/25">
                {sortedCandidates.length} Valid
              </span>
            </h2>
            <span className="text-xs font-mono text-[#8da396]">
              All scores labelled: AI-estimated / Prototype estimate
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sortedCandidates.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate.id)}
                  className={`relative rounded-3xl bg-[#0c1410] border transition-all duration-300 p-5 sm:p-6 shadow-xl cursor-pointer hover:border-[#10b981]/60 ${
                    isSelected
                      ? 'border-[#10b981] ring-1 ring-[#10b981]/40 shadow-[0_0_24px_rgba(16,185,129,0.15)] bg-[#0e1913]'
                      : 'border-[#1b2b22] hover:bg-[#0e1612]'
                  }`}
                >
                  {/* Top Row: Rank, Title, Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1b2b22]">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#080d0b] border border-[#1b2b22] flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] font-mono text-[#8da396]">RANK</span>
                        <span className="text-base font-bold font-mono text-[#10b981]">#{candidate.rank}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-lg text-white group-hover:text-[#10b981] transition-colors">
                            {candidate.name}
                          </span>
                          <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#121d17] text-[#8da396] border border-[#1b2b22]">
                            {candidate.code}
                          </span>
                          <span className={`font-mono text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider ${
                            candidate.rank === 1
                              ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                              : 'bg-[#121d17] text-[#8da396] border border-[#1b2b22]'
                          }`}>
                            {candidate.rankBadge}
                          </span>

                          {/* Constraint Compliant Badge */}
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 flex items-center gap-1 font-semibold shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                            <span>Constraint Compliant</span>
                          </span>

                          {candidate.allergenWarning && (
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/40">
                              {candidate.allergenWarning}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#8da396] mt-1 leading-relaxed">{candidate.tagline}</p>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-[10px] font-mono text-[#8da396] uppercase">AI Bio-Score (Estimated)</div>
                        <div className="text-xl sm:text-2xl font-bold font-mono text-[#10b981]">
                          {candidate.aiScore}
                          <span className="text-xs text-[#8da396] font-normal"> / 100</span>
                        </div>
                      </div>
                      <div className="w-11 h-11 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-[#10b981]" />
                      </div>
                    </div>
                  </div>

                  {/* Middle Row: Specs and Mini Texture Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4 items-center">
                    {/* Texture cross-section thumbnail */}
                    <div className="md:col-span-3 relative h-28 rounded-xl overflow-hidden border border-[#1b2b22] bg-[#080d0b] group">
                      <img
                        src={candidate.crossSectionTextureImage}
                        alt={candidate.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] via-transparent to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center text-[10px] font-mono text-white">
                        <span>TEXTURE SCAN</span>
                        <span className="text-[#8da396]">MICROGRAPH</span>
                      </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
                        <div className="text-[10px] font-mono text-[#8da396]">Unit Formulation Cost</div>
                        <div className="font-mono text-sm font-bold text-white mt-0.5">
                          {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} <span className="text-[11px] text-[#8da396] font-normal">/ kg</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#10b981] mt-0.5">Calculated from ingredients</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
                        <div className="text-[10px] font-mono text-[#8da396]">Texture Similarity</div>
                        <div className="font-mono text-sm font-bold text-[#10b981] mt-0.5">
                          {candidate.textureParity}%
                        </div>
                        <div className="text-[10px] font-mono text-[#8da396] mt-0.5">AI-estimated</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
                        <div className="text-[10px] font-mono text-[#8da396]">Taste Similarity</div>
                        <div className="font-mono text-sm font-bold text-[#10b981] mt-0.5">
                          {candidate.tasteMatch}%
                        </div>
                        <div className="text-[10px] font-mono text-[#8da396] mt-0.5">AI-estimated</div>
                      </div>

                      <div className="p-3 rounded-xl bg-[#080d0b] border border-[#1b2b22]">
                        <div className="text-[10px] font-mono text-[#8da396]">Protein Density</div>
                        <div className="font-mono text-sm font-bold text-white mt-0.5">
                          {candidate.proteinPer100g}g <span className="text-[11px] text-[#8da396] font-normal">/ 100g</span>
                        </div>
                        <div className="text-[10px] font-mono text-[#8da396] mt-0.5">{candidate.caloriesKcal} kcal</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Base isolate summary & Action Button */}
                  <div className="mt-4 pt-3.5 border-t border-[#1b2b22] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#8da396] flex-wrap">
                      <span className="font-mono text-[11px] uppercase text-white font-medium">Scaffold:</span>
                      <span>{candidate.baseIsolate}</span>
                      <span className="font-mono text-[10px] text-[#10b981] bg-[#080d0b] px-2 py-0.5 rounded border border-[#1b2b22]">
                        {candidate.carbonFootprintDelta}
                      </span>
                      <span className="text-[10px] font-mono text-[#8da396]">Prototype estimate — not a lifecycle assessment</span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCandidate(candidate.id);
                          onNavigate('detail');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-mono font-bold text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                      >
                        <span>VIEW SPEC SHEET</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Direct Side-by-Side Comparison Benchmark Matrix */}
      {sortedCandidates.length > 0 && (
        <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-[#10b981]" />
              <h3 className="font-bold text-white text-base">Direct Cross-Candidate Benchmark Matrix</h3>
            </div>
            <span className="text-[10px] font-mono text-[#8da396]">
              Deterministic Macro Calculations &bull; AI Sensory Estimates
            </span>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1b2b22] text-[#8da396]">
                <th className="pb-3 font-semibold">CANDIDATE</th>
                <th className="pb-3 font-semibold">AI BIO-SCORE</th>
                <th className="pb-3 font-semibold">BASE SYSTEM</th>
                <th className="pb-3 font-semibold">COST / KG</th>
                <th className="pb-3 font-semibold">TASTE (ESTIMATED)</th>
                <th className="pb-3 font-semibold">TEXTURE (ESTIMATED)</th>
                <th className="pb-3 font-semibold">PROTEIN</th>
                <th className="pb-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b2b22]/50">
              {sortedCandidates.map((c) => (
                <tr key={c.id} className="hover:bg-[#121d17] transition-colors">
                  <td className="py-3.5 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.rank === 1 ? '#10b981' : '#06b6d4' }} />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3.5 text-[#10b981] font-bold">{c.aiScore}</td>
                  <td className="py-3.5 text-[#8da396] max-w-[140px] truncate">{c.baseIsolate}</td>
                  <td className="py-3.5 text-white">{c.currencySymbol}{c.costPerKg.toFixed(2)}</td>
                  <td className="py-3.5 text-[#10b981]">
                    <div>{c.tasteMatch}%</div>
                    <div className="text-[9px] text-[#8da396] font-normal">AI-estimated</div>
                  </td>
                  <td className="py-3.5 text-[#10b981]">
                    <div>{c.textureParity}%</div>
                    <div className="text-[9px] text-[#8da396] font-normal">AI-estimated</div>
                  </td>
                  <td className="py-3.5 text-white">{c.proteinPer100g}g</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        onSelectCandidate(c.id);
                        onNavigate('detail');
                      }}
                      className="text-[#10b981] hover:underline font-semibold cursor-pointer"
                    >
                      Inspect Spec &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Consistent Research Disclaimer Footer */}
      <div className="p-4 rounded-2xl bg-[#080d0b] border border-[#1b2b22] text-[11px] font-mono text-[#8da396] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#10b981] shrink-0" />
          <span>AI-generated prototype. Results require physical laboratory validation before food production or commercial use.</span>
        </div>
        <span className="text-[#10b981] shrink-0 font-semibold">VEGANFORM AI R&amp;D</span>
      </div>
    </div>
  );
};
