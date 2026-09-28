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
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/35 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-[#E5EAE7] rounded-2xl shadow-dropdown overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-white border-b border-[#E5EAE7] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#059669] shrink-0" />
          <input
            type="text"
            placeholder="Search candidate formulations, botanical isolates, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-[#17201C] placeholder-[#66716B]/60 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#66716B] hover:text-[#17201C] px-2 py-0.5 text-xs rounded bg-[#F3F6F4] border border-[#E5EAE7]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#66716B] hover:text-[#17201C] hover:bg-[#F3F6F4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="px-4 py-2.5 bg-[#F8FAF9] border-b border-[#E5EAE7] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[#66716B] text-xs font-medium shrink-0">Tags:</span>
          {['Pea Protein', 'Methylcellulose', 'Soy-Free', 'Gluten-Free', 'High Umami', 'VFA-CHK-092'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 rounded-md bg-white border border-[#E5EAE7] text-[#17201C] hover:text-[#059669] hover:border-[#BBF7D0] hover:bg-[#F0FDF4] shrink-0 transition-colors cursor-pointer text-xs"
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-5">
          {/* Candidates Group */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#66716B] uppercase font-semibold tracking-wider mb-2.5">
              <span>Formulation Candidates ({filteredCandidates.length})</span>
              <span className="text-[#059669] text-[11px] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#BBF7D0]">
                In-Silico
              </span>
            </div>
            <div className="space-y-2">
              {filteredCandidates.length === 0 ? (
                <div className="text-xs text-[#66716B] py-2">No matching candidate formulations found.</div>
              ) : (
                filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    onClick={() => {
                      onSelectCandidate(candidate.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-white border border-[#E5EAE7] hover:border-[#BBF7D0] hover:bg-[#F8FAF9] cursor-pointer transition-all flex items-center justify-between group shadow-subtle"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#BBF7D0] text-[#059669] flex items-center justify-center text-xs font-semibold shrink-0">
                        #{candidate.rank}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#17201C] group-hover:text-[#059669] transition-colors truncate text-sm">
                            {candidate.name}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-[#F3F6F4] text-[#66716B] text-[10px] font-mono border border-[#E5EAE7]">
                            {candidate.code}
                          </span>
                        </div>
                        <span className="text-xs text-[#66716B] truncate mt-0.5">
                          Score: {candidate.aiScore}/100 • Cost: {candidate.currencySymbol}{candidate.costPerKg.toFixed(2)}/kg • Protein: {candidate.proteinPer100g}g/100g
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#66716B] group-hover:text-[#059669] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Botanical Ingredients Group */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#66716B] uppercase font-semibold tracking-wider mb-2.5">
              <span>Botanical Ingredients Library ({filteredIngredients.length})</span>
              <button
                onClick={() => { onNavigate('knowledge'); onClose(); }}
                className="text-[#059669] hover:underline flex items-center gap-1 text-[11px] font-medium"
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
                  className="p-3 rounded-xl bg-white border border-[#E5EAE7] hover:border-[#BBF7D0] hover:bg-[#F8FAF9] cursor-pointer flex items-center justify-between transition-colors shadow-subtle"
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#17201C] truncate">{ing.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-[#F8FAF9] text-[#66716B] text-[10px] border border-[#E5EAE7]">
                        {ing.category}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#66716B] truncate mt-0.5">{ing.keyProperty}</span>
                  </div>
                  <span className="text-xs text-[#059669] font-medium shrink-0 ml-3">
                    ${ing.estCostKg}/kg
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F8FAF9] border-t border-[#E5EAE7] flex items-center justify-between text-xs text-[#66716B]">
          <span>VeganForm AI Knowledge Base</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
