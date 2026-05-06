import {MultipleAnswer } from "../../../../types/answer";
import { MultipleChoiceEntity } from "../../../../types/questions";

interface MultipleTypeProps {
  q: MultipleChoiceEntity;
  value?: MultipleAnswer;
  onChange: (v: Array<number>) => void;
}
const MultipleType = (props: MultipleTypeProps) => {
  const { q, value, onChange } = props;
  
  
  const sel = value ?? [];
  
  const toggle = (id: number) => {
    const next = Array.from(sel);
    if (next.includes(id)) {
      next.splice(next.indexOf(id), 1);
    } else {
      next.push(id);
    }
    onChange(next);
  };
  
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-[#6b5e4a] italic mb-1">
        Select all that apply
      </p>
      {q.options.map((opt, i) => {
  
        const checked = sel?.includes(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 group ${
              checked
                ? "bg-[#c8a46e]/10 border-[#c8a46e]/50"
                : "bg-[#1e1810] border-[#2e2418] hover:border-[#3e3020] hover:bg-[#251e14]"
            }`}
          >
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                checked
                  ? "border-[#c8a46e] bg-[#c8a46e]"
                  : "border-[#4a3d2e] group-hover:border-[#6b5e4a]"
              }`}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4l3 3 5-6"
                    stroke="#13100d"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-sm font-medium leading-snug flex-1 ${checked ? "text-[#e8c898]" : "text-[#b8a88a]"}`}
            >
              {opt.value}
            </span>
            <span
              className={`shrink-0 w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                checked
                  ? "bg-[#c8a46e] text-[#13100d]"
                  : "bg-[#2a2418] text-[#5a4e3a]"
              }`}
            >
              {String.fromCharCode(65 + i)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MultipleType;
