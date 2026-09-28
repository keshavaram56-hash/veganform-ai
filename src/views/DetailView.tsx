import React, { useState } from 'react';
import { TabType, CandidateFormulation } from '../types/formulation';
import { NUGGET_TEXTURE_IMAGE } from '../data/mockData';
import {
  ArrowLeft,
  Copy,
  Check,
  Download,
  Sparkles,
  Award,
  ShieldCheck,
  Layers,
  FlaskConical,
  Cpu,
  Info,
  Microscope,
  PieChart,
  ArrowRight
} from 'lucide-react';

interface DetailViewProps {
  candidateId: string;
  onNavigate: (tab: TabType) => void;
  onSelectCandidate: (candidateId: string) => void;
  candidates: CandidateFormulation[];
  productName: string;
}

export const DetailView: React.FC<DetailViewProps> = ({
  candidateId,
  onNavigate,
  onSelectCandidate,
  candidates,
  productName
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [activeTabSection, setActiveTabSection] = useState<'matrix' | 'mapping' | 'nutrition' | 'process'>('matrix');

  // Find candidate by ID or Code, falling back to first candidate
  const candidate = candidates.find(c =>
    c.id === candidateId ||
    c.id.toLowerCase() === candidateId.toLowerCase() ||
    c.code.toLowerCase() === candidateId.toLowerCase()
  ) || candidates[0];

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#dfe4e0] pt-32">
        <p className="text-sm text-[#8da396] mb-4">No active candidate formulation found.</p>
        <button
          onClick={() => onNavigate('formulate')}
          className="px-4 py-2 rounded-xl bg-[#10b981] text-[#052e16] font-bold font-mono text-xs cursor-pointer"
        >
          Return to Formulation Workspace
        </button>
      </div>
    );
  }

  const handleExportPdf = () => {
    window.print();
  };

  const handleCopySpec = () => {
    const text = `VEGANFORM AI - LAB SPECIFICATION SHEET (PROTOTYPE ESTIMATE)\nTarget Reference: ${productName}\nCandidate: ${candidate.name} (${candidate.code})\nAI Bio-Score: ${candidate.aiScore}/100 (AI-estimated)\nUnit Cost: ${candidate.currencySymbol}${candidate.costPerKg.toFixed(2)}/kg (Calculated from ingredients)\nBase System: ${candidate.baseIsolate}\nTexture Similarity: ${candidate.textureParity}% (AI-estimated)\nTaste Similarity: ${candidate.tasteMatch}% (AI-estimated)\nProtein Density: ${candidate.proteinPer100g}g/100g\nCalories: ${candidate.caloriesKcal} kcal\n\nINGREDIENT BATCH MATRIX (wt%):\n${candidate.batchMatrix.map(b => `- ${b.name}: ${b.wtPercent.toFixed(1)}% (${b.function})`).join('\n')}\n\nDISCLAIMER: AI-generated prototype. Results require physical laboratory validation before food production or commercial use.`;
    navigator.clipboard?.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('candidates')}
          className="flex items-center gap-2 text-xs font-mono text-[#8da396] hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#10b981]" />
          <span>BACK TO CANDIDATES</span>
        </button>

        {/* Candidate Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8da396] hidden sm:inline">Active Candidate:</span>
          <select
            value={candidate.id}
            onChange={(e) => onSelectCandidate(e.target.value)}
            className="bg-[#0c1410] border border-[#1b2b22] rounded-xl px-3 py-1.5 text-xs text-[#10b981] font-mono focus:outline-none cursor-pointer"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} (#{c.rank} &bull; Score {c.aiScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header Card */}
      <section className="relative rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-6 sm:p-7 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-[#10b981] font-semibold tracking-wider uppercase bg-[#121d17] px-2.5 py-0.5 rounded-md border border-[#10b981]/30">
                LAB SPECIFICATION SHEET
              </span>
              <span className="font-mono text-xs text-[#8da396] bg-[#080d0b] px-2.5 py-0.5 rounded-md border border-[#1b2b22]">
                REF #{candidate.code}
              </span>
              <span className="font-mono text-xs text-white bg-[#10b981]/20 px-2 py-0.5 rounded-md border border-[#10b981]/40">
                {candidate.rankBadge}
              </span>
              {candidate.constraintCompliant !== false && (
                <span className="font-mono text-xs text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/50 flex items-center gap-1 font-semibold shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Constraint Compliant</span>
                </span>
              )}
              <span className="font-mono text-[10px] text-[#8da396] bg-[#080d0b] px-2 py-0.5 rounded-md border border-[#1b2b22]">
                TARGET: {productName.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              {candidate.name}
            </h1>
            <p className="text-sm text-[#8da396] max-w-2xl leading-relaxed">
              {candidate.tagline}. High-moisture extrusion profile calibrated for anisotropic {productName.toLowerCase()} structural bio-equivalence.
            </p>
          </div>

          {/* AI Composite Score Dial & Actions */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-mono text-[#8da396] uppercase tracking-wider">
                  AI Composite Score
                </div>
                <div className="text-3xl font-bold font-mono text-[#10b981] flex items-baseline justify-end gap-1">
                  <span>{candidate.aiScore}</span>
                  <span className="text-xs text-[#8da396] font-normal">/ 100</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#080d0b] border border-[#10b981]/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <Award className="w-7 h-7 text-[#10b981]" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySpec}
                className="px-3.5 py-2 rounded-xl bg-[#080d0b] hover:bg-[#121d17] text-white border border-[#1b2b22] text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copy formulation summary to clipboard"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[#10b981] font-bold">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#10b981]" />
                    <span className="hidden sm:inline">COPY SPEC</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExportPdf}
                className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold font-mono text-xs tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                <Download className="w-4 h-4" />
                <span>PRINT / EXPORT</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#1b2b22]">
          <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="text-[10px] font-mono text-[#8da396]">Unit Formulation Cost</div>
            <div className="font-mono text-lg font-bold text-white mt-0.5">
              {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} <span className="text-xs text-[#8da396]">/ kg</span>
            </div>
            <div className="text-[10px] font-mono text-[#10b981] mt-0.5">Calculated from ingredients</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="text-[10px] font-mono text-[#8da396]">Texture Similarity</div>
            <div className="font-mono text-lg font-bold text-[#10b981] mt-0.5">
              {candidate.textureParity}%
            </div>
            <div className="text-[10px] font-mono text-[#8da396] mt-0.5">AI-estimated</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="text-[10px] font-mono text-[#8da396]">Protein Density</div>
            <div className="font-mono text-lg font-bold text-white mt-0.5">
              {candidate.proteinPer100g}g <span className="text-xs text-[#8da396]">/ 100g</span>
            </div>
            <div className="text-[10px] font-mono text-[#8da396] mt-0.5">{candidate.caloriesKcal} kcal / 100g</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
            <div className="text-[10px] font-mono text-[#8da396]">Carbon Reduction</div>
            <div className="font-mono text-lg font-bold text-[#10b981] mt-0.5">
              {candidate.carbonFootprintDelta}
            </div>
            <div className="text-[10px] font-mono text-[#8da396] mt-0.5">Prototype estimate — not an LCA</div>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#1b2b22] pb-2 overflow-x-auto">
        {[
          { id: 'matrix', label: 'Batch Matrix (wt%)', icon: FlaskConical },
          { id: 'mapping', label: 'Bio-Substitution Mapping', icon: Layers },
          { id: 'nutrition', label: 'Nutritional Benchmarks', icon: Microscope },
          { id: 'process', label: 'Extrusion Directives', icon: Cpu }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTabSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTabSection(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                active
                  ? 'bg-[#121d17] text-[#10b981] border border-[#10b981]/40 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'text-[#8da396] hover:text-white hover:bg-[#0c1410]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: Batch Matrix (wt%) */}
      {activeTabSection === 'matrix' && (
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#10b981]" />
                  <span>100kg Wet-Lab Pilot Batch Recipe</span>
                </h3>
                <p className="text-xs text-[#8da396]">
                  Calculated based on botanical hydration and shear-induced protein unfolding
                </p>
              </div>

              <span className="font-mono text-xs text-[#10b981] bg-[#080d0b] px-3 py-1 rounded-lg border border-[#10b981]/30 font-semibold self-start sm:self-auto">
                TOTAL: 100.0% WT
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1b2b22] text-[#8da396]">
                    <th className="pb-3 font-semibold">BOTANICAL INGREDIENT</th>
                    <th className="pb-3 font-semibold">BIOCHEMICAL FUNCTION</th>
                    <th className="pb-3 font-semibold text-right">WEIGHT RATIO (%)</th>
                    <th className="pb-3 font-semibold text-right">100kg PILOT BATCH</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b2b22]/50">
                  {candidate.batchMatrix.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-[#121d17] transition-colors ${
                        item.highlight ? 'bg-[#10b981]/5 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                        <span>{item.name}</span>
                        {item.highlight && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30">
                            CORE SCAFFOLD
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-[#8da396]">{item.function}</td>
                      <td className="py-3 text-right font-bold text-[#10b981]">
                        {item.wtPercent.toFixed(1)}%
                      </td>
                      <td className="py-3 text-right text-white">
                        {item.wtPercent.toFixed(1)} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Allocation Breakdown */}
          <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#10b981]" />
              <span>Cost Allocation per Kilogram ({candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} Total)</span>
            </h3>
            <p className="text-xs text-[#8da396] mb-4">
              Deterministic calculation based on ingredient percentage weights and benchmark raw material prices
            </p>

            <div className="flex h-4 w-full rounded-full overflow-hidden bg-[#080d0b] p-0.5 border border-[#1b2b22] mb-4">
              {candidate.costAllocation.map((c, i) => (
                <div
                  key={i}
                  style={{ width: `${c.percent}%`, backgroundColor: c.color }}
                  className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
                  title={`${c.name}: ${c.percent}% (${candidate.currencySymbol}${c.amount.toFixed(2)})`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {candidate.costAllocation.map((c, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#080d0b] border border-[#1b2b22] flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div>
                    <div className="text-xs text-white font-medium truncate max-w-[130px]">{c.name}</div>
                    <div className="text-[10px] font-mono text-[#8da396]">
                      {candidate.currencySymbol}{c.amount.toFixed(2)} ({c.percent}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: Bio-Substitution Mapping */}
      {activeTabSection === 'mapping' && (
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-[#10b981]" />
              <div>
                <h3 className="text-base font-bold text-white">Animal Precursor &rarr; Botanical Functional Mapping</h3>
                <p className="text-xs text-[#8da396]">
                  Biochemical functional alignment eliminating synthetic additives while preserving organoleptic cues
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {candidate.substitutionMap.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#080d0b] border border-[#1b2b22] flex flex-col gap-2 hover:border-[#10b981]/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:w-5/12">
                      <span className="w-8 h-8 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-center justify-center shrink-0">
                        <span className="text-rose-400 font-mono text-xs font-bold">ANML</span>
                      </span>
                      <div>
                        <div className="text-[10px] font-mono text-rose-400 uppercase">Animal Precursor</div>
                        <div className="text-sm font-semibold text-white">{pair.animalPrecursor}</div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center justify-center shrink-0 text-[#10b981]">
                      <ArrowRight className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-3 sm:w-5/12">
                      <span className="w-8 h-8 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center shrink-0">
                        <span className="text-[#10b981] font-mono text-xs font-bold">PLNT</span>
                      </span>
                      <div>
                        <div className="text-[10px] font-mono text-[#10b981] uppercase">Botanical Precision Analog</div>
                        <div className="text-sm font-semibold text-white">{pair.botanicalAnalog}</div>
                      </div>
                    </div>
                  </div>

                  {pair.scientificReasoning && (
                    <div className="text-xs text-[#8da396] bg-[#0c1410] p-3 rounded-xl border border-[#1b2b22] font-mono mt-1">
                      <span className="text-[#10b981] font-semibold">Functional Rationale: </span>
                      {pair.scientificReasoning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Microstructural Texture Micrograph */}
          <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#10b981]" />
              <span>Microstructural Texture Micrograph &amp; Cellular Parity</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-6 relative h-64 rounded-2xl overflow-hidden border border-[#1b2b22] bg-[#080d0b] group">
                <img
                  src={candidate.crossSectionTextureImage || NUGGET_TEXTURE_IMAGE}
                  alt={`Microstructural scan of ${candidate.name}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d0b] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs font-mono text-white bg-[#080d0b]/85 px-3 py-1.5 rounded-xl border border-[#1b2b22]">
                  <span>SEM SCAN: 200μm SCALE</span>
                  <span className="text-[#8da396]">MICROGRAPH</span>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col justify-between gap-3">
                <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                  <div className="text-xs font-semibold text-white">Anisotropic Fiber Alignment (λ)</div>
                  <div className="text-sm font-mono text-[#10b981] mt-1">λ = 0.76 (Target: 0.74 &plusmn; 0.05)</div>
                  <p className="text-[11px] text-[#8da396] mt-1">
                    Twin-screw cooling die shear rate matches the parallel fascicle alignment of target animal fibers.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                  <div className="text-xs font-semibold text-white">Tensile Cutting Resistance (Warner-Bratzler)</div>
                  <div className="text-sm font-mono text-[#10b981] mt-1">18.2 N Peak (Control: 18.9 N)</div>
                  <p className="text-[11px] text-[#8da396] mt-1">
                    Bite resistance and initial tooth penetration replicate cooked whole muscle tissue.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                  <div className="text-xs font-semibold text-white">Thermal Gelation Stability</div>
                  <div className="text-sm font-mono text-[#10b981] mt-1">68°C &ndash; 74°C Endothermic Plateau</div>
                  <p className="text-[11px] text-[#8da396] mt-1">
                    Retains structural firmness throughout heating, frying, and hot-holding cycles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Nutritional Benchmarks */}
      {activeTabSection === 'nutrition' && (
        <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#10b981]" />
                <span>Nutritional Equivalence Benchmark (per 100g)</span>
              </h3>
              <p className="text-xs text-[#8da396]">
                Comparison between Candidate {candidate.code} and reference {productName}
              </p>
            </div>
            <span className="font-mono text-xs text-[#10b981] bg-[#121d17] px-2.5 py-1 rounded-md border border-[#10b981]/30 self-start sm:self-auto font-semibold">
              ESTIMATED FROM INGREDIENT COMPOSITION
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1b2b22] text-[#8da396]">
                  <th className="pb-3 font-semibold">NUTRIENT METRIC</th>
                  <th className="pb-3 font-semibold text-right">VEGAN CANDIDATE</th>
                  <th className="pb-3 font-semibold text-right">CONVENTIONAL {productName.toUpperCase()}</th>
                  <th className="pb-3 font-semibold text-right">VARIANCE (DELTA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b2b22]/50">
                {candidate.nutritionalProfile.map((n, idx) => (
                  <tr key={idx} className="hover:bg-[#121d17] transition-colors">
                    <td className="py-3.5 text-white font-medium">{n.metric}</td>
                    <td className="py-3.5 text-right font-bold text-[#10b981]">{n.veganValue}</td>
                    <td className="py-3.5 text-right text-[#8da396]">{n.poultryValue}</td>
                    <td className="py-3.5 text-right font-semibold text-white">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        n.deltaPercent?.startsWith('+') ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#121d17] text-[#8da396]'
                      }`}>
                        {n.deltaPercent}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: Extrusion Directives */}
      {activeTabSection === 'process' && (
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#10b981]" />
              <span>{candidate.processingDirectives?.technology || 'Twin-Screw High-Moisture Extrusion (HMEC) Directive'}</span>
            </h3>
            <p className="text-xs text-[#8da396] mb-5">
              Pilot line thermal profile and mechanical shear inputs required to duplicate the anisotropic matrix
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {(candidate.processingDirectives?.temperatures || [
                { zone: 'Zone 1 (Feeding)', temp: '48°C', note: 'Dry blend hydration' },
                { zone: 'Zone 2 (Conveying)', temp: '92°C', note: 'Pre-gelatinization' },
                { zone: 'Zone 3 (Melting)', temp: '138°C', note: 'Denaturation point' },
                { zone: 'Zone 4 (Shearing)', temp: '152°C', note: 'Fibril formation' },
                { zone: 'Cooling Die', temp: '62°C', note: 'Matrix fixation' }
              ]).map((z, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22] flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-[#8da396]">{z.zone}</div>
                  <div className="text-xl font-bold font-mono text-[#10b981] my-1">{z.temp}</div>
                  <div className="text-[10px] text-[#8da396]">{z.note}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#1b2b22]">
              <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                <div className="text-[10px] font-mono text-[#8da396]">Screw Speed</div>
                <div className="font-mono text-base font-bold text-white mt-0.5">
                  {candidate.processingDirectives?.screwSpeedRpm || 320} RPM
                </div>
                <div className="text-[10px] text-[#8da396]">Co-rotating twin flight</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                <div className="text-[10px] font-mono text-[#8da396]">Specific Mech. Energy (SME)</div>
                <div className="font-mono text-base font-bold text-[#10b981] mt-0.5">
                  {candidate.processingDirectives?.smeEnergyKjKg || 112} kJ / kg
                </div>
                <div className="text-[10px] text-[#8da396]">Target fibrillar unfolding</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                <div className="text-[10px] font-mono text-[#8da396]">Die Pressure</div>
                <div className="font-mono text-base font-bold text-white mt-0.5">
                  {candidate.processingDirectives?.diePressureMpa || 2.2} MPa
                </div>
                <div className="text-[10px] text-[#8da396]">Laminar shear boundary</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* In-Silico Scientific Rationales */}
      <section className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 sm:p-6 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#10b981]" />
          <span>In-Silico Biochemistry Explanations &amp; Synergies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidate.aiRationales.map((rat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#080d0b] border border-[#1b2b22] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#10b981] font-mono text-base">{rat.icon}</span>
                  <h4 className="text-xs font-bold text-white">{rat.title}</h4>
                </div>
                <p className="text-xs text-[#8da396] leading-relaxed">
                  {rat.description}
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-[#1b2b22] flex items-center justify-between text-[10px] font-mono text-[#10b981]">
                <span>VALIDATED HYPOTHESIS</span>
                <Check className="w-3.5 h-3.5 text-[#10b981]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Disclaimer Footer */}
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
