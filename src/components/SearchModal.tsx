import React, { useState } from 'react';
import { CANDIDATE_FORMULATIONS, BOTANICAL_INGREDIENTS } from '../data/mockData';
import { TabType, CandidateFormulation } from '../types/formulation';
import { Search, X, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

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
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0b120e] border border-[#1b2b22] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-[#0e1713] border-b border-[#1b2b22] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#10b981] shrink-0" />
          <input
            type="text"
            placeholder="Search candidate codes, botanical isolates, rheology markers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-[#8da396]/60 font-mono text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8da396] hover:text-white px-2 py-0.5 text-xs font-mono rounded bg-[#131d18] border border-[#1b2b22]"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8da396] hover:text-white hover:bg-[#18261f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="px-4 py-2.5 bg-[#090e0c] border-b border-[#1b2b22] flex items-center gap-2 overflow-x-auto no-scrollbar font-mono text-[11px]">
          <span className="text-[#8da396] uppercase text-[10px] shrink-0">Tags:</span>
          {['Pea Protein', 'Methylcellulose', 'Soy-Free', 'Gluten-Free', 'High Umami', 'VFA-CHK-092'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-lg bg-[#0e1713] border border-[#1b2b22] text-[#dfe4e0] hover:text-[#10b981] hover:border-[#10b981]/40 shrink-0 transition-colors cursor-pointer"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-5">
          {/* Candidates Group */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#8da396] uppercase tracking-wider mb-2.5">
              <span>Formulation Candidates ({filteredCandidates.length})</span>
              <span className="text-[#10b981] text-[10px] bg-[#121c17] px-2 py-0.5 rounded border border-[#10b981]/25">
                IN SILICO
              </span>
            </div>
            <div className="space-y-2">
              {filteredCandidates.length === 0 ? (
                <div className="text-xs text-[#8da396] font-mono py-2">No matching candidate formulations found.</div>
              ) : (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => {
                      onSelectCandidate(candidate.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-[#0e1713] border border-[#1b2b22] hover:border-[#10b981]/50 hover:bg-[#131f19] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#121c17] border border-[#10b981]/30 text-[#10b981] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        #{candidate.rank}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white group-hover:text-[#10b981] transition-colors truncate text-sm">
                            {candidate.name}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-[#090e0c] text-[#8da396] font-mono text-[10px] border border-[#1b2b22]">
                            {candidate.code}
                          </span>
                        </div>
                        <span className="text-xs text-[#8da396] truncate mt-0.5">
                          Score: {candidate.aiScore}/100 • Cost: {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)}/kg • Protein: {candidate.proteinPer100g}g/100g
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8da396] group-hover:text-[#10b981] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Botanical Ingredients Group */}
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#8da396] uppercase tracking-wider mb-2.5">
              <span>Botanical Ingredients Library ({filteredIngredients.length})</span>
              <button
                onClick={() => { onNavigate('knowledge'); onClose(); }}
                className="text-[#10b981] hover:underline flex items-center gap-1 text-[11px]"
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
                  className="p-3 rounded-xl bg-[#0e1713] border border-[#1b2b22] hover:border-[#10b981]/40 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white truncate">{ing.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#121c17] text-[#10b981] font-mono text-[9px] border border-[#10b981]/25">
                        {ing.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#8da396] truncate mt-0.5">{ing.keyProperty}</span>
                  </div>
                  <span className="font-mono text-xs text-[#10b981] font-semibold shrink-0 ml-3">
                    ${ing.estCostKg}/kg
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#090e0c] border-t border-[#1b2b22] flex items-center justify-between text-xs font-mono text-[#8da396]">
          <span>VeganForm AI Knowledge Base v3.2</span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
