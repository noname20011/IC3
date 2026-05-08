import { X } from "lucide-react";
import { MatchAnswer } from "../../../../types/answer";
import { MatchEntity } from "../../../../types/questions";

interface MatchTypeReviewProps {
  question: MatchEntity;
  user: MatchAnswer;
}

const MatchTypeReview = (props: MatchTypeReviewProps) => {
  const { question, user } = props;
  return (
    <div className="flex flex-col gap-2 mt-3">
      {question.pairs.filter(pair => pair.isCorrect).map((pair, i) => {
        const leftItem = pair.right.value || pair.right.imageUrl;
        
        const userMatch = user?.[i]?.[leftItem!];
        const correctMatch = pair.left.value;
        const isCorrect = userMatch === correctMatch;
        
        return (
          <div
            
            key={i}
            className={`flex flex-col gap-2 px-4 py-3 rounded-xl border ${isCorrect ? "bg-emerald-400/6 border-emerald-400/20" : "bg-red-400/5 border-red-400/15"}`}
          >
            {/* Left badge */}
            <div className="flex items-center gap-2">
              <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border shrink-0 ${isCorrect ? "bg-emerald-400 text-[#0f0d0a] border-transparent" : "bg-red-400/15 text-red-400 border-red-400/30"}`}
            >
              {i + 1}
            </div>
            {leftItem?.includes("cloudinary.com") ?
            <img src={leftItem} className="max-h-24"/>
            : <span className="text-sm text-[#7a6b55] min-w-[90px]">{leftItem}</span>
            }
            </div>
            <div className="flex items-center gap-2">
              <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M0 5h12M9 1l4 4-4 4"
                stroke={isCorrect ? "#34d399" : "#f87171"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${isCorrect ? "bg-emerald-400/10" : "bg-red-400/10"}`}
              >
                <span
                  className={`text-xs font-medium truncate ${isCorrect ? "text-emerald-300" : "text-red-300"}`}
                >
                  {userMatch ?? (
                    <em className="text-[#b8ab94] not-italic">Not matched</em>
                  )}
                </span>
              </div>
              {!isCorrect && (
                <div className="flex items-center gap-1.5 mt-1.5 px-3">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 5L4 8L9 1"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  { correctMatch.trim() !== "" ? <span className="text-sm text-emerald-400">
                    {correctMatch}
                  </span> : null}
                </div>
              )}
            </div>
            {isCorrect ? (
              <svg
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M1 5L4.5 8.5L12 1"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <X size={13} className="text-red-400 shrink-0" />
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchTypeReview;
