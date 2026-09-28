import React from 'react';
import { TabType } from '../types/formulation';
import { Compass, FlaskConical, Layers, BookOpen, PlayCircle } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  isDemoMode?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onNavigate, isDemoMode = false }) => {
  const items: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'product', label: 'Overview', icon: Compass },
    { id: 'formulate', label: 'Workspace', icon: FlaskConical },
    { id: 'candidates', label: 'Candidates', icon: Layers },
    { id: 'knowledge', label: 'Library', icon: BookOpen },
    { id: 'demo', label: isDemoMode ? 'Demo On' : 'Demo', icon: PlayCircle },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#090e0c]/95 backdrop-blur-xl border-t border-[#1b2b22] px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">
      <div className="flex justify-around items-center h-14 max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id || (item.id === 'candidates' && currentTab === 'detail');
          const isDemoItem = item.id === 'demo';

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-14 h-12 gap-1 transition-all relative cursor-pointer ${
                isDemoItem && isDemoMode
                  ? 'text-amber-400 font-semibold'
                  : isActive
                  ? 'text-[#10b981] font-semibold'
                  : 'text-[#8da396] hover:text-[#dfe4e0]'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : ''}`} />
              <span className="font-mono text-[9px] tracking-tight truncate">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#10b981] absolute bottom-0.5 shadow-[0_0_6px_#10b981]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
