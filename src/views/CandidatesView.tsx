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
  Leaf,
  Dna,
  Filter,
  CheckSquare,
  Square,
  Columns,
  X,
  Award
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

  // Comparison Selection Mode
  const [comparedCandidateIds, setComparedCandidateIds] = useState<string[]>(['candidate-1', 'candidate-2']);
  const [isComparisonDrawerOpen, setIsComparisonDrawerOpen] = useState(false);

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
    const palette = ['#063B2E', '#0A9F6E', '#8DB9C9', '#E99A86'];
    const fillPalette = ['rgba(6, 59, 46, 0.14)', 'rgba(10, 159, 110, 0.12)', 'rgba(141, 185, 201, 0.12)', 'rgba(233, 154, 134, 0.12)'];

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
      color: '#C98278',
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

  const toggleCompareCandidate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setComparedCandidateIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Candidates currently selected for comparison
  const comparedCandidates = rankedCandidates.filter(c => comparedCandidateIds.includes(c.id));

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#10231D] min-w-0">
      {/* Top Banner & Target Archetype Badge */}
      <section className="relative rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-[#35D39A] animate-pulse" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#063B2E]">
                IN-SILICO CONVERGENCE COMPLETE // PARETO FRONTIER
              </span>
              <span className="text-[10px] font-mono text-[#61706A] bg-[#EEF3ED] px-2 py-0.5 rounded border border-[#D9E2DC]">
                {rankedCandidates.length} OPTIMIZED CANDIDATES
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[#10231D] mt-2">
              Candidate Formulations &amp; Benchmark
            </h1>
            <p className="text-xs sm:text-sm text-[#61706A] mt-1 max-w-xl leading-relaxed">
              Target Reference: <strong className="text-[#063B2E] font-semibold">{productName}</strong>. In-silico simulated solutions evaluated against chemical, textural, and economic benchmarks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap shrink-0">
            {comparedCandidateIds.length > 0 && (
              <button
                onClick={() => setIsComparisonDrawerOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-[#063B2E] text-white text-xs font-display font-bold transition-all flex items-center gap-2 cursor-pointer shadow-subtle hover:bg-[#082A23]"
              >
                <Columns className="w-4 h-4 text-[#35D39A]" />
                <span>Side-by-Side ({comparedCandidateIds.length})</span>
              </button>
            )}

            <button
              onClick={() => setShowWeightSliders(!showWeightSliders)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer border ${
                showWeightSliders
                  ? 'bg-[#063B2E] text-white border-[#063B2E] shadow-xs'
                  : 'bg-white hover:bg-[#EEF3ED] text-[#10231D] border-[#D9E2DC]'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#0A9F6E]" />
              <span>{showWeightSliders ? 'Hide Weights' : 'Calibrate Pareto Weights'}</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF3ED] text-[#10231D] border border-[#D9E2DC] text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shadow-subtle"
            >
              <RotateCcw className="w-4 h-4 text-[#063B2E]" />
              <span>Re-run Parameters</span>
            </button>
          </div>
        </div>

        {/* Dynamic Weight Adjustment Drawer */}
        {showWeightSliders && (
          <div className="mt-5 p-5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#D9E2DC]">
              <span className="text-[#063B2E] font-mono font-semibold flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#0A9F6E]" />
                Dynamic Multi-Objective Re-ranking
              </span>
              <span className="text-[11px] font-mono text-[#61706A]">
                Candidates and radar scores update live
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#61706A]">Taste</span>
                  <span className="font-mono text-[#063B2E] font-bold">{weights.tasteWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.tasteWeight}
                  onChange={(e) => handleWeightChange('tasteWeight', Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#61706A]">Texture</span>
                  <span className="font-mono text-[#063B2E] font-bold">{weights.textureWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.textureWeight}
                  onChange={(e) => handleWeightChange('textureWeight', Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#61706A]">Nutrition</span>
                  <span className="font-mono text-[#063B2E] font-bold">{weights.nutritionWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.nutritionWeight}
                  onChange={(e) => handleWeightChange('nutritionWeight', Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#61706A]">Cost</span>
                  <span className="font-mono text-[#063B2E] font-bold">{weights.costWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.costWeight}
                  onChange={(e) => handleWeightChange('costWeight', Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs">
                  <span className="text-[#61706A]">Sustain</span>
                  <span className="font-mono text-[#063B2E] font-bold">{weights.sustainabilityWeight}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={weights.sustainabilityWeight}
                  onChange={(e) => handleWeightChange('sustainabilityWeight', Number(e.target.value))}
                  className="w-full accent-[#063B2E] cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Unknown Product Notice if applicable */}
        {isUnknownProduct && (
          <div className="mt-4 p-3.5 rounded-2xl bg-[#FFF9EB] border border-[#F2D786] text-xs flex items-center justify-between gap-3 shadow-subtle">
            <div className="flex items-center gap-2.5 text-[#92400e]">
              <AlertTriangle className="w-5 h-5 text-[#D99A32] shrink-0" />
              <div>
                <span className="font-semibold text-[#10231D]">Limited knowledge-base coverage: </span>
                This food target is synthesized using generative reasoning. Physical laboratory validation is strictly required before commercial pilot use.
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#D99A32] border border-[#F2D786] text-[10px] font-mono font-medium shrink-0">
              EXPLORATORY SPEC
            </span>
          </div>
        )}

        {/* Filter & Sort Bar */}
        <div className="mt-5 pt-4 border-t border-[#D9E2DC] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#61706A] font-mono font-medium mr-1">Base Filter:</span>
            {['all', 'pea', 'soy', 'oat', 'cashew', 'chickpea'].map((base) => (
              <button
                key={base}
                onClick={() => setFilterBase(base)}
                className={`px-3 py-1 rounded-lg text-xs capitalize transition-all cursor-pointer font-medium ${
                  filterBase === base
                    ? 'bg-[#063B2E] text-white shadow-xs'
                    : 'bg-[#EEF3ED] text-[#61706A] hover:text-[#10231D] hover:bg-white border border-[#D9E2DC]'
                }`}
              >
                {base}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#61706A] font-mono font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#D9E2DC] rounded-xl px-3 py-1.5 text-xs text-[#10231D] focus:outline-none focus:border-[#063B2E] cursor-pointer"
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
      <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-display font-bold text-[#063B2E] text-base">Multi-Objective Organoleptic Frontier</h3>
            <p className="text-xs text-[#61706A]">
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
                  className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all border cursor-pointer font-mono ${
                    active
                      ? 'bg-white text-[#063B2E] border-[#D9E2DC] shadow-xs font-semibold'
                      : 'bg-[#EEF3ED] text-[#61706A] opacity-60 border-transparent'
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
        <div className="w-full flex items-center justify-center p-4 bg-[#F6F7F2] rounded-2xl border border-[#D9E2DC]">
          <RadarChart
            series={radarSeries.filter(s => activeSeriesIds.includes(s.id))}
            axes={['Taste (AI-estimated)', 'Texture (AI-estimated)', 'Nutrition', 'Cost Efficiency', 'Sustainability (Prototype estimate)']}
            size={360}
          />
        </div>
      </section>

      {/* Candidate Cards Grid with Circular SVG Gauges & Comparison Checkboxes */}
      <section className="flex flex-col gap-5 min-w-0">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-display font-bold text-[#063B2E] flex items-center gap-2">
            <span>Ranked Candidate Formulations</span>
            <span className="text-xs font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-0.5 rounded-md border border-[#D9E2DC] font-medium">
              {sortedCandidates.length} OPTIMAL
            </span>
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#61706A]">
              Select checkboxes to compare side-by-side
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {sortedCandidates.map((candidate) => {
            const isSelected = selectedCandidateId === candidate.id;
            const isCompared = comparedCandidateIds.includes(candidate.id);
            const radius = 26;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (candidate.aiScore / 100) * circumference;

            return (
              <div
                key={candidate.id}
                onClick={() => onSelectCandidate(candidate.id)}
                className={`relative rounded-3xl bg-white border transition-all duration-200 p-6 sm:p-7 shadow-card hover:border-[#0A9F6E]/40 cursor-pointer min-w-0 ${
                  isSelected
                    ? 'border-[#063B2E] ring-2 ring-[#0A9F6E]/20'
                    : 'border-[#D9E2DC]'
                }`}
              >
                {/* Top Row: Rank, Checkbox, Title, Circular SVG Score Gauge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E2DC] min-w-0">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    {/* Compare Checkbox */}
                    <button
                      onClick={(e) => toggleCompareCandidate(candidate.id, e)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 mt-0.5 ${
                        isCompared
                          ? 'bg-[#063B2E] text-[#35D39A] border-[#063B2E]'
                          : 'bg-[#EEF3ED] text-[#61706A] border-[#D9E2DC] hover:bg-white'
                      }`}
                      title={isCompared ? 'Remove from side-by-side comparison' : 'Add to side-by-side comparison'}
                    >
                      {isCompared ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                    </button>

                    <div className="w-10 h-10 rounded-xl bg-[#063B2E] text-[#35D39A] flex flex-col items-center justify-center shrink-0">
                      <span className="text-[8px] font-mono text-[#35D39A]/80 leading-none">RANK</span>
                      <span className="text-base font-display font-bold leading-none mt-0.5">#{candidate.rank}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-lg text-[#10231D] break-words">
                          {candidate.name}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#EEF3ED] text-[#61706A] border border-[#D9E2DC] font-mono shrink-0">
                          {candidate.code}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold shrink-0 ${
                          candidate.rank === 1
                            ? 'bg-[#EEF3ED] text-[#063B2E] border border-[#0A9F6E]/40'
                            : 'bg-[#EEF3ED] text-[#61706A] border border-[#D9E2DC]'
                        }`}>
                          {candidate.rankBadge}
                        </span>

                        {/* Constraint Compliant Badge */}
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#EEF3ED] text-[#063B2E] border border-[#0A9F6E]/30 flex items-center gap-1 font-medium shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#0A9F6E]" />
                          <span>Compliant</span>
                        </span>

                        {candidate.allergenWarning && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                            {candidate.allergenWarning}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#61706A] mt-1 leading-relaxed break-words">{candidate.tagline}</p>
                    </div>
                  </div>

                  {/* Circular SVG AI Score Gauge */}
                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                      <svg className="w-16 h-16 -rotate-90 transform" viewBox="0 0 64 64">
                        {/* Track Ring */}
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          stroke="#D9E2DC"
                          strokeWidth="5"
                          fill="transparent"
                        />
                        {/* Animated Score Progress */}
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          stroke="#063B2E"
                          strokeWidth="5"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-700"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-base font-display font-bold text-[#10231D] leading-none">
                          {candidate.aiScore}
                        </span>
                        <span className="text-[8px] font-mono text-[#61706A] leading-none mt-0.5">
                          / 100
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="text-[9px] font-mono text-[#61706A] uppercase tracking-wider">COMPOSITE BIO-SCORE</span>
                      <span className="text-xs font-mono font-semibold text-[#063B2E]">AI-ESTIMATED</span>
                    </div>
                  </div>
                </div>

                {/* Middle Row: 5 Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4">
                  {/* 1. Taste */}
                  <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#61706A]">
                        <span className="font-mono text-[11px] font-medium truncate">Taste</span>
                        <Dna className="w-3.5 h-3.5 text-[#063B2E] shrink-0" />
                      </div>
                      <div className="text-lg font-display font-bold text-[#063B2E] mt-1">{candidate.tasteMatch}%</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#61706A] mt-1 truncate">Volatiles (Est.)</div>
                  </div>

                  {/* 2. Texture */}
                  <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#61706A]">
                        <span className="font-mono text-[11px] font-medium truncate">Texture</span>
                        <Layers className="w-3.5 h-3.5 text-[#063B2E] shrink-0" />
                      </div>
                      <div className="text-lg font-display font-bold text-[#063B2E] mt-1">{candidate.textureParity}%</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#61706A] mt-1 truncate">Shear bite (Est.)</div>
                  </div>

                  {/* 3. Nutrition */}
                  <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#61706A]">
                        <span className="font-mono text-[11px] font-medium truncate">Protein</span>
                        <Activity className="w-3.5 h-3.5 text-[#8DB9C9] shrink-0" />
                      </div>
                      <div className="text-lg font-display font-bold text-[#10231D] mt-1">{candidate.proteinPer100g}g</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#61706A] mt-1 truncate">{candidate.caloriesKcal} kcal</div>
                  </div>

                  {/* 4. Cost */}
                  <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#61706A]">
                        <span className="font-mono text-[11px] font-medium truncate">Unit Cost</span>
                        <DollarSign className="w-3.5 h-3.5 text-[#D99A32] shrink-0" />
                      </div>
                      <div className="text-lg font-display font-bold text-[#10231D] mt-1 truncate">
                        {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-[#61706A] mt-1 truncate">Calculated / kg</div>
                  </div>

                  {/* 5. Sustainability */}
                  <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between col-span-2 sm:col-span-1 min-w-0">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#61706A]">
                        <span className="font-mono text-[11px] font-medium truncate">Carbon</span>
                        <Leaf className="w-3.5 h-3.5 text-[#0A9F6E] shrink-0" />
                      </div>
                      <div className="text-lg font-display font-bold text-[#063B2E] mt-1 truncate">{candidate.carbonFootprintDelta}</div>
                    </div>
                    <div className="text-[10px] font-mono text-[#61706A] mt-1 truncate">Prototype est.</div>
                  </div>
                </div>

                {/* Bottom Row: Base isolate summary & Action Button */}
                <div className="mt-4 pt-3.5 border-t border-[#D9E2DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-[#61706A] flex-wrap min-w-0">
                    <span className="text-xs font-mono uppercase text-[#063B2E] font-bold">Base Scaffold:</span>
                    <span className="font-medium text-[#10231D]">{candidate.baseIsolate}</span>
                    <span className="text-[10px] font-mono text-[#61706A]">• Prototype estimate</span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCandidate(candidate.id);
                        onNavigate('detail');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white text-xs font-display font-bold tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                    >
                      <span>Inspect Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#35D39A]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SIDE-BY-SIDE CANDIDATE COMPARISON STUDIO DRAWER / MODAL */}
      {isComparisonDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#082A23]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#D9E2DC] p-6 sm:p-8 max-w-4xl w-full shadow-dropdown max-h-[85vh] overflow-y-auto flex flex-col gap-6 text-left min-w-0">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9E2DC]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#063B2E] text-[#35D39A] flex items-center justify-center shrink-0">
                  <Columns className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-lg text-[#063B2E] truncate">
                    Side-by-Side Candidate Evaluation Studio
                  </h3>
                  <p className="text-xs text-[#61706A] truncate">
                    Evaluating {comparedCandidates.length} selected prototypes against conventional {productName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsComparisonDrawerOpen(false)}
                className="p-1.5 rounded-xl text-[#61706A] hover:text-[#10231D] hover:bg-[#EEF3ED] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D9E2DC] text-[#61706A] font-mono">
                    <th className="pb-3 font-semibold">Attribute / Metric</th>
                    {comparedCandidates.map(c => (
                      <th key={c.id} className="pb-3 font-semibold text-center">
                        <div className="font-display font-bold text-sm text-[#10231D]">{c.name}</div>
                        <div className="text-[10px] text-[#063B2E]">REF #{c.code}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E2DC]">
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Composite AI Score</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center font-display font-bold text-lg text-[#063B2E]">
                        {c.aiScore} / 100
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Base Protein Scaffold</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center text-[#61706A]">
                        {c.baseIsolate}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Unit Cost ($ / kg)</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center font-mono font-bold text-[#10231D]">
                        {c.currencySymbol}{c.costPerKg.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Protein Density</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center font-mono font-bold text-[#10231D]">
                        {c.proteinPer100g}g / 100g
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Texture Parity %</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center font-mono font-semibold text-[#063B2E]">
                        {c.textureParity}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Taste &amp; Volatile Match</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center font-mono font-semibold text-[#063B2E]">
                        {c.tasteMatch}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Carbon Reduction (LCA)</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center font-mono font-bold text-[#0A9F6E]">
                        {c.carbonFootprintDelta}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-medium text-[#10231D]">Action</td>
                    {comparedCandidates.map(c => (
                      <td key={c.id} className="py-3 text-center">
                        <button
                          onClick={() => {
                            onSelectCandidate(c.id);
                            onNavigate('detail');
                            setIsComparisonDrawerOpen(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#063B2E] hover:bg-[#082A23] text-white text-[11px] font-display font-bold cursor-pointer transition-colors"
                        >
                          View Dossier
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Direct Side-by-Side Comparison Benchmark Matrix */}
      {sortedCandidates.length > 0 && (
        <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-[#063B2E]" />
              <h3 className="font-display font-bold text-[#063B2E] text-base">Direct Cross-Candidate Benchmark Matrix</h3>
            </div>
            <span className="text-[10px] font-mono text-[#61706A]">
              DETERMINISTIC CALCULATIONS • AI SENSORY ESTIMATES
            </span>
          </div>

          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D9E2DC] text-[#61706A] font-mono">
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
              <tbody className="divide-y divide-[#D9E2DC]">
                {sortedCandidates.map((c) => (
                  <tr key={c.id} className="hover:bg-[#EEF3ED] transition-colors">
                    <td className="py-3.5 font-semibold text-[#10231D] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.rank === 1 ? '#063B2E' : '#8DB9C9' }} />
                      <span>{c.name}</span>
                    </td>
                    <td className="py-3.5 text-[#063B2E] font-mono font-bold">{c.aiScore}</td>
                    <td className="py-3.5 text-[#61706A] max-w-[140px] truncate">{c.baseIsolate}</td>
                    <td className="py-3.5 text-[#10231D] font-mono font-medium">{c.currencySymbol}{c.costPerKg.toFixed(2)}</td>
                    <td className="py-3.5 text-[#063B2E] font-medium">
                      <div className="font-mono">{c.tasteMatch}%</div>
                      <div className="text-[9px] font-mono text-[#61706A]">AI-estimated</div>
                    </td>
                    <td className="py-3.5 text-[#063B2E] font-medium">
                      <div className="font-mono">{c.textureParity}%</div>
                      <div className="text-[9px] font-mono text-[#61706A]">AI-estimated</div>
                    </td>
                    <td className="py-3.5 text-[#10231D] font-mono">{c.proteinPer100g}g</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => {
                          onSelectCandidate(c.id);
                          onNavigate('detail');
                        }}
                        className="text-[#063B2E] hover:text-[#082A23] hover:underline font-mono font-semibold cursor-pointer"
                      >
                        Inspect Spec &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Consistent Research Disclaimer Footer */}
      <div className="p-4 rounded-2xl bg-white border border-[#D9E2DC] text-xs text-[#61706A] flex items-center justify-between gap-4 shadow-subtle min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Info className="w-4 h-4 text-[#063B2E] shrink-0" />
          <span className="break-words">AI-generated prototype. Results require physical laboratory validation before food production or commercial use.</span>
        </div>
        <span className="text-[#063B2E] shrink-0 font-mono font-semibold text-[11px]">VEGANFORM AI R&amp;D</span>
      </div>
    </div>
  );
};
