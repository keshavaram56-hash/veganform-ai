import React, { useState } from 'react';
import { TabType, BotanicalIngredient } from '../types/formulation';
import { BOTANICAL_INGREDIENTS } from '../data/mockData';
import {
  BookOpen,
  Search,
  Atom,
  Leaf,
  FlaskConical,
  Activity
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-8 text-[#17201C]">
      {/* Top Banner */}
      <section className="relative rounded-3xl bg-white border border-[#E5EAE7] p-6 sm:p-8 shadow-card overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#059669]" />
              <span className="text-xs uppercase tracking-wider text-[#059669] font-semibold">
                Botanical Ontology • Chemotype Atlas
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17201C] mt-2">
              Botanical Biopolymer Library
            </h1>
            <p className="text-xs sm:text-sm text-[#66716B] mt-1 max-w-2xl leading-relaxed">
              Validated biochemical characteristics, thermal denaturation plateaus, and texturization shear compatibility for plant protein precursors and functional biopolymers.
            </p>
          </div>

          <button
            onClick={onOpenTerminal}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8FAF9] text-[#17201C] border border-[#E5EAE7] text-xs font-medium transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-subtle"
          >
            <Activity className="w-4 h-4 text-[#059669]" />
            <span>Engine Diagnostics</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-6 pt-5 border-t border-[#E5EAE7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#66716B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search botanical isolate, functional role, or origin..."
              className="w-full bg-[#F8FAF9] border border-[#E5EAE7] rounded-xl pl-9 pr-3 py-2 text-xs text-[#17201C] placeholder-[#66716B]/60 focus:outline-none focus:border-[#059669] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#059669] text-white font-medium shadow-xs'
                    : 'bg-[#F8FAF9] text-[#66716B] hover:text-[#17201C] hover:bg-white border border-[#E5EAE7]'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid: List & Selected Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Ingredient Cards List */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-[#66716B]">
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
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#059669] ring-2 ring-[#059669]/15 shadow-card'
                      : 'bg-white border-[#E5EAE7] hover:border-[#D1DCD6] hover:bg-[#F8FAF9] shadow-subtle'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#17201C]">{item.name}</span>
                        {item.cleanLabel && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ECFDF5] text-[#059669] border border-[#BBF7D0] font-medium">
                            Clean Label
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#66716B] mt-0.5">
                        {item.category} • Origin: {item.origin}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#059669]">
                        ${item.estCostKg.toFixed(2)}/kg
                      </div>
                      <div className="text-[11px] text-[#66716B]">
                        {item.proteinContent}% Protein
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#66716B] mt-2 line-clamp-2 leading-relaxed">
                    {item.keyProperty}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Profile Detail Panel */}
        <div className="md:col-span-5">
          {selectedIngredient ? (
            <div className="rounded-3xl bg-white border border-[#E5EAE7] p-6 shadow-card sticky top-24 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EAE7]">
                <div>
                  <span className="text-xs text-[#059669] font-medium">
                    {selectedIngredient.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#17201C] mt-0.5">{selectedIngredient.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] border border-[#BBF7D0] flex items-center justify-center text-[#059669]">
                  <FlaskConical className="w-5 h-5" />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
                  <div className="text-[11px] text-[#66716B] font-medium">Functional Property &amp; Mechanism</div>
                  <div className="text-[#17201C] mt-1 leading-relaxed">{selectedIngredient.keyProperty}</div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
                    <div className="text-[11px] text-[#66716B]">Protein Purity</div>
                    <div className="text-sm font-bold text-[#059669] mt-0.5">
                      {selectedIngredient.proteinContent}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
                    <div className="text-[11px] text-[#66716B]">Shear Suitability</div>
                    <div className="text-sm font-bold text-[#059669] mt-0.5">
                      {selectedIngredient.shearSuitability}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
                    <div className="text-[11px] text-[#66716B]">Gelling Transition</div>
                    <div className="text-xs font-bold text-[#17201C] mt-0.5">
                      {selectedIngredient.gellingTemp}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
                    <div className="text-[11px] text-[#66716B]">Estimated Cost</div>
                    <div className="text-sm font-bold text-[#17201C] mt-0.5">
                      ${selectedIngredient.estCostKg.toFixed(2)} / kg
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5EAE7]">
                  <div className="text-[11px] text-[#66716B] mb-1 font-medium">Texturization Application</div>
                  <div className="text-xs text-[#66716B] leading-relaxed">
                    Compatible with twin-screw extrusion barrels up to 160°C. Delivers anisotropic fiber alignment when blended with structural legumes.
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('formulate')}
                className="w-full py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle mt-1"
              >
                <span>Use in Formulation Workspace</span>
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-[#E5EAE7] p-8 text-center text-xs text-[#66716B] shadow-card">
              Select an ingredient to inspect its biochemical profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
