import React from 'react';

const SNOWFLAKES = [
  { id: 1, left: '4%', size: 6, duration: '14s', delay: '0s' },
  { id: 2, left: '12%', size: 9, duration: '18s', delay: '2.5s' },
  { id: 3, left: '21%', size: 5, duration: '13s', delay: '4s' },
  { id: 4, left: '32%', size: 8, duration: '16s', delay: '1.2s' },
  { id: 5, left: '44%', size: 6, duration: '19s', delay: '5.5s' },
  { id: 6, left: '56%', size: 10, duration: '15s', delay: '0.7s' },
  { id: 7, left: '67%', size: 5, duration: '17s', delay: '3.1s' },
  { id: 8, left: '76%', size: 8, duration: '14.5s', delay: '6.2s' },
  { id: 9, left: '86%', size: 7, duration: '16.5s', delay: '1.8s' },
  { id: 10, left: '94%', size: 6, duration: '13.5s', delay: '4.4s' },
];

export const GoldenBellSvg: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    {/* Laço Vermelho Natalino no topo */}
    <path
      d="M22 12C16 6 10 10 14 16C18 20 26 16 32 14C38 16 46 20 50 16C54 10 48 6 42 12L32 14L22 12Z"
      fill="#C81E2B"
      stroke="#8A111A"
      strokeWidth="1.5"
    />
    {/* Corpo do Sino Dourado */}
    <path
      d="M32 14C21 14 16 23 15 35C14 43 10 47 8 49H56C54 47 50 43 49 35C48 23 43 14 32 14Z"
      fill="url(#bellGoldGrad)"
      stroke="#8F6B20"
      strokeWidth="1.5"
    />
    {/* Brilho lateral */}
    <path
      d="M23 22C20 26 19 33 18 39"
      stroke="#FFF7D6"
      strokeWidth="2.5"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Badalo do Sino */}
    <circle cx="32" cy="52" r="5" fill="#B8892E" stroke="#785713" strokeWidth="1.5" />
    <defs>
      <linearGradient id="bellGoldGrad" x1="16" y1="14" x2="48" y2="50" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF0B8" />
        <stop offset="45%" stopColor="#E5B94E" />
        <stop offset="100%" stopColor="#9E731B" />
      </linearGradient>
    </defs>
  </svg>
);

export const FestiveBackdrop: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Flocos de neve suaves em movimento contínuo */}
      {SNOWFLAKES.map((flake) => (
        <div
          key={flake.id}
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animation: `snowFall ${flake.duration} linear ${flake.delay} infinite`,
          }}
          className="absolute -top-6 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
      ))}
    </div>
  );
};
