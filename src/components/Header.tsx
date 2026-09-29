import React from 'react';
import { TabType } from '../types/formulation';
import {
  FlaskConical,
  Layers,
  BookOpen,
  Search,
  Activity,
  ArrowLeft,
  Play,
  Dna,
  CheckCircle2
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
  showBack = false,
  isDemoMode = false,
  onToggleDemo
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/85 backdrop-blur-md border-b border-[#D9E2DC]/80 shadow-[0_1px_10px_rgba(232,213,196,0.18)] transition-colors">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Laboratory Telemetry */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <button
              onClick={() => onNavigate('candidates')}
              aria-label="Navigate back"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#61706A] hover:text-[#10231D] hover:bg-[#EEF3ED] border border-[#D9E2DC] transition-all shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* Stitch Brand Logo */}
          <div
            onClick={() => onNavigate('product')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
            title="VeganForm AI — Computational Food R&D Platform"
          >
            <div className="w-9 h-9 rounded-xl bg-[#063B2E] flex items-center justify-center relative shadow-xs group-hover:scale-102 transition-transform">
              <Dna className="w-4.5 h-4.5 text-[#35D39A]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#35D39A] ring-2 ring-white" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-display font-bold text-[15px] tracking-tight text-[#10231D] leading-none">
                <span>VeganForm</span>
                <span className="text-[10px] font-mono font-semibold text-[#063B2E] bg-[#EEF3ED] px-1.5 py-0.5 rounded border border-[#D9E2DC]">
                  AI
                </span>
              </div>
              <span className="text-[9px] font-mono tracking-widest text-[#61706A] uppercase leading-tight font-medium mt-1">
                FOOD R&amp;D AGENT v2.4
              </span>
            </div>
          </div>

          {/* Laboratory Status Pill (Desktop) */}
          <div className="hidden xl:flex items-center pl-3 border-l border-[#D9E2DC]">
            <span className="px-2.5 py-1 rounded-full bg-[#EEF3ED] text-[#063B2E] text-[10px] font-mono font-medium border border-[#D9E2DC] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A9F6E] animate-pulse" />
              <span>CUDA-BIO ONLINE // 42ms</span>
            </span>
          </div>

          {/* Section Breadcrumb Context Badge (Desktop) */}
          {titleContext && (
            <div className="hidden md:flex items-center pl-3 border-l border-[#D9E2DC]">
              <span className="px-2.5 py-0.5 rounded-lg bg-[#EEF3ED] text-[#61706A] text-[11px] font-mono font-medium border border-[#D9E2DC] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#063B2E]" />
                {titleContext}
              </span>
            </div>
          )}
        </div>

        {/* Center / Right Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center bg-[#EEF3ED] p-1 rounded-xl border border-[#D9E2DC] text-xs font-medium">
            <button
              onClick={() => onNavigate('product')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'product'
                  ? 'bg-white text-[#063B2E] font-semibold shadow-xs border border-[#D9E2DC]'
                  : 'text-[#61706A] hover:text-[#10231D]'
              }`}
            >
              <span>Overview</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'formulate'
                  ? 'bg-white text-[#063B2E] font-semibold shadow-xs border border-[#D9E2DC]'
                  : 'text-[#61706A] hover:text-[#10231D]'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#0A9F6E]" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => onNavigate('candidates')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'candidates' || currentTab === 'detail'
                  ? 'bg-white text-[#063B2E] font-semibold shadow-xs border border-[#D9E2DC]'
                  : 'text-[#61706A] hover:text-[#10231D]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#0A9F6E]" />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'knowledge'
                  ? 'bg-white text-[#063B2E] font-semibold shadow-xs border border-[#D9E2DC]'
                  : 'text-[#61706A] hover:text-[#10231D]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#0A9F6E]" />
              <span>Botanical Library</span>
            </button>
          </nav>

          {/* Interactive Demo Mode Toggle CTA Button */}
          <button
            onClick={() => onToggleDemo ? onToggleDemo() : onNavigate('demo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              isDemoMode
                ? 'bg-[#D99A32]/15 border-[#D99A32]/40 text-[#92400e] shadow-xs'
                : 'bg-[#EEF3ED] hover:bg-[#D9E2DC] border-[#D9E2DC] text-[#063B2E] shadow-xs'
            }`}
            title={isDemoMode ? 'Click to exit Demo Mode' : 'Activate offline demonstration mode'}
          >
            {isDemoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#D99A32] animate-pulse shrink-0" />
                <span className="font-semibold">Demo Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-[#063B2E] text-[#063B2E]" />
                <span className="hidden sm:inline font-semibold">Try Demo</span>
                <span className="sm:hidden font-semibold">Demo</span>
              </>
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search formulations & ingredients"
            className="h-8 px-2.5 flex items-center gap-1.5 rounded-xl text-[#61706A] hover:text-[#10231D] hover:bg-[#EEF3ED] border border-[#D9E2DC] transition-colors cursor-pointer bg-white"
            title="Search formulations & ingredients (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="hidden sm:inline font-mono text-[9px] text-[#61706A] bg-[#EEF3ED] px-1.5 py-0.5 rounded border border-[#D9E2DC]">
              ⌘K
            </kbd>
          </button>

          {/* Diagnostics / Engine Telemetry */}
          <button
            onClick={onOpenTerminal}
            aria-label="Engine diagnostics"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-[#61706A] hover:text-[#10231D] hover:bg-[#EEF3ED] border border-[#D9E2DC] transition-colors cursor-pointer bg-white"
            title="R&D Engine Telemetry & Diagnostics"
          >
            <Activity className="w-3.5 h-3.5 text-[#0A9F6E]" />
          </button>
        </div>
      </div>
    </header>
  );
};

