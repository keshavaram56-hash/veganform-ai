import React, { useState } from 'react';
import { CANDIDATE_FORMULATIONS, BOTANICAL_INGREDIENTS } from '../data/mockData';
import { TabType, CandidateFormulation } from '../types/formulation';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCandidate: (candidateId: string) => void;
  onNavigate: (tab: TabType) => void;
  candidates?: CandidateFormulation[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCandidate,
  onNavigate,
  candidates = CANDIDATE_FORMULATIONS
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const candidatePool = candidates && candidates.length > 0 ? candidates : CANDIDATE_FORMULATIONS;

  const filteredCandidates = candidatePool.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase()) ||
      c.baseIsolate.toLowerCase().includes(query.toLowerCase())
  );

  const filteredIngredients = BOTANICAL_INGREDIENTS.filter(
    (i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase()) ||
      i.keyProperty.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-[#082A23]/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#D9E2DC] rounded-3xl shadow-dropdown overflow-hidden flex flex-col max-h-[80vh] min-w-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#D9E2DC] flex items-center gap-3 min-w-0">
          <Search className="w-5 h-5 text-[#063B2E] shrink-0" />
          <input
            type="text"
            placeholder="Search candidate formulations, botanical isolates, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#10231D] placeholder-[#61706A]/60 text-sm focus:outline-none min-w-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#61706A] hover:text-[#10231D] px-2 py-0.5 text-xs font-mono rounded bg-[#EEF3ED] border border-[#D9E2DC] shrink-0 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-[#61706A] hover:text-[#10231D] hover:bg-[#EEF3ED] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="px-4 py-2.5 bg-[#EEF3ED] border-b border-[#D9E2DC] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs min-w-0">
          <span className="text-[#61706A] text-xs font-mono font-medium shrink-0">Tags:</span>
          {['Pea Protein', 'Methylcellulose', 'Soy-Free', 'Gluten-Free', 'High Umami', 'VFA-CHK-092'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#D9E2DC] text-[#10231D] hover:text-[#063B2E] hover:border-[#0A9F6E]/40 hover:bg-[#EEF3ED] shrink-0 transition-colors cursor-pointer text-xs font-mono"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-5 min-w-0">
          {/* Candidates Group */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#61706A] uppercase font-mono font-semibold tracking-wider mb-2.5">
              <span>Formulation Candidates ({filteredCandidates.length})</span>
              <span className="text-[#063B2E] text-[10px] bg-[#EEF3ED] px-2 py-0.5 rounded border border-[#0A9F6E]/30 font-semibold">
                IN-SILICO
              </span>
            </div>
            <div className="space-y-2">
              {filteredCandidates.length === 0 ? (
                <div className="text-xs text-[#61706A] py-2">No matching candidate formulations found.</div>
              ) : (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => {
                      onSelectCandidate(candidate.id);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-[#D9E2DC] hover:border-[#0A9F6E]/40 hover:bg-[#EEF3ED] cursor-pointer transition-all flex items-center justify-between group shadow-subtle min-w-0"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-xl bg-[#063B2E] text-[#35D39A] flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        #{candidate.rank}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-bold text-[#10231D] group-hover:text-[#063B2E] transition-colors truncate text-sm">
                            {candidate.name}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-[#EEF3ED] text-[#61706A] text-[10px] font-mono border border-[#D9E2DC] shrink-0">
                            {candidate.code}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#61706A] truncate mt-0.5">
                          Score: {candidate.aiScore}/100 • Cost: {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)}/kg • Protein: {candidate.proteinPer100g}g/100g
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#61706A] group-hover:text-[#063B2E] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Botanical Ingredients Group */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#61706A] uppercase font-mono font-semibold tracking-wider mb-2.5">
              <span>Botanical Ingredients Library ({filteredIngredients.length})</span>
              <button
                onClick={() => { onNavigate('knowledge'); onClose(); }}
                className="text-[#063B2E] hover:underline flex items-center gap-1 text-[11px] font-mono font-medium cursor-pointer"
              >
                <span>View Full Library</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {filteredIngredients.slice(0, 4).map((ing) => (
                <div
                  key={ing.id}
                  onClick={() => {
                    onNavigate('knowledge');
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-[#D9E2DC] hover:border-[#0A9F6E]/40 hover:bg-[#EEF3ED] cursor-pointer flex items-center justify-between transition-colors shadow-subtle min-w-0"
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-display font-bold text-[#10231D] truncate">{ing.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#EEF3ED] text-[#61706A] text-[10px] font-mono border border-[#D9E2DC] shrink-0">
                        {ing.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#61706A] truncate mt-0.5">{ing.keyProperty}</span>
                  </div>
                  <span className="text-xs font-mono text-[#063B2E] font-bold shrink-0 ml-3">
                    ${ing.estCostKg}/kg
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#EEF3ED] border-t border-[#D9E2DC] flex items-center justify-between text-xs text-[#61706A] font-mono">
          <span>VEGANFORM AI // KNOWLEDGE BASE</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
