import React from 'react';
import { TabType } from '../types/formulation';
import {
  FlaskConical,
  Layers,
  BookOpen,
  Search,
  Terminal,
  Sparkles,
  ArrowLeft,
  Play,
  CheckCircle2,
  Atom
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenTerminal: () => void;
  titleContext?: string;
  subtitleContext?: string;
  showBack?: boolean;
  isDemoMode?: boolean;
  onToggleDemo?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenTerminal,
  titleContext,
  subtitleContext,
  showBack = false,
  isDemoMode = false,
  onToggleDemo
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#090e0c]/90 backdrop-blur-xl border-b border-[#1b2b22] transition-colors">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Context */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <button
              onClick={() => onNavigate('candidates')}
              aria-label="Navigate back"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#8da396] hover:text-[#10b981] hover:bg-[#121c17] border border-[#1b2b22] transition-all shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* VeganForm AI Platform Logo */}
          <div
            onClick={() => onNavigate('product')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
            title="VeganForm AI - Computational Food R&D Platform"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0e1713] border border-[#10b981]/40 flex items-center justify-center relative shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-[#10b981] transition-all">
              <Atom className="w-4 h-4 text-[#10b981] animate-spin-slow" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-bold text-sm tracking-tight text-white leading-none">
                <span>VeganForm</span>
                <span className="text-[#10b981] font-mono text-xs">AI</span>
              </div>
              <span className="font-mono text-[9px] text-[#8da396] tracking-[0.14em] uppercase leading-tight font-medium mt-0.5">
                COMPUTATIONAL FOOD R&amp;D
              </span>
            </div>
          </div>

          {/* Section Breadcrumb Context Badge (Desktop) */}
          <div className="hidden md:flex items-center pl-3 border-l border-[#1b2b22]">
            <span className="px-2 py-0.5 rounded-md bg-[#121c17] text-[#10b981] font-mono text-[10px] tracking-wider border border-[#10b981]/25 font-semibold uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              {titleContext || 'R&D SUITE'}
            </span>
          </div>
        </div>

        {/* Center / Right Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center bg-[#0e1612] p-1 rounded-xl border border-[#1b2b22] text-xs font-mono">
            <button
              onClick={() => onNavigate('product')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'product'
                  ? 'bg-[#18261f] text-[#10b981] font-semibold border border-[#10b981]/30 shadow-sm'
                  : 'text-[#8da396] hover:text-white'
              }`}
            >
              <span>Overview</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'formulate'
                  ? 'bg-[#18261f] text-[#10b981] font-semibold border border-[#10b981]/30 shadow-sm'
                  : 'text-[#8da396] hover:text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => onNavigate('candidates')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'candidates' || currentTab === 'detail'
                  ? 'bg-[#18261f] text-[#10b981] font-semibold border border-[#10b981]/30 shadow-sm'
                  : 'text-[#8da396] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'knowledge'
                  ? 'bg-[#18261f] text-[#10b981] font-semibold border border-[#10b981]/30 shadow-sm'
                  : 'text-[#8da396] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Botanical Library</span>
            </button>
          </nav>

          {/* Interactive Demo Mode Toggle CTA Button */}
          <button
            onClick={() => onToggleDemo ? onToggleDemo() : onNavigate('demo')}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
              isDemoMode
                ? 'bg-amber-950/70 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                : 'bg-[#14231b] hover:bg-[#182d22] border-[#10b981]/40 text-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.15)]'
            }`}
            title={isDemoMode ? 'Click to exit Demo Mode' : 'Activate offline deterministic demonstration mode'}
          >
            {isDemoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                <span>DEMO MODE ACTIVE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-[#10b981]" />
                <span className="hidden sm:inline">Interactive Demo</span>
                <span className="sm:hidden">Demo</span>
              </>
            )}
          </button>

          {/* Telemetry Search Modal Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Diagnostic search"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#8da396] hover:text-[#10b981] hover:bg-[#121c17] border border-[#1b2b22] transition-colors cursor-pointer"
            title="Search formulations & ingredients"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Laboratory System Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            aria-label="Laboratory system terminal"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#8da396] hover:text-[#10b981] hover:bg-[#121c17] border border-[#1b2b22] transition-colors cursor-pointer"
            title="Open In-Silico Synthesis Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
