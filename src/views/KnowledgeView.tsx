import React, { useState } from 'react';
import { TabType, BotanicalIngredient } from '../types/formulation';
import { BOTANICAL_INGREDIENTS } from '../data/mockData';
import {
  BookOpen,
  Search,
  Atom,
  Leaf,
  FlaskConical,
  Activity,
  Dna
} from 'lucide-react';

interface KnowledgeViewProps {
  onNavigate: (tab: TabType) => void;
  onOpenTerminal: () => void;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({ onNavigate, onOpenTerminal }) => {
  const [ingredients] = useState<BotanicalIngredient[]>(BOTANICAL_INGREDIENTS);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedIngredient, setSelectedIngredient] = useState<BotanicalIngredient | null>(BOTANICAL_INGREDIENTS[0]);

  const categories = [
    'all',
    'Protein Isolate',
    'Hydrocolloid & Binder',
    'Functional Lipid',
    'Umami & Flavor',
    'Scaffold Starch'
  ];

  const filtered = ingredients.filter(i => {
    const matchCat = filterCategory === 'all' || i.category === filterCategory;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) ||
                        i.keyProperty.toLowerCase().includes(search.toLowerCase()) ||
                        i.origin.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#10231D] min-w-0">
      {/* Top Banner */}
      <section className="relative rounded-3xl bg-white border border-[#D9E2DC] p-6 sm:p-8 shadow-card overflow-hidden min-w-0">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#35D39A]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#063B2E] font-bold">
                BOTANICAL ONTOLOGY • CHEMOTYPE ATLAS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-[#10231D] mt-2">
              Botanical Biopolymer Library
            </h1>
            <p className="text-xs sm:text-sm text-[#61706A] mt-1 max-w-2xl leading-relaxed">
              Validated biochemical characteristics, thermal denaturation plateaus, and texturization shear compatibility for plant protein precursors and functional biopolymers.
            </p>
          </div>

          <button
            onClick={onOpenTerminal}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#EEF3ED] text-[#10231D] border border-[#D9E2DC] text-xs font-mono font-medium transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-subtle shrink-0"
          >
            <Activity className="w-4 h-4 text-[#063B2E]" />
            <span>Engine Diagnostics</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 pt-5 border-t border-[#D9E2DC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md min-w-0">
            <Search className="w-4 h-4 text-[#61706A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search botanical isolate, functional role, or origin..."
              className="w-full bg-[#F6F7F2] border border-[#D9E2DC] rounded-xl pl-9 pr-3 py-2 text-xs text-[#10231D] placeholder-[#61706A]/60 focus:outline-none focus:border-[#063B2E] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#063B2E] text-white font-medium shadow-xs'
                    : 'bg-[#EEF3ED] text-[#61706A] hover:text-[#10231D] hover:bg-white border border-[#D9E2DC]'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid: List & Selected Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-w-0">
        {/* Ingredient Cards List */}
        <div className="md:col-span-7 flex flex-col gap-3 min-w-0">
          <div className="flex items-center justify-between text-xs text-[#61706A] font-mono">
            <span className="font-medium">{filtered.length} Ingredients Indexed</span>
            <span>Select to inspect profile</span>
          </div>

          <div className="flex flex-col gap-3 max-h-[640px] overflow-y-auto pr-1">
            {filtered.map(item => {
              const isSelected = selectedIngredient?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIngredient(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer min-w-0 ${
                    isSelected
                      ? 'bg-white border-[#063B2E] ring-2 ring-[#0A9F6E]/20 shadow-card'
                      : 'bg-white border-[#D9E2DC] hover:border-[#0A9F6E]/40 hover:bg-[#EEF3ED] shadow-subtle'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-sm text-[#10231D] break-words">{item.name}</span>
                        {item.cleanLabel && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#EEF3ED] text-[#063B2E] border border-[#0A9F6E]/40 font-medium shrink-0">
                            Clean Label
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#61706A] mt-0.5 break-words">
                        {item.category} • Origin: {item.origin}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-bold text-[#063B2E]">
                        ${item.estCostKg.toFixed(2)}/kg
                      </div>
                      <div className="text-[10px] font-mono text-[#61706A]">
                        {item.proteinContent}% Protein
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#61706A] mt-2 line-clamp-2 leading-relaxed break-words">
                    {item.keyProperty}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Profile Detail Panel */}
        <div className="md:col-span-5 min-w-0">
          {selectedIngredient ? (
            <div className="rounded-3xl bg-white border border-[#D9E2DC] p-6 shadow-card sticky top-24 flex flex-col gap-4 min-w-0">
              <div className="flex items-center justify-between pb-3 border-b border-[#D9E2DC] gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-mono text-[#063B2E] font-medium truncate block">
                    {selectedIngredient.category}
                  </span>
                  <h3 className="text-lg font-display font-extrabold text-[#10231D] mt-0.5 break-words">{selectedIngredient.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#063B2E] text-[#35D39A] flex items-center justify-center shrink-0">
                  <FlaskConical className="w-5 h-5" />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs min-w-0">
                <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                  <div className="text-[10px] font-mono text-[#61706A] font-medium uppercase">Functional Property &amp; Mechanism</div>
                  <div className="text-[#10231D] mt-1 leading-relaxed break-words">{selectedIngredient.keyProperty}</div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Protein Purity</div>
                    <div className="text-sm font-display font-bold text-[#063B2E] mt-0.5 truncate">
                      {selectedIngredient.proteinContent}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Shear Suitability</div>
                    <div className="text-sm font-display font-bold text-[#063B2E] mt-0.5 truncate">
                      {selectedIngredient.shearSuitability}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Gelling Transition</div>
                    <div className="text-xs font-display font-bold text-[#10231D] mt-0.5 truncate">
                      {selectedIngredient.gellingTemp}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                    <div className="text-[10px] font-mono text-[#61706A] uppercase truncate">Estimated Cost</div>
                    <div className="text-sm font-display font-bold text-[#10231D] mt-0.5 truncate">
                      ${selectedIngredient.estCostKg.toFixed(2)} / kg
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#EEF3ED] border border-[#D9E2DC] min-w-0">
                  <div className="text-[10px] font-mono text-[#61706A] mb-1 font-medium uppercase">Texturization Application</div>
                  <div className="text-xs text-[#61706A] leading-relaxed break-words">
                    Compatible with twin-screw extrusion barrels up to 160°C. Delivers anisotropic fiber alignment when blended with structural legumes.
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('formulate')}
                className="w-full py-2.5 rounded-xl bg-[#063B2E] hover:bg-[#082A23] text-white font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle mt-1"
              >
                <span>Use in Formulation Workspace</span>
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-[#D9E2DC] p-8 text-center text-xs text-[#61706A] shadow-card">
              Select an ingredient to inspect its biochemical profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
