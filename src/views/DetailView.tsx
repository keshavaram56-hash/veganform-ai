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
      <div className="flex flex-col items-center justify-center p-12 text-center text-[#17201C] pt-32">
        <p className="text-sm text-[#66716B] mb-4">No active candidate formulation found.</p>
        <button
          onClick={() => onNavigate('formulate')}
          className="px-4 py-2 rounded-xl bg-[#059669] text-white font-medium text-xs cursor-pointer shadow-subtle"
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#17201C]">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('candidates')}
          className="flex items-center gap-2 text-xs text-[#66716B] hover:text-[#17201C] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#059669]" />
          <span>Back to Candidates</span>
        </button>

        {/* Candidate Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#66716B] hidden sm:inline">Active Candidate:</span>
          <select
            value={candidate.id}
            onChange={(e) => onSelectCandidate(e.target.value)}
            className="bg-white border border-[#E5EAE7] rounded-xl px-3 py-1.5 text-xs text-[#059669] font-medium focus:outline-none focus:border-[#059669] cursor-pointer shadow-subtle"
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
      <section className="relative rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#059669] font-semibold tracking-wider uppercase bg-[#ECFDF5] px-2.5 py-0.5 rounded-md border border-[#BBF7D0]">
                FORMULATION DOSSIER
              </span>
              <span className="text-xs text-[#66716B] bg-[#F8FAF9] px-2.5 py-0.5 rounded-md border border-[#E5EAE7] font-mono">
                REF #{candidate.code}
              </span>
              <span className="text-xs text-[#17201C] bg-[#F8FAF9] px-2 py-0.5 rounded-md border border-[#E5EAE7] font-medium">
                {candidate.rankBadge}
              </span>
              {candidate.constraintCompliant !== false && (
                <span className="text-xs text-[#166534] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#BBF7D0] flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Constraint Compliant</span>
                </span>
              )}
              <span className="text-xs text-[#66716B] bg-[#F8FAF9] px-2 py-0.5 rounded-md border border-[#E5EAE7]">
                Target: {productName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17201C] mt-1">
              {candidate.name}
            </h1>
            <p className="text-sm text-[#66716B] max-w-2xl leading-relaxed">
              {candidate.tagline}. High-moisture extrusion profile calibrated for anisotropic {productName.toLowerCase()} structural bio-equivalence.
            </p>
          </div>

          {/* AI Composite Score Dial & Actions */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-[#66716B] uppercase font-semibold tracking-wider">
                  AI Composite Score
                </div>
                <div className="text-3xl font-bold text-[#059669] flex items-baseline justify-end gap-1">
                  <span>{candidate.aiScore}</span>
                  <span className="text-xs text-[#66716B] font-normal">/ 100</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopySpec}
                className="px-3 py-2 rounded-xl bg-white hover:bg-[#F8FAF9] text-[#17201C] border border-[#E5EAE7] text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                title="Copy formulation summary to clipboard"
              >
                {copiedNotification ? (
                  <>
                    <Check className="w-4 h-4 text-[#059669]" />
                    <span className="text-[#059669] font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#66716B]" />
                    <span className="hidden sm:inline">Copy Spec</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExportPdf}
                className="px-4 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-medium text-xs tracking-wide transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
              >
                <Download className="w-4 h-4" />
                <span>Print / Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#E5EAE7]">
          <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="text-[11px] text-[#66716B]">Unit Formulation Cost</div>
            <div className="text-lg font-bold text-[#17201C] mt-0.5">
              {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} <span className="text-xs text-[#66716B] font-normal">/ kg</span>
            </div>
            <div className="text-[10px] text-[#059669] mt-0.5 font-medium">Calculated from ingredients</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="text-[11px] text-[#66716B]">Texture Similarity</div>
            <div className="text-lg font-bold text-[#059669] mt-0.5">
              {candidate.textureParity}%
            </div>
            <div className="text-[10px] text-[#66716B] mt-0.5">AI-estimated</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="text-[11px] text-[#66716B]">Protein Density</div>
            <div className="text-lg font-bold text-[#17201C] mt-0.5">
              {candidate.proteinPer100g}g <span className="text-xs text-[#66716B] font-normal">/ 100g</span>
            </div>
            <div className="text-[10px] text-[#66716B] mt-0.5">{candidate.caloriesKcal} kcal / 100g</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
            <div className="text-[11px] text-[#66716B]">Carbon Reduction</div>
            <div className="text-lg font-bold text-[#059669] mt-0.5">
              {candidate.carbonFootprintDelta}
            </div>
            <div className="text-[10px] text-[#66716B] mt-0.5">Prototype estimate — not an LCA</div>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5EAE7] pb-2 overflow-x-auto">
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
                  ? 'bg-white text-[#059669] border border-[#E5EAE7] shadow-xs font-semibold'
                  : 'text-[#66716B] hover:text-[#17201C] hover:bg-white'
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
          <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-base font-bold text-[#17201C] flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-[#059669]" />
                  <span>100kg Wet-Lab Pilot Batch Recipe</span>
                </h3>
                <p className="text-xs text-[#66716B]">
                  Calculated based on botanical hydration and shear-induced protein unfolding
                </p>
              </div>

              <span className="text-xs text-[#059669] bg-[#ECFDF5] px-3 py-1 rounded-lg border border-[#BBF7D0] font-semibold self-start sm:self-auto">
                Total: 100.0% wt
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5EAE7] text-[#66716B]">
                    <th className="pb-3 font-semibold">Botanical Ingredient</th>
                    <th className="pb-3 font-semibold">Biochemical Function</th>
                    <th className="pb-3 font-semibold text-right">Weight Ratio (%)</th>
                    <th className="pb-3 font-semibold text-right">100kg Pilot Batch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAE7]">
                  {candidate.batchMatrix.map((item, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-[#F8FAF9] transition-colors ${
                        item.highlight ? 'bg-[#ECFDF5]/50 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3 text-[#17201C] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                        <span>{item.name}</span>
                        {item.highlight && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ECFDF5] text-[#059669] border border-[#BBF7D0]">
                            Core Scaffold
                          </span>
                        )}
                      </td>
                      <td className="py-3 text-[#66716B]">{item.function}</td>
                      <td className="py-3 text-right font-bold text-[#059669]">
                        {item.wtPercent.toFixed(1)}%
                      </td>
                      <td className="py-3 text-right text-[#17201C] font-mono">
                        {item.wtPercent.toFixed(1)} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cost Allocation Breakdown */}
          <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
            <h3 className="text-base font-bold text-[#17201C] mb-1 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#059669]" />
              <span>Cost Allocation per Kilogram ({candidate.currencySymbol}{candidate.costPerKg.toFixed(2)} Total)</span>
            </h3>
            <p className="text-xs text-[#66716B] mb-4">
              Deterministic calculation based on ingredient percentage weights and benchmark raw material prices
            </p>

            <div className="flex h-3 w-full rounded-full overflow-hidden bg-[#F3F6F4] p-0.5 border border-[#E5EAE7] mb-4">
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
                <div key={i} className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7] flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div>
                    <div className="text-xs text-[#17201C] font-medium truncate max-w-[130px]">{c.name}</div>
                    <div className="text-[11px] text-[#66716B]">
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
          <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#17201C]">Animal Precursor &rarr; Botanical Functional Mapping</h3>
                <p className="text-xs text-[#66716B]">
                  Biochemical functional alignment eliminating synthetic additives while preserving organoleptic cues
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {candidate.substitutionMap.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col gap-2 hover:border-[#BBF7D0] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 sm:w-5/12">
                      <span className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0">
                        <span className="text-rose-700 text-xs font-semibold">Anml</span>
                      </span>
                      <div>
                        <div className="text-[10px] text-rose-600 uppercase font-medium">Animal Precursor</div>
                        <div className="text-sm font-semibold text-[#17201C]">{pair.animalPrecursor}</div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center justify-center shrink-0 text-[#059669]">
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    <div className="flex items-center gap-3 sm:w-5/12">
                      <span className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center shrink-0">
                        <span className="text-[#059669] text-xs font-semibold">Plnt</span>
                      </span>
                      <div>
                        <div className="text-[10px] text-[#059669] uppercase font-medium">Botanical Analog</div>
                        <div className="text-sm font-semibold text-[#17201C]">{pair.botanicalAnalog}</div>
                      </div>
                    </div>
                  </div>

                  {pair.scientificReasoning && (
                    <div className="text-xs text-[#66716B] bg-white p-3 rounded-xl border border-[#E5EAE7] mt-1">
                      <span className="text-[#059669] font-semibold">Functional Rationale: </span>
                      {pair.scientificReasoning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Microstructural Texture Micrograph */}
          <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
            <h3 className="text-base font-bold text-[#17201C] mb-3 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#059669]" />
              <span>Microstructural Texture Profile &amp; Cellular Parity</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              <div className="md:col-span-6 relative h-64 rounded-2xl overflow-hidden border border-[#E5EAE7] bg-[#F8FAF9] group">
                <img
                  src={candidate.crossSectionTextureImage || NUGGET_TEXTURE_IMAGE}
                  alt={`Microstructural scan of ${candidate.name}`}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-xs text-white bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/20">
                  <span>SEM SCAN: 200μm SCALE</span>
                  <span className="text-white/80">MICROGRAPH</span>
                </div>
              </div>

              <div className="md:col-span-6 flex flex-col justify-between gap-3">
                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
                  <div className="text-xs font-semibold text-[#17201C]">Anisotropic Fiber Alignment (λ)</div>
                  <div className="text-sm font-semibold text-[#059669] mt-1">λ = 0.76 (Target: 0.74 &plusmn; 0.05)</div>
                  <p className="text-[11px] text-[#66716B] mt-1">
                    Twin-screw cooling die shear rate matches the parallel fascicle alignment of target animal fibers.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
                  <div className="text-xs font-semibold text-[#17201C]">Tensile Cutting Resistance (Warner-Bratzler)</div>
                  <div className="text-sm font-semibold text-[#059669] mt-1">18.2 N Peak (Control: 18.9 N)</div>
                  <p className="text-[11px] text-[#66716B] mt-1">
                    Bite resistance and initial tooth penetration replicate cooked whole muscle tissue.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
                  <div className="text-xs font-semibold text-[#17201C]">Thermal Gelation Stability</div>
                  <div className="text-sm font-semibold text-[#059669] mt-1">68°C &ndash; 74°C Endothermic Plateau</div>
                  <p className="text-[11px] text-[#66716B] mt-1">
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
        <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-[#17201C] flex items-center gap-2">
                <Microscope className="w-5 h-5 text-[#059669]" />
                <span>Nutritional Profile &amp; Equivalence Benchmark (per 100g)</span>
              </h3>
              <p className="text-xs text-[#66716B]">
                Comparison between Candidate {candidate.code} and reference {productName}
              </p>
            </div>
            <span className="text-xs text-[#059669] bg-[#ECFDF5] px-2.5 py-1 rounded-md border border-[#BBF7D0] self-start sm:self-auto font-medium">
              Estimated from ingredients
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5EAE7] text-[#66716B]">
                  <th className="pb-3 font-semibold">Nutrient Metric</th>
                  <th className="pb-3 font-semibold text-right">Vegan Candidate</th>
                  <th className="pb-3 font-semibold text-right">Conventional {productName}</th>
                  <th className="pb-3 font-semibold text-right">Delta (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAE7]">
                {candidate.nutritionalProfile.map((n, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAF9] transition-colors">
                    <td className="py-3.5 text-[#17201C] font-medium">{n.metric}</td>
                    <td className="py-3.5 text-right font-bold text-[#059669]">{n.veganValue}</td>
                    <td className="py-3.5 text-right text-[#66716B]">{n.poultryValue}</td>
                    <td className="py-3.5 text-right font-medium">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${
                        n.deltaPercent?.startsWith('+') ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F8FAF9] text-[#66716B]'
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
          <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
            <h3 className="text-base font-bold text-[#17201C] mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#059669]" />
              <span>{candidate.processingDirectives?.technology || 'Twin-Screw High-Moisture Extrusion (HMEC) Directive'}</span>
            </h3>
            <p className="text-xs text-[#66716B] mb-5">
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
                <div key={i} className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
                  <div className="text-[11px] text-[#66716B]">{z.zone}</div>
                  <div className="text-xl font-bold text-[#059669] my-1">{z.temp}</div>
                  <div className="text-[10px] text-[#66716B]">{z.note}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#E5EAE7]">
              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
                <div className="text-[11px] text-[#66716B]">Screw Speed</div>
                <div className="text-base font-bold text-[#17201C] mt-0.5">
                  {candidate.processingDirectives?.screwSpeedRpm || 320} RPM
                </div>
                <div className="text-[10px] text-[#66716B]">Co-rotating twin flight</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
                <div className="text-[11px] text-[#66716B]">Specific Mech. Energy (SME)</div>
                <div className="text-base font-bold text-[#059669] mt-0.5">
                  {candidate.processingDirectives?.smeEnergyKjKg || 112} kJ / kg
                </div>
                <div className="text-[10px] text-[#66716B]">Target fibrillar unfolding</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7]">
                <div className="text-[11px] text-[#66716B]">Die Pressure</div>
                <div className="text-base font-bold text-[#17201C] mt-0.5">
                  {candidate.processingDirectives?.diePressureMpa || 2.2} MPa
                </div>
                <div className="text-[10px] text-[#66716B]">Laminar shear boundary</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Formulation Notes & Scientific Hypotheses */}
      <section className="rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card">
        <h3 className="text-base font-bold text-[#17201C] mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#059669]" />
          <span>AI Formulation Notes &amp; Biopolymer Synergies</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {candidate.aiRationales.map((rat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E5EAE7] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#059669] text-base">{rat.icon}</span>
                  <h4 className="text-xs font-bold text-[#17201C]">{rat.title}</h4>
                </div>
                <p className="text-xs text-[#66716B] leading-relaxed">
                  {rat.description}
                </p>
              </div>
              <div className="mt-3.5 pt-2 border-t border-[#E5EAE7] flex items-center justify-between text-[11px] text-[#059669] font-medium">
                <span>Validated In-Silico</span>
                <Check className="w-3.5 h-3.5 text-[#059669]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research Disclaimer Footer */}
      <div className="p-4 rounded-2xl bg-white border border-[#E5EAE7] text-xs text-[#66716B] flex items-center justify-between gap-4 shadow-subtle">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#059669] shrink-0" />
          <span>AI-generated prototype. Results require physical laboratory validation before food production or commercial use. Prototype estimate — not a lifecycle assessment.</span>
        </div>
        <span className="text-[#059669] shrink-0 font-semibold">VeganForm AI R&amp;D</span>
      </div>
    </div>
  );
};
