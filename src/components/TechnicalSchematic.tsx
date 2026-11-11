import React from 'react';
import { CaseStudy } from '../data/portfolioData';

export const TechnicalSchematic: React.FC<{ type: CaseStudy['diagramType'] }> = ({ type }) => {
  return (
    <div className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4">
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
        <span>ENGINEERING PROCESS SCHEMATIC (NON-CONFIDENTIAL)</span>
        <span>SCALE: ILLUSTRATIVE</span>
      </div>
      <svg viewBox="0 0 480 180" className="w-full h-40 stroke-slate-300" fill="none">
        {type === 'bf-profile' && (
          <g>
            {/* Blast Furnace Profile & Cohesive Zone */}
            <path d="M190 15 L290 15 L310 95 L295 135 L295 165 L185 165 L185 135 L170 95 Z" stroke="#94A3B8" strokeWidth="2" fill="#0F172A" />
            {/* Cohesive W-zone */}
            <path d="M175 100 L215 70 L240 92 L265 70 L305 100" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 3" />
            {/* Tuyere arrows */}
            <path d="M145 135 L185 135" stroke="#EA580C" strokeWidth="2.5" />
            <path d="M335 135 L295 135" stroke="#EA580C" strokeWidth="2.5" />
            <text x="45" y="45" fill="#CBD5E1" fontSize="10" fontFamily="monospace">Top Gas Profile (η_CO)</text>
            <text x="45" y="100" fill="#F59E0B" fontSize="10" fontFamily="monospace">Cohesive Zone Control</text>
            <text x="340" y="138" fill="#EA580C" fontSize="10" fontFamily="monospace">Hot Blast + PCI</text>
          </g>
        )}

        {type === 'pci-loop' && (
          <g>
            <rect x="30" y="40" width="85" height="90" rx="6" stroke="#94A3B8" strokeWidth="2" fill="#0F172A" />
            <text x="44" y="82" fill="#F8FAFC" fontSize="10" fontFamily="monospace">Coal Mill</text>
            <text x="44" y="96" fill="#94A3B8" fontSize="9" fontFamily="monospace">200 Mesh</text>
            <path d="M115 85 L195 85" stroke="#F59E0B" strokeWidth="2" />
            <rect x="195" y="40" width="90" height="90" rx="6" stroke="#94A3B8" strokeWidth="2" fill="#0F172A" />
            <text x="207" y="82" fill="#F8FAFC" fontSize="10" fontFamily="monospace">Distributor</text>
            <text x="207" y="96" fill="#94A3B8" fontSize="9" fontFamily="monospace">Dense Phase</text>
            <path d="M285 60 L370 40" stroke="#EA580C" strokeWidth="1.8" />
            <path d="M285 85 L370 85" stroke="#EA580C" strokeWidth="1.8" />
            <path d="M285 110 L370 130" stroke="#EA580C" strokeWidth="1.8" />
            <text x="378" y="44" fill="#F59E0B" fontSize="10" fontFamily="monospace">Tuyere 1..N</text>
            <text x="378" y="88" fill="#F59E0B" fontSize="10" fontFamily="monospace">Auto-Purge</text>
            <text x="378" y="133" fill="#F59E0B" fontSize="10" fontFamily="monospace">Lance Tip</text>
          </g>
        )}

        {type === 'hearth-thermal' && (
          <g>
            <rect x="130" y="25" width="220" height="125" stroke="#94A3B8" strokeWidth="3" fill="#0F172A" />
            {/* Deadman Coke */}
            <ellipse cx="240" cy="78" rx="65" ry="28" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="200" y="81" fill="#CBD5E1" fontSize="10" fontFamily="monospace">Permeable Deadman</text>
            {/* Molten Bath */}
            <line x1="133" y1="115" x2="347" y2="115" stroke="#F59E0B" strokeWidth="2" />
            {/* Tap-hole mushroom */}
            <path d="M350 110 L322 100 L322 128 L350 120 Z" fill="#D97706" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="358" y="118" fill="#F59E0B" fontSize="10" fontFamily="monospace">Tap-Hole Clay</text>
            <text x="150" y="140" fill="#94A3B8" fontSize="10" fontFamily="monospace">Carbon Block &amp; Stave Cooling</text>
          </g>
        )}

        {type === 'pcm-chain' && (
          <g>
            <circle cx="85" cy="95" r="32" stroke="#94A3B8" strokeWidth="2.5" fill="#0F172A" />
            <circle cx="385" cy="75" r="32" stroke="#94A3B8" strokeWidth="2.5" fill="#0F172A" />
            <line x1="85" y1="63" x2="385" y2="43" stroke="#F59E0B" strokeWidth="2.5" />
            <line x1="85" y1="127" x2="385" y2="107" stroke="#64748B" strokeWidth="2" strokeDasharray="5 4" />
            <text x="55" y="152" fill="#CBD5E1" fontSize="10" fontFamily="monospace">Pouring End</text>
            <text x="190" y="38" fill="#F59E0B" fontSize="10" fontFamily="monospace">Mould Strand &amp; Water Sprays</text>
            <text x="345" y="132" fill="#CBD5E1" fontSize="10" fontFamily="monospace">Head Sprocket</text>
          </g>
        )}

        {(type === 'reliability-curve' || type === 'crane-girder' || type === 'shutdown-gantt' || type === 'heat-balance') && (
          <g>
            <line x1="50" y1="145" x2="430" y2="145" stroke="#64748B" strokeWidth="1.5" />
            <line x1="50" y1="25" x2="50" y2="145" stroke="#64748B" strokeWidth="1.5" />
            <path d="M60 120 Q 160 110, 240 70 T 410 38" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
            <circle cx="150" cy="105" r="4" fill="#F59E0B" />
            <circle cx="265" cy="62" r="4" fill="#F59E0B" />
            <circle cx="390" cy="41" r="4" fill="#10B981" />
            <text x="70" y="45" fill="#F8FAFC" fontSize="10" fontFamily="monospace">
              Reliability / Thermal Efficiency Trajectory
            </text>
            <text x="275" y="82" fill="#94A3B8" fontSize="10" fontFamily="monospace">
              Preventive &amp; Process Control Intervention
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
