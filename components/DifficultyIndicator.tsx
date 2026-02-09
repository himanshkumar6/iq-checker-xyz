import React from 'react';

interface DifficultyIndicatorProps {
  level: number;
}

const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ level }) => {
  const safeLevel = Math.max(1, Math.min(3, Math.round(level || 1))) as 1 | 2 | 3;

  const complexityText =
    safeLevel === 1 ? 'basic' :
      safeLevel === 2 ? 'moderate' :
        'high';

  return (
    <div
      className="group relative flex items-center gap-1.5 cursor-help"
      aria-label={`Question complexity level ${safeLevel} out of 3`}
    >
      {[1, 2, 3].map((dot) => (
        <div
          key={dot}
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${dot <= safeLevel
            ? 'bg-blue-500/50'
            : 'bg-slate-800'
            }`}
        />
      ))}

      {/* Desktop Only Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-800 text-slate-50 text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl border border-slate-700 hidden md:block">
        This question uses <span className="text-blue-400">{complexityText}</span> logical complexity.
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
      </div>
    </div>
  );
};

export default DifficultyIndicator;
