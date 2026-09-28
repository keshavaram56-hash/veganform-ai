import React, { useState } from 'react';
import { TabType, BotanicalIngredient } from '../types/formulation';
import { BOTANICAL_INGREDIENTS } from '../data/mockData';
import {
  BookOpen,
  Terminal,
  Search,
  Filter,
  Atom,
  Leaf,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  ExternalLink
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
    <div className="flex flex-col w-full px-4 sm:px-6 pb-36 pt-20 max-w-5xl mx-auto gap-6 text-[#dfe4e0]">
      {/* Top Banner */}
      <section className="relative rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-6 sm:p-7 shadow-xl overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] font-semibold">
                BOTANICAL ONTOLOGY &bull; CHEMOTYPE ATLAS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1.5">
              Botanical Biopolymer Library
            </h1>
            <p className="text-xs sm:text-sm text-[#8da396] mt-1 max-w-2xl leading-relaxed">
              Validated biochemical characteristics, thermal denaturation plateaus, and texturization shear compatibility for plant protein precursors and functional biopolymers.
            </p>
          </div>

          <button
            onClick={onOpenTerminal}
            className="px-4 py-2 rounded-xl bg-[#080d0b] hover:bg-[#121d17] text-white border border-[#1b2b22] text-xs font-mono transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Terminal className="w-4 h-4 text-[#10b981]" />
            <span>Open System Terminal</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 pt-4 border-t border-[#1b2b22] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8da396] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search botanical isolate, functional role, or origin..."
              className="w-full bg-[#080d0b] border border-[#1b2b22] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#8da396]/60 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#10b981] text-[#052e16] font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    : 'bg-[#080d0b] text-[#8da396] hover:text-white border border-[#1b2b22]'
                }`}
              >
                {cat === 'all' ? 'All Classes' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid: List & Selected Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Ingredient Cards List */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#8da396]">
            <span>{filtered.length} INGREDIENTS INDEXED</span>
            <span>SELECT TO VIEW RHEOLOGICAL PROFILE</span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filtered.map(item => {
              const isSelected = selectedIngredient?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedIngredient(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121d17] border-[#10b981] shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                      : 'bg-[#0c1410] border-[#1b2b22] hover:bg-[#0e1713]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{item.name}</span>
                        {item.cleanLabel && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                            CLEAN LABEL
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8da396] font-mono mt-0.5">
                        {item.category} &bull; Origin: {item.origin}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-[#10b981]">
                        ${item.estCostKg.toFixed(2)}/kg
                      </div>
                      <div className="text-[10px] font-mono text-[#8da396]">
                        {item.proteinContent}% Protein
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#8da396] mt-2 line-clamp-2 leading-relaxed">
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
            <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-5 shadow-xl sticky top-24 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1b2b22]">
                <div>
                  <span className="text-[10px] font-mono text-[#10b981] uppercase tracking-wider font-semibold">
                    {selectedIngredient.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">{selectedIngredient.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#080d0b] border border-[#1b2b22] flex items-center justify-center">
                  <FlaskConical className="w-5 h-5 text-[#10b981]" />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                  <div className="text-[10px] font-mono text-[#8da396]">Functional Property &amp; Mechanism</div>
                  <div className="text-white mt-1 leading-relaxed">{selectedIngredient.keyProperty}</div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                    <div className="text-[10px] font-mono text-[#8da396]">Protein Purity</div>
                    <div className="font-mono text-sm font-bold text-[#10b981] mt-0.5">
                      {selectedIngredient.proteinContent}%
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                    <div className="text-[10px] font-mono text-[#8da396]">Shear Suitability</div>
                    <div className="font-mono text-sm font-bold text-[#10b981] mt-0.5">
                      {selectedIngredient.shearSuitability}%
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                    <div className="text-[10px] font-mono text-[#8da396]">Gelling Transition</div>
                    <div className="font-mono text-xs font-bold text-white mt-0.5">
                      {selectedIngredient.gellingTemp}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                    <div className="text-[10px] font-mono text-[#8da396]">Estimated Cost</div>
                    <div className="font-mono text-sm font-bold text-white mt-0.5">
                      ${selectedIngredient.estCostKg.toFixed(2)} / kg
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#080d0b] border border-[#1b2b22]">
                  <div className="text-[10px] font-mono text-[#8da396] mb-1">Texturization Application</div>
                  <div className="text-xs text-[#dfe4e0] leading-relaxed">
                    Compatible with twin-screw extrusion barrels up to 160°C. Delivers anisotropic fiber alignment when blended with structural legumes.
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('formulate')}
                className="w-full py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-[#052e16] font-bold font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(16,185,129,0.2)] mt-1"
              >
                <span>Use in Formulation Workspace</span>
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#0c1410] border border-[#1b2b22] p-8 text-center text-xs text-[#8da396]">
              Select an ingredient to inspect its biochemical profile.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
