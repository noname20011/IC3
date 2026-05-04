import { useState } from "react";
import { TrueFalseEntity } from "../../../../types/questions";
import { X } from "lucide-react";

interface TrueFalseQuestionProps {
  q: TrueFalseEntity;
  value?: Record<number, "true" | "false">;
  onChange: (v: Record<number, "true" | "false">) => void;
}

export default function TrueFalse(props: TrueFalseQuestionProps) {
  const { q, value, onChange } = props;
  const ans  = value ?? {};

  const set = (i: number, v: "true" | "false") => {
    const newAns = { ...ans, [i]: v };
    onChange(newAns);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-[#2e2418]">
      {/* Header */}
      <div className="grid grid-cols-[1fr_88px_88px] bg-[#1a1510] border-b border-[#2e2418] px-5 py-3">
        <span className="text-xs font-semibold text-[#6b5e4a] uppercase tracking-widest">
          Statement
        </span>
        {q.optionsOfTrueFalseType?.map((opt, i) => (
          <span
          key={i}
            className={`text-[12px] font-semibold ${i === 0 ? "text-emerald-400" : "text-red-400"} uppercase tracking-widest text-center`}
          >
            {opt}
          </span>
        ))}
      </div>
      {q.statements.map((row, i) => {
        const chosen = ans[row.id];
        return (
          <div
            key={i}
            className={`grid grid-cols-[1fr_88px_88px] items-center px-5 py-4 border-b border-[#1e1810] last:border-0 transition-colors ${chosen ? "bg-[#1e1810]" : "bg-[#17140e]"}`}
          >
            <p className="text-sm text-[#c8a88a] leading-relaxed pr-4">
              {row.value}
            </p>
            {/* True */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => set(row.id, "true")}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  chosen === "true"
                    ? "border-emerald-400 bg-emerald-400/20 shadow-sm shadow-emerald-400/20"
                    : "border-[#3a3028] hover:border-emerald-400/50"
                }`}
              >
                {chosen === "true" && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5l3.5 3.5 6.5-8"
                      stroke="#34d399"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* False */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => set(row.id, "false")}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  chosen === "false"
                    ? "border-red-400 bg-red-400/20 shadow-sm shadow-red-400/20"
                    : "border-[#3a3028] hover:border-red-400/50"
                }`}
              >
                {chosen === "false" && <X size={12} className="text-red-400" />}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
