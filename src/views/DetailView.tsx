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
  ArrowRight,
  Dna
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
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#10231D] pt-32 min-w-0">
        <p className="text-sm text-[#61706A] mb-4">No active candidate formulation found.</p>
        <button
          onClick={() => onNavigate('formulate')}
          className="px-4 py-2 rounded-xl bg-[#063B2E] text-white font-medium text-xs cursor-pointer shadow-subtle hover:bg-[#082A23]"
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#10231D] min-w-0">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => onNavigate('candidates')}
          className="flex items-center gap-2 text-xs text-[#61706A] hover:text-[#10231D] transition-colors cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-[#063B2E]" />
          <span>Back to Candidate Comparison</span>
        </button>

        {/* Candidate Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#61706A] font-mono hidden sm:inline">Active Candidate:</span>
          <select
            value={candidate.id}
            onChange={(e) => onSelectCandidate(e.target.value)}
            className="bg-white border border-[#D9E2DC] rounded-xl px-3 py-1.5 text-xs text-[#10231D] font-medium focus:outline-none focus:border-[#063B2E] cursor-pointer shadow-subtle"
          >
            {candidates.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} (#{c.rank} • Score {c.aiScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Header Card (Formulation Dossier) */}
      <section className="relative rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card overflow-hidden min-w-0">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono text-[#063B2E] font-bold tracking-wider uppercase bg-[#EEF3ED] px-2.5 py-0.5 rounded-md border border-[#D9E2DC]">
                FORMULATION DOSSIER
              </span>
              <span className="text-[10px] font-mono text-[#61706A] bg-[#EEF3ED] px-2.5 py-0.5 rounded-md border border-[#D9E2DC]">
                REF #{candidate.code}
              </span>
              <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2 py-0.5 rounded-md border border-[#D9E2DC] font-semibold">
                {candidate.rankBadge}
              </span>
              {candidate.constraintCompliant !== false && (
                <span className="text-[10px] font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-0.5 rounded-full border border-[#0A9F6E]/30 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3 h-3 text-[#0A9F6E]" />
                  <span>Constraint Compliant</span>
                </span>
              )}
              <span className="text-[10px] font-mono text-[#61706A] bg-[#EEF3ED] px-2 py-0.5 rounded-md border border-[#D9E2DC]">
                Target: {productName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#10231D] mt-1 break-words">
              {candidate.name}
            </h1>
            <p className="text-sm text-[#61706A] max-w-2xl leading-relaxed break-words">
              {candidate.tagline}. High-moisture extrusion profile calibrated for anisotropic {productName.toLowerCase()} structural bio-equivalence.
            </p>
          </div>

          {/* AI Composite Score Dial & Actions */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[9px] font-mono text-[#61706A] uppercase font-semibold tracking-wider">
                  AI COMPOSITE BIO-SCORE
                </div>
                <div className="text-3xl font-display font-bold text-[#063B2E] flex items-baseline justify-end gap-1">
                  <span>{candidate.aiScore}</span>
                  <span className="text-xs font-mono text-[#61706A] font-normal">/ 100</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#063B2E] flex items-center justify-center text-[#35D39A] shadow-xs shrink-0">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySpec}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#EEF3ED] text-[#10231D] border border-[#D9E2DC] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                title="Copy formulation summary to clipboard"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-[#063B2E]" />
                    <span className="text-[#063B2E] font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#61706A]" />
                    <span className="hidden sm:inline">Copy Spec</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExportPdf}
                className="px-4 py-2 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-medium text-xs tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-card"
              >
                <Download className="w-4 h-4 text-[#35D39A]" />
                <span>Print / Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#D9E2DC]">
          <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
            <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Unit Formulation Cost</div>
            <div className="text-lg font-display font-bold text-[#10231D] mt-0.5 truncate">
              {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} <span className="text-xs font-mono text-[#61706A] font-normal">/ kg</span>
            </div>
            <div className="text-[10px] font-mono text-[#063B2E] mt-0.5 font-medium truncate">Calculated from ingredients</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
            <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Texture Similarity</div>
            <div className="text-lg font-display font-bold text-[#063B2E] mt-0.5 truncate">
              {candidate.textureParity}%
            </div>
            <div className="text-[10px] font-mono text-[#61706A] mt-0.5 truncate">AI-estimated</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
            <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Protein Density</div>
            <div className="text-lg font-display font-bold text-[#10231D] mt-0.5 truncate">
              {candidate.proteinPer100g}g <span className="text-xs font-mono text-[#61706A] font-normal">/ 100g</span>
            </div>
            <div className="text-[10px] font-mono text-[#61706A] mt-0.5 truncate">{candidate.caloriesKcal} kcal / 100g</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
            <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Carbon Reduction</div>
            <div className="text-lg font-display font-bold text-[#063B2E] mt-0.5 truncate">
              {candidate.carbonFootprintDelta}
            </div>
            <div className="text-[10px] font-mono text-[#61706A] mt-0.5 truncate">Prototype estimate</div>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D9E2DC] pb-2 overflow-x-auto min-w-0">
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
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                active
                  ? 'bg-[#063B2E] text-white shadow-xs font-semibold'
                  : 'text-[#61706A] hover:text-[#10231D] hover:bg-[#EEF3ED]'
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? 'text-[#35D39A]' : 'text-[#61706A]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: Batch Matrix (wt%) */}
      {activeTabSection === 'matrix' && (
        <div className="flex flex-col gap-6 min-w-0">
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card overflow-hidden min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-display font-bold text-[#063B2E] flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#063B2E]" />
                  <span>100kg Wet-Lab Pilot Batch Recipe</span>
                </h3>
                <p className="text-xs text-[#61706A]">
                  Calculated based on botanical hydration and shear-induced protein unfolding
                </p>
              </div>

              <span className="text-xs font-mono text-[#063B2E] bg-[#EEF3ED] px-3 py-1 rounded-lg border border-[#D9E2DC] font-semibold self-start sm:self-auto">
                TOTAL: 100.0% WT
              </span>
            </div>

            <div className="overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D9E2DC] text-[#61706A] font-mono">
                    <th className="pb-3 font-semibold">Botanical Ingredient</th>
                    <th className="pb-3 font-semibold">Biochemical Function</th>
                    <th className="pb-3 font-semibold text-right">Weight Ratio (%)</th>
                    <th className="pb-3 font-semibold text-right">100kg Pilot Batch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9E2DC]">
                  {candidate.batchMatrix.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-[#EEF3ED] transition-colors ${
                        item.highlight ? 'bg-[#EEF3ED]/70 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 text-[#10231D] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#063B2E] shrink-0" />
                        <span className="break-words">{item.name}</span>
                        {item.highlight && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-[#063B2E] border border-[#0A9F6E]/40 shrink-0">
                            Core Scaffold
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-[#61706A]">{item.function}</td>
                      <td className="py-3 text-right font-mono font-bold text-[#063B2E]">
                        {item.wtPercent.toFixed(1)}%
                      </td>
                      <td className="py-3 text-right text-[#10231D] font-mono">
                        {item.wtPercent.toFixed(1)} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Allocation Breakdown */}
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <h3 className="text-base font-display font-bold text-[#063B2E] mb-1 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#063B2E]" />
              <span>Cost Allocation per Kilogram ({candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} Total)</span>
            </h3>
            <p className="text-xs text-[#61706A] mb-4">
              Deterministic calculation based on ingredient percentage weights and benchmark raw material prices
            </p>

            <div className="flex h-3 w-full rounded-full overflow-hidden bg-[#EEF3ED] p-0.5 border border-[#D9E2DC] mb-4">
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
                <div key={i} className="p-3 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] flex items-center gap-2.5 min-w-0">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div className="min-w-0">
                    <div className="text-xs text-[#10231D] font-medium truncate">{c.name}</div>
                    <div className="text-[11px] font-mono text-[#61706A] truncate">
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
        <div className="flex flex-col gap-6 min-w-0">
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#EEF3ED] border border-[#D9E2DC] flex items-center justify-center text-[#063B2E] shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-display font-bold text-[#063B2E]">Animal Precursor &rarr; Botanical Functional Mapping</h3>
                <p className="text-xs text-[#61706A]">
                  Biochemical functional alignment eliminating synthetic additives while preserving organoleptic cues
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {candidate.substitutionMap.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col gap-2 hover:border-[#0A9F6E]/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:w-5/12 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                        <span className="text-[#C98278] text-xs font-mono font-semibold">Anml</span>
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-[#C98278] uppercase font-medium">Animal Precursor</div>
                        <div className="text-sm font-semibold text-[#10231D] truncate">{pair.animalPrecursor}</div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center justify-center shrink-0 text-[#063B2E]">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-3 sm:w-5/12 min-w-0">
                      <span className="w-8 h-8 rounded-lg bg-white border border-[#D9E2DC] flex items-center justify-center shrink-0">
                        <span className="text-[#063B2E] text-xs font-mono font-semibold">Plnt</span>
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-[#063B2E] uppercase font-medium">Botanical Analog</div>
                        <div className="text-sm font-semibold text-[#10231D] truncate">{pair.botanicalAnalog}</div>
                      </div>
                    </div>
                  </div>

                  {pair.scientificReasoning && (
                    <div className="text-xs text-[#61706A] bg-white p-3 rounded-xl border border-[#D9E2DC] mt-1 leading-relaxed break-words">
                      <span className="text-[#063B2E] font-mono font-semibold">Functional Rationale: </span>
                      {pair.scientificReasoning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Microstructural Texture Micrograph */}
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <h3 className="text-base font-display font-bold text-[#063B2E] mb-3 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#063B2E]" />
              <span>Microstructural Texture Profile &amp; Cellular Parity</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-6 relative h-64 rounded-2xl overflow-hidden border border-[#D9E2DC] bg-[#EEF3ED] group">
                <img
                  src={candidate.crossSectionTextureImage || NUGGET_TEXTURE_IMAGE}
                  alt={`Microstructural scan of ${candidate.name}`}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
                  <span className="font-mono text-[11px]">SEM SCAN: 200μm SCALE</span>
                  <span className="text-white/80 font-mono text-[11px]">MICROGRAPH</span>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col justify-between gap-3 min-w-0">
                <div className="p-4 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC]">
                  <div className="text-xs font-semibold text-[#10231D]">Anisotropic Fiber Alignment (λ)</div>
                  <div className="text-sm font-mono font-semibold text-[#063B2E] mt-1">λ = 0.76 (Target: 0.74 &plusmn; 0.05)</div>
                  <p className="text-[11px] text-[#61706A] mt-1 leading-relaxed">
                    Twin-screw cooling die shear rate matches the parallel fascicle alignment of target animal fibers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC]">
                  <div className="text-xs font-semibold text-[#10231D]">Tensile Cutting Resistance (Warner-Bratzler)</div>
                  <div className="text-sm font-mono font-semibold text-[#063B2E] mt-1">18.2 N Peak (Control: 18.9 N)</div>
                  <p className="text-[11px] text-[#61706A] mt-1 leading-relaxed">
                    Bite resistance and initial tooth penetration replicate cooked whole muscle tissue.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC]">
                  <div className="text-xs font-semibold text-[#10231D]">Thermal Gelation Stability</div>
                  <div className="text-sm font-mono font-semibold text-[#063B2E] mt-1">68°C &ndash; 74°C Endothermic Plateau</div>
                  <p className="text-[11px] text-[#61706A] mt-1 leading-relaxed">
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
        <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-display font-bold text-[#063B2E] flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#063B2E]" />
                <span>Nutritional Profile &amp; Equivalence Benchmark (per 100g)</span>
              </h3>
              <p className="text-xs text-[#61706A]">
                Comparison between Candidate {candidate.code} and reference {productName}
              </p>
            </div>
            <span className="text-xs font-mono text-[#063B2E] bg-[#EEF3ED] px-2.5 py-1 rounded-md border border-[#D9E2DC] self-start sm:self-auto font-medium">
              ESTIMATED FROM INGREDIENTS
            </span>
          </div>

          <div className="overflow-x-auto min-w-0">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D9E2DC] text-[#61706A] font-mono">
                  <th className="pb-3 font-semibold">Nutrient Metric</th>
                  <th className="pb-3 font-semibold text-right">Vegan Candidate</th>
                  <th className="pb-3 font-semibold text-right">Conventional {productName}</th>
                  <th className="pb-3 font-semibold text-right">Delta (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E2DC]">
                {candidate.nutritionalProfile.map((n, idx) => (
                  <tr key={idx} className="hover:bg-[#EEF3ED] transition-colors">
                    <td className="py-3.5 text-[#10231D] font-medium">{n.metric}</td>
                    <td className="py-3.5 text-right font-mono font-bold text-[#063B2E]">{n.veganValue}</td>
                    <td className="py-3.5 text-right font-mono text-[#61706A]">{n.poultryValue}</td>
                    <td className="py-3.5 text-right font-mono font-medium">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        n.deltaPercent?.startsWith('+') ? 'bg-[#EEF3ED] text-[#063B2E] border border-[#0A9F6E]/30' : 'bg-[#EEF3ED] text-[#61706A]'
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
        <div className="flex flex-col gap-6 min-w-0">
          <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
            <h3 className="text-base font-display font-bold text-[#063B2E] mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#063B2E]" />
              <span>{candidate.processingDirectives?.technology || 'Twin-Screw High-Moisture Extrusion (HMEC) Directive'}</span>
            </h3>
            <p className="text-xs text-[#61706A] mb-5">
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
                <div key={i} className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
                  <div className="text-[11px] font-mono text-[#61706A] truncate">{z.zone}</div>
                  <div className="text-xl font-display font-bold text-[#063B2E] my-1 truncate">{z.temp}</div>
                  <div className="text-[10px] font-mono text-[#61706A] truncate">{z.note}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#D9E2DC]">
              <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Screw Speed</div>
                <div className="text-base font-display font-bold text-[#10231D] mt-0.5 truncate">
                  {candidate.processingDirectives?.screwSpeedRpm || 320} RPM
                </div>
                <div className="text-[10px] font-mono text-[#61706A] truncate">Co-rotating twin flight</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Specific Mech. Energy (SME)</div>
                <div className="text-base font-display font-bold text-[#063B2E] mt-0.5 truncate">
                  {candidate.processingDirectives?.smeEnergyKjKg || 112} kJ / kg
                </div>
                <div className="text-[10px] font-mono text-[#61706A] truncate">Target fibrillar unfolding</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Die Pressure</div>
                <div className="text-base font-display font-bold text-[#10231D] mt-0.5 truncate">
                  {candidate.processingDirectives?.diePressureMpa || 2.2} MPa
                </div>
                <div className="text-[10px] font-mono text-[#61706A] truncate">Laminar shear boundary</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Formulation Notes & Scientific Hypotheses */}
      <section className="rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card min-w-0">
        <h3 className="text-base font-display font-bold text-[#063B2E] mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#063B2E]" />
          <span>AI Formulation Notes &amp; Biopolymer Synergies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidate.aiRationales.map((rat, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#EEF3ED] border border-[#D9E2DC] flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#063B2E] text-base">{rat.icon}</span>
                  <h4 className="text-xs font-bold text-[#10231D] break-words">{rat.title}</h4>
                </div>
                <p className="text-xs text-[#61706A] leading-relaxed break-words">
                  {rat.description}
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-[#D9E2DC] flex items-center justify-between text-[11px] font-mono text-[#063B2E] font-medium">
                <span>Validated In-Silico</span>
                <Check className="w-3.5 h-3.5 text-[#063B2E]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Disclaimer Footer */}
      <div className="p-4 rounded-2xl bg-white border border-[#D9E2DC] text-xs text-[#61706A] flex items-center justify-between gap-4 shadow-subtle min-w-0">
        <div className="flex items-center gap-2 min-w-0">
          <Info className="w-4 h-4 text-[#063B2E] shrink-0" />
          <span className="break-words">AI-generated prototype. Results require physical laboratory validation before food production or commercial use. Prototype estimate — not a lifecycle assessment.</span>
        </div>
        <span className="text-[#063B2E] shrink-0 font-mono font-semibold text-[11px]">VEGANFORM AI R&amp;D</span>
      </div>
    </div>
  );
};
