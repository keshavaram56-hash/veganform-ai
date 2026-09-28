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
  Smile,
  DollarSign,
  Activity,
  Leaf
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
    const palette = ['#059669', '#0284C7', '#7C3AED', '#D97706'];
    const fillPalette = ['rgba(5, 150, 105, 0.15)', 'rgba(2, 132, 199, 0.12)', 'rgba(124, 58, 237, 0.12)', 'rgba(217, 119, 6, 0.12)'];

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
      color: '#94A3B8',
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#17201C]">
      {/* Top Banner & Target Archetype Badge */}
      <section className="relative rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#059669]">
                Candidate Ranking Engine • Top {rankedCandidates.length} Formulations
              </span>
              <span className="text-[11px] text-[#66716B] bg-[#F8FAF9] px-2 py-0.5 rounded border border-[#E5EAE7]">
                Prototype Estimates
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17201C] mt-2">
              Candidate Formulations &amp; Comparison
            </h1>
            <p className="text-xs sm:text-sm text-[#66716B] mt-1 max-w-xl">
              Target Reference: <strong className="text-[#17201C]">{productName}</strong>. In-silico simulated solutions evaluated against chemical, textural, and economic benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={() => setShowWeightSliders(!showWeightSliders)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer border ${
                showWeightSliders
                  ? 'bg-[#059669] text-white border-[#059669] shadow-xs'
                  : 'bg-white hover:bg-[#F8FAF9] text-[#17201C] border-[#E5EAE7]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>{showWeightSliders ? 'Hide Ranking Weights' : 'Adjust Priority Weights'}</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAF9] text-[#17201C] border border-[#E5EAE7] text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-subtle"
            >
              <RotateCcw className="w-4 h-4 text-[#059669]" />
              <span>Re-run Parameters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Weight Adjustment Drawer */}
        {showWeightSliders && (
          <div className="mt-5 p-5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#E5EAE7]">
              <span className="text-[#059669] font-semibold flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Dynamic Multi-Objective Re-ranking
              </span>
              <span className="text-[11px] text-[#66716B]">
                Candidates and radar scores update live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#66716B]">Taste</span>
                  <span className="text-[#059669] font-bold">{weights.tasteWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.tasteWeight}
                  onChange={(e) => handleWeightChange('tasteWeight', Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#66716B]">Texture</span>
                  <span className="text-[#059669] font-bold">{weights.textureWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.textureWeight}
                  onChange={(e) => handleWeightChange('textureWeight', Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#66716B]">Nutrition</span>
                  <span className="text-[#059669] font-bold">{weights.nutritionWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.nutritionWeight}
                  onChange={(e) => handleWeightChange('nutritionWeight', Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#66716B]">Cost</span>
                  <span className="text-[#059669] font-bold">{weights.costWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.costWeight}
                  onChange={(e) => handleWeightChange('costWeight', Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#66716B]">Sustain</span>
                  <span className="text-[#059669] font-bold">{weights.sustainabilityWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.sustainabilityWeight}
                  onChange={(e) => handleWeightChange('sustainabilityWeight', Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Unknown Product Notice if applicable */}
        {isUnknownProduct && (
          <div className="mt-4 p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs flex items-center justify-between gap-3 shadow-subtle">
            <div className="flex items-center gap-2.5 text-[#92400E]">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              <div>
                <span className="font-semibold">Limited knowledge-base coverage: </span>
                This food target is synthesized using generative reasoning. Physical laboratory validation is strictly required before commercial pilot use.
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-white text-[#92400E] border border-[#FDE68A] text-[11px] font-medium shrink-0">
              Exploratory Spec
            </span>
          </div>
        )}

        {/* Filter & Sort Bar */}
        <div className="mt-5 pt-4 border-t border-[#E5EAE7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#66716B] font-medium mr-1">Base Filter:</span>
            {['all', 'pea', 'soy', 'oat', 'cashew', 'chickpea'].map((base) => (
              <button
                key={base}
                onClick={() => setFilterBase(base)}
                className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer ${
                  filterBase === base
                    ? 'bg-[#059669] text-white font-medium shadow-xs'
                    : 'bg-[#F8FAF9] text-[#66716B] hover:text-[#17201C] hover:bg-white border border-[#E5EAE7]'
                }`}
              >
                {base}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#66716B] font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E5EAE7] rounded-xl px-3 py-1.5 text-xs text-[#17201C] focus:outline-none focus:border-[#059669] cursor-pointer"
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
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-bold text-[#17201C] text-base">Multi-Objective Organoleptic Frontier</h3>
            <p className="text-xs text-[#66716B]">
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
                  className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all border cursor-pointer ${
                    active
                      ? 'bg-white text-[#17201C] border-[#E5EAE7] shadow-xs'
                      : 'bg-[#F8FAF9] text-[#66716B] opacity-60 border-transparent'
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
        <div className="w-full flex items-center justify-center p-4 bg-[#F8FAF9] rounded-2xl border border-[#E5EAE7]">
          <RadarChart
            series={radarSeries.filter(s => activeSeriesIds.includes(s.id))}
            axes={['Taste (AI-estimated)', 'Texture (AI-estimated)', 'Nutrition', 'Cost Efficiency', 'Sustainability (Prototype estimate)']}
            size={360}
          />
        </div>
      </section>

      {/* Empty State when constraints eliminate all candidates */}
      {sortedCandidates.length === 0 ? (
        <section className="rounded-3xl bg-white border border-rose-200 p-8 sm:p-10 text-center flex flex-col items-center justify-center gap-4 my-4 shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-[#17201C] mb-2">
              No formulation satisfies all selected constraints.
            </h3>
            <p className="text-xs sm:text-sm text-[#66716B] leading-relaxed">
              The active hard allergen exclusions ({allergenRestrictions.join(', ')}) combined with cost and protein targets eliminated all formulation routes. Relax constraints to synthesize viable botanical candidates.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
            <button
              onClick={() => onRelaxConstraints ? onRelaxConstraints() : onNavigate('formulate')}
              className="px-5 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-medium text-xs transition-all flex items-center gap-2 cursor-pointer shadow-subtle"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Relax Constraints</span>
            </button>
            <button
              onClick={() => onNavigate('formulate')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#F8FAF9] text-[#17201C] border border-[#E5EAE7] text-xs font-medium transition-all cursor-pointer"
            >
              Modify Parameters
            </button>
          </div>
        </section>
      ) : (
        /* Candidate Cards Grid */
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#17201C] flex items-center gap-2">
              <span>Ranked Candidate Formulations</span>
              <span className="text-xs text-[#059669] bg-[#ECFDF5] px-2.5 py-0.5 rounded-md border border-[#BBF7D0] font-medium">
                {sortedCandidates.length} Valid
              </span>
            </h2>
            <span className="text-xs text-[#66716B]">
              All scores labelled: AI-estimated / Prototype estimate
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {sortedCandidates.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              return (
                <div
                  key={candidate.id}
                  onClick={() => onSelectCandidate(candidate.id)}
                  className={`relative rounded-3xl bg-white border transition-all duration-200 p-6 sm:p-7 shadow-card hover:shadow-card-hover cursor-pointer ${
                    isSelected
                      ? 'border-[#059669] ring-2 ring-[#059669]/20'
                      : 'border-[#E5EAE7]'
                  }`}
                >
                  {/* Top Row: Rank, Title, Score */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5EAE7]">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col items-center justify-center shrink-0">
                        <span className="text-[9px] text-[#66716B] font-medium">RANK</span>
                        <span className="text-base font-bold text-[#059669]">#{candidate.rank}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-lg text-[#17201C]">
                            {candidate.name}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded bg-[#F8FAF9] text-[#66716B] border border-[#E5EAE7] font-mono">
                            {candidate.code}
                          </span>
                          <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                            candidate.rank === 1
                              ? 'bg-[#ECFDF5] text-[#059669] border border-[#BBF7D0]'
                              : 'bg-[#F8FAF9] text-[#66716B] border border-[#E5EAE7]'
                          }`}>
                            {candidate.rankBadge}
                          </span>

                          {/* Constraint Compliant Badge */}
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] flex items-center gap-1 font-medium">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                            <span>Constraint Compliant</span>
                          </span>

                          {candidate.allergenWarning && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                              {candidate.allergenWarning}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#66716B] mt-1 leading-relaxed">{candidate.tagline}</p>
                      </div>
                    </div>

                    {/* AI Score Badge */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="text-[10px] text-[#66716B] uppercase font-semibold">AI Bio-Score (Estimated)</div>
                        <div className="text-2xl font-bold text-[#059669]">
                          {candidate.aiScore}
                          <span className="text-xs text-[#66716B] font-normal"> / 100</span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                        <Sparkles className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Middle Row: 5 Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                    {/* 1. Taste */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#66716B]">
                          <span className="font-medium">Taste</span>
                          <Smile className="w-3.5 h-3.5 text-[#059669]" />
                        </div>
                        <div className="text-lg font-bold text-[#059669] mt-1">{candidate.tasteMatch}%</div>
                      </div>
                      <div className="text-[10px] text-[#66716B] mt-1">Savory umami parity (AI-estimated)</div>
                    </div>

                    {/* 2. Texture */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#66716B]">
                          <span className="font-medium">Texture</span>
                          <Layers className="w-3.5 h-3.5 text-[#059669]" />
                        </div>
                        <div className="text-lg font-bold text-[#059669] mt-1">{candidate.textureParity}%</div>
                      </div>
                      <div className="text-[10px] text-[#66716B] mt-1">Shear-cell chew (AI-estimated)</div>
                    </div>

                    {/* 3. Nutrition */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#66716B]">
                          <span className="font-medium">Nutrition</span>
                          <Activity className="w-3.5 h-3.5 text-[#0284C7]" />
                        </div>
                        <div className="text-lg font-bold text-[#17201C] mt-1">{candidate.proteinPer100g}g</div>
                      </div>
                      <div className="text-[10px] text-[#66716B] mt-1">{candidate.caloriesKcal} kcal / 100g</div>
                    </div>

                    {/* 4. Cost */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#66716B]">
                          <span className="font-medium">Cost</span>
                          <DollarSign className="w-3.5 h-3.5 text-[#D97706]" />
                        </div>
                        <div className="text-lg font-bold text-[#17201C] mt-1">
                          {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-[10px] text-[#66716B] mt-1">Calculated / kg</div>
                    </div>

                    {/* 5. Sustainability */}
                    <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between col-span-2 sm:col-span-1">
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#66716B]">
                          <span className="font-medium">Sustainability</span>
                          <Leaf className="w-3.5 h-3.5 text-[#059669]" />
                        </div>
                        <div className="text-lg font-bold text-[#059669] mt-1">{candidate.carbonFootprintDelta}</div>
                      </div>
                      <div className="text-[10px] text-[#66716B] mt-1">Prototype estimate</div>
                    </div>
                  </div>

                  {/* Bottom Row: Base isolate summary & Action Button */}
                  <div className="mt-4 pt-3.5 border-t border-[#E5EAE7] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#66716B] flex-wrap">
                      <span className="text-xs uppercase text-[#17201C] font-semibold">Base Scaffold:</span>
                      <span className="font-medium">{candidate.baseIsolate}</span>
                      <span className="text-[11px] text-[#66716B]">• Prototype estimate — not a lifecycle assessment</span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCandidate(candidate.id);
                          onNavigate('detail');
                        }}
                        className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                      >
                        <span>View Formulation</span>
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
        <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-[#059669]" />
              <h3 className="font-bold text-[#17201C] text-base">Direct Cross-Candidate Benchmark Matrix</h3>
            </div>
            <span className="text-[11px] text-[#66716B]">
              Deterministic Calculations &bull; AI Sensory Estimates
            </span>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5EAE7] text-[#66716B]">
                <th className="pb-3 font-semibold">Candidate</th>
                <th className="pb-3 font-semibold">AI Bio-Score</th>
                <th className="pb-3 font-semibold">Base System</th>
                <th className="pb-3 font-semibold">Cost / kg</th>
                <th className="pb-3 font-semibold">Taste (Estimated)</th>
                <th className="pb-3 font-semibold">Texture (Estimated)</th>
                <th className="pb-3 font-semibold">Protein</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAE7]">
              {sortedCandidates.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8FAF9] transition-colors">
                  <td className="py-3.5 font-semibold text-[#17201C] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.rank === 1 ? '#059669' : '#0284C7' }} />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3.5 text-[#059669] font-bold">{c.aiScore}</td>
                  <td className="py-3.5 text-[#66716B] max-w-[140px] truncate">{c.baseIsolate}</td>
                  <td className="py-3.5 text-[#17201C] font-medium">{c.currencySymbol}{c.costPerKg.toFixed(2)}</td>
                  <td className="py-3.5 text-[#059669] font-medium">
                    <div>{c.tasteMatch}%</div>
                    <div className="text-[10px] text-[#66716B] font-normal">AI-estimated</div>
                  </td>
                  <td className="py-3.5 text-[#059669] font-medium">
                    <div>{c.textureParity}%</div>
                    <div className="text-[10px] text-[#66716B] font-normal">AI-estimated</div>
                  </td>
                  <td className="py-3.5 text-[#17201C]">{c.proteinPer100g}g</td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => {
                        onSelectCandidate(c.id);
                        onNavigate('detail');
                      }}
                      className="text-[#059669] hover:underline font-semibold cursor-pointer"
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
      <div className="p-4 rounded-2xl bg-white border border-[#E5EAE7] text-xs text-[#66716B] flex items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#059669] shrink-0" />
          <span>AI-generated prototype. Results require physical laboratory validation before food production or commercial use.</span>
        </div>
        <span className="text-[#059669] shrink-0 font-semibold">VeganForm AI R&amp;D</span>
      </div>
    </div>
  );
};
