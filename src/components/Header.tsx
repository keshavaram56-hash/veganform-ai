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
  Leaf
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5EAE7] transition-colors">
      <div className="h-16 px-4 sm:px-6 max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Context */}
        <div className="flex items-center gap-3 min-w-0">
          {showBack && (
            <button
              onClick={() => onNavigate('candidates')}
              aria-label="Navigate back"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-[#66716B] hover:text-[#17201C] hover:bg-[#F3F6F4] border border-[#E5EAE7] transition-all shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {/* VeganForm AI Platform Logo */}
          <div
            onClick={() => onNavigate('product')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
            title="VeganForm AI — Computational Food R&D Platform"
          >
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center relative shadow-sm group-hover:border-[#059669] transition-all">
              <Leaf className="w-4 h-4 text-[#059669]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-semibold text-[15px] tracking-tight text-[#17201C] leading-none">
                <span>VeganForm</span>
                <span className="text-[#059669] font-medium text-xs bg-[#ECFDF5] px-1.5 py-0.5 rounded border border-[#A7F3D0]/60">AI</span>
              </div>
              <span className="text-[10px] text-[#66716B] tracking-wider uppercase leading-tight font-medium mt-0.5">
                Computational Food R&amp;D
              </span>
            </div>
          </div>

          {/* Section Breadcrumb Context Badge (Desktop) */}
          {titleContext && (
            <div className="hidden md:flex items-center pl-3 border-l border-[#E5EAE7]">
              <span className="px-2 py-0.5 rounded-md bg-[#F8FAF9] text-[#66716B] text-[11px] font-medium border border-[#E5EAE7] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                {titleContext}
              </span>
            </div>
          )}
        </div>

        {/* Center / Right Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center bg-[#F8FAF9] p-1 rounded-xl border border-[#E5EAE7] text-xs">
            <button
              onClick={() => onNavigate('product')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'product'
                  ? 'bg-white text-[#059669] font-semibold shadow-xs border border-[#E5EAE7]'
                  : 'text-[#66716B] hover:text-[#17201C]'
              }`}
            >
              <span>Overview</span>
            </button>

            <button
              onClick={() => onNavigate('formulate')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'formulate'
                  ? 'bg-white text-[#059669] font-semibold shadow-xs border border-[#E5EAE7]'
                  : 'text-[#66716B] hover:text-[#17201C]'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </button>

            <button
              onClick={() => onNavigate('candidates')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'candidates' || currentTab === 'detail'
                  ? 'bg-white text-[#059669] font-semibold shadow-xs border border-[#E5EAE7]'
                  : 'text-[#66716B] hover:text-[#17201C]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => onNavigate('knowledge')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'knowledge'
                  ? 'bg-white text-[#059669] font-semibold shadow-xs border border-[#E5EAE7]'
                  : 'text-[#66716B] hover:text-[#17201C]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Botanical Library</span>
            </button>
          </nav>

          {/* Interactive Demo Mode Toggle CTA Button */}
          <button
            onClick={() => onToggleDemo ? onToggleDemo() : onNavigate('demo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
              isDemoMode
                ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#92400E] shadow-xs'
                : 'bg-[#F0FDF4] hover:bg-[#DCFCE7] border-[#BBF7D0] text-[#059669] shadow-xs'
            }`}
            title={isDemoMode ? 'Click to exit Demo Mode' : 'Activate offline demonstration mode'}
          >
            {isDemoMode ? (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                <span>Demo Active</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-[#059669]" />
                <span className="hidden sm:inline">Try Demo</span>
                <span className="sm:hidden">Demo</span>
              </>
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search formulations & ingredients"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#66716B] hover:text-[#17201C] hover:bg-[#F3F6F4] border border-[#E5EAE7] transition-colors cursor-pointer bg-white"
            title="Search formulations & ingredients (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Diagnostics / Engine Telemetry */}
          <button
            onClick={onOpenTerminal}
            aria-label="Engine diagnostics"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#66716B] hover:text-[#17201C] hover:bg-[#F3F6F4] border border-[#E5EAE7] transition-colors cursor-pointer bg-white"
            title="R&D Engine Telemetry & Diagnostics"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
