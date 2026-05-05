import { MultipleChoiceEntity } from "../../../../types/questions";
import { X } from "lucide-react";
import { MultipleAnswer } from "../../../../types/answer";

interface MultiTypeReviewProps {
  question: MultipleChoiceEntity;
  correctSet: Set<number>;
  userIdxs: MultipleAnswer | Set<number>;
}
const MultiTypeReview = (props: MultiTypeReviewProps) => {
  const { question, correctSet, userIdxs } = props;
  
  return (
    <div className="flex flex-col gap-2 mt-3">
      {question.options.map((opt, i) => {
        const isCorrect = correctSet?.has(opt.id);
        const isSelected = new Set(userIdxs)?.has(opt.id);
        const isWrong = isSelected && !isCorrect;
        const isMissed = !isSelected && isCorrect;
        return (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
              isCorrect && isSelected
                ? "bg-emerald-400/8 border-emerald-400/25"
                : isWrong
                  ? "bg-red-400/8 border-red-400/20"
                  : isMissed
                    ? "bg-emerald-400/5 border-emerald-400/15 border-dashed"
                    : "bg-[#1e1810] border-[#2a2418]"
            }`}
          >
            <div className="w-5 shrink-0 flex items-center justify-center">
              {isCorrect ? (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path
                    d="M1 5.5L5 9.5L13 1.5"
                    stroke="#34d399"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : isWrong ? (
                <X size={13} className="text-red-400" />
              ) : (
                <span />
              )}
            </div>
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                isCorrect && isSelected
                  ? "border-emerald-400 bg-emerald-400/20"
                  : isWrong
                    ? "border-red-400 bg-red-400/20"
                    : isMissed
                      ? "border-emerald-400/40"
                      : "border-[#3a3020]"
              }`}
            >
              {isSelected && (
                <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                  <path
                    d="M1 3.5L3 5.5L7 1.5"
                    stroke={isWrong ? "#f87171" : "#34d399"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span
              className={`text-sm leading-snug flex-1 ${
                isCorrect && isSelected
                  ? "text-emerald-300 font-medium"
                  : isWrong
                    ? "text-red-300"
                    : isMissed
                      ? "text-emerald-400/70"
                      : "text-[#6b5e4a]"
              }`}
            >
              {opt.value}
            </span>
            {isMissed && (
              <span className="text-[10px] text-emerald-400/70 font-medium shrink-0">
                Missed
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MultiTypeReview;
