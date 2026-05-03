import { HotSpotEntity } from "../../../types/questions";

interface HotspotProps {
  q: HotSpotEntity;
  value?: { x: number; y: number } | null;
  onChange: (v: { x: number; y: number }) => void;
}

export default function HotSpotType(props: HotspotProps) {
  const { q, value, onChange } = props;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    onChange({ x, y });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2.5 px-4 py-3 bg-[#1e1810] border border-[#2e2418] rounded-xl">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
          <circle cx="8" cy="8" r="7" stroke="#c8a46e" strokeWidth="1.4" />
          <path d="M8 7v5M8 5v1" stroke="#c8a46e" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <p className="text-xs text-[#9a8668] leading-relaxed">{q.hint}</p>
      </div>

      {/* Map SVG */}
      <div className="relative rounded-2xl overflow-hidden border border-[#2e2418] bg-[#1a1510]">
        <svg
          viewBox="0 0 400 280"
          className="w-full cursor-crosshair select-none"
          onClick={handleClick}
        >
          {/* Background gradient - map feel */}
          <defs>
            <radialGradient id="mapbg" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1e1c16" />
              <stop offset="100%" stopColor="#0f0e0a" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width="400" height="280" fill="url(#mapbg)" />

          {/* Stylized land masses (Israel / Levant region) */}
          <path d="M180 30 Q200 20 230 35 Q260 50 270 80 Q280 110 260 140 Q250 160 240 180 Q230 200 235 220 Q240 240 220 255 Q200 265 185 250 Q170 240 175 220 Q175 200 165 180 Q150 155 140 130 Q130 100 145 70 Q155 45 180 30Z" fill="#2a2820" stroke="#3a3628" strokeWidth="0.5" />
          {/* Sea of Galilee */}
          <ellipse cx="248" cy="96" rx="16" ry="22" fill="#1a2535" stroke="#2a3848" strokeWidth="0.8" />
          <text x="248" y="96" textAnchor="middle" dominantBaseline="middle" fill="#4a6888" fontSize="6" fontWeight="500">Sea of</text>
          <text x="248" y="103" textAnchor="middle" dominantBaseline="middle" fill="#4a6888" fontSize="6" fontWeight="500">Galilee</text>
          {/* Dead Sea */}
          <ellipse cx="225" cy="195" rx="10" ry="20" fill="#1a2535" stroke="#2a3848" strokeWidth="0.8" />
          <text x="225" y="195" textAnchor="middle" dominantBaseline="middle" fill="#4a6888" fontSize="5">Dead Sea</text>
          {/* Mediterranean */}
          <rect x="0" y="0" width="145" height="280" fill="#131d2a" />
          <text x="72" y="140" textAnchor="middle" fill="#1e3a52" fontSize="9" fontStyle="italic">Mediterranean</text>
          <text x="72" y="152" textAnchor="middle" fill="#1e3a52" fontSize="9" fontStyle="italic">Sea</text>
          {/* Grid lines */}
          {[60,120,180,240,300,360].map(x => <line key={x} x1={x} y1="0" x2={x} y2="280" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="0.5" />)}
          {[56,112,168,224].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#ffffff" strokeOpacity="0.03" strokeWidth="0.5" />)}

          {/* City labels */}
          <circle cx="235" cy="190" r="2" fill="#5a6878" />
          <text x="241" y="193" fill="#5a6878" fontSize="7">Jerusalem</text>
          <circle cx="230" cy="115" r="2" fill="#5a6878" />
          <text x="236" y="118" fill="#5a6878" fontSize="7">Nazareth</text>

          {/* Hotspot target zones (invisible hit areas, visible as subtle markers) */}
          {q.hotSpots.map((spot, i) => (
            <g key={i}>
              <circle cx={40 * 4} cy={40 * 2.8} r="18" fill="transparent" />
              <circle cx={40 * 4} cy={40 * 2.8} r="4" fill="#c8a46e" fillOpacity="0.15" stroke="#c8a46e" strokeOpacity="0.25" strokeWidth="0.8" />
            </g>
          ))}

          {/* User click */}
          {value && (
            <g filter="url(#glow)">
              <circle cx={value.x * 4} cy={value.y * 2.8} r="14" fill="#c8a46e" fillOpacity="0.15" stroke="#c8a46e" strokeOpacity="0.5" strokeWidth="1" />
              <circle cx={value.x * 4} cy={value.y * 2.8} r="5" fill="#c8a46e" />
              <line x1={value.x * 4} y1={(value.y * 2.8) - 16} x2={value.x * 4} y2={(value.y * 2.8) - 8} stroke="#c8a46e" strokeWidth="1.5" strokeLinecap="round" />
              <line x1={value.x * 4} y1={(value.y * 2.8) + 8} x2={value.x * 4} y2={(value.y * 2.8) + 16} stroke="#c8a46e" strokeWidth="1.5" strokeLinecap="round" />
              <line x1={(value.x * 4) - 16} y1={value.y * 2.8} x2={(value.x * 4) - 8} y2={value.y * 2.8} stroke="#c8a46e" strokeWidth="1.5" strokeLinecap="round" />
              <line x1={(value.x * 4) + 8} y1={value.y * 2.8} x2={(value.x * 4) + 16} y2={value.y * 2.8} stroke="#c8a46e" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          )}

          {/* Compass */}
          <g transform="translate(370, 240)">
            <circle cx="0" cy="0" r="16" fill="#1a1810" stroke="#2e2418" strokeWidth="1" />
            <text x="0" y="-8" textAnchor="middle" fill="#c8a46e" fontSize="7" fontWeight="700">N</text>
            <path d="M0 -5 L2.5 3 L0 1 L-2.5 3Z" fill="#c8a46e" fillOpacity="0.7" />
          </g>
        </svg>

        {value && (
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-[#13100d]/80 backdrop-blur-sm border border-[#c8a46e]/20 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 rounded-full bg-[#c8a46e]" />
            <span className="text-xs text-[#c8a46e] font-medium">Point selected ({value.x}%, {value.y}%)</span>
          </div>
        )}
      </div>
    </div>
  );
}