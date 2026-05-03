import { SingleChoiceEntity } from "../../../../types/questions";
import { X } from "lucide-react";

interface SingleTypeReviewProps {
  question: SingleChoiceEntity;
  userIdx: number | undefined;
}

const SingleTypeReview = (props: SingleTypeReviewProps) => {
  const { question, userIdx } = props;

  return (
    <div className="flex flex-col gap-2 mt-3">
      {question.options.map((opt) => {
        const isCorrect = opt.isCorrect;
        const isSelected = userIdx === opt.id;
        const isWrong = isSelected && !isCorrect;
        return (
          <div
            key={opt.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
              isCorrect
                ? "bg-emerald-400/8 border-emerald-400/25"
                : isWrong
                  ? "bg-red-400/8 border-red-400/20"
                  : "bg-[#1e1810] border-[#2a2418]"
            }`}
          >
            {/* Correct ✓ indicator */}
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
            {/* Radio circle */}
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isCorrect
                  ? "border-emerald-400"
                  : isSelected
                    ? "border-red-400"
                    : "border-[#3a3020]"
              }`}
            >
              {isSelected && (
                <div
                  className={`w-2 h-2 rounded-full ${isCorrect ? "bg-emerald-400" : "bg-red-400"}`}
                />
              )}
            </div>
            <span
              className={`text-sm leading-snug flex-1 ${
                isCorrect
                  ? "text-emerald-300 font-medium"
                  : isWrong
                    ? "text-red-300"
                    : "text-[#6b5e4a]"
              }`}
            >
              {opt.value}
            </span>
            {isCorrect && !isSelected && (
              <span className="text-[10px] text-emerald-400 font-semibold shrink-0">
                Correct answer
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SingleTypeReview;
