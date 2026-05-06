import { SingleChoiceEntity } from "../../../../types/questions";

interface Props {
  question: SingleChoiceEntity;
  value: number; 
  onChange: (i: number) => void
}
export default function SingleType(props: Props) {
  const { question, value, onChange } = props;
  
  return (
    <div className="flex flex-col gap-3">
      {question.options.map((opt, i) => {
        const sel = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 group ${
              sel
                ? "bg-[#c8a46e]/12 border-[#c8a46e]/50 shadow-sm shadow-[#c8a46e]/10"
                : "bg-[#1e1810] border-[#2e2418] hover:border-[#3e3020] hover:bg-[#251e14]"
            }`}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
              sel ? "border-[#c8a46e] bg-[#c8a46e]" : "border-[#4a3d2e] group-hover:border-[#6b5e4a]"
            }`}>
              {sel && <div className="w-2 h-2 rounded-full bg-[#13100d]" />}
            </div>
            <span className={`text-sm font-medium leading-snug ${sel ? "text-[#e8c898]" : "text-[#b8a88a]"}`}>{opt.value}</span>
            <span className={`ml-auto shrink-0 w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
              sel ? "bg-[#c8a46e] text-[#13100d]" : "bg-[#2a2418] text-[#5a4e3a]"
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
