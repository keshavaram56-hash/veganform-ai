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
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/85 backdrop-blur-md border-t border-[#D9E2DC]/80 px-2 py-1 shadow-[0_-2px_12px_rgba(247,221,227,0.22)]">
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
                  ? 'text-[#D99A32] font-semibold'
                  : isActive
                  ? 'text-[#063B2E] font-semibold'
                  : 'text-[#61706A] hover:text-[#10231D]'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-105 text-[#0A9F6E]' : ''}`} />
              <span className="text-[10px] tracking-tight truncate font-medium">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#35D39A] absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
