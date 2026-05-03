import { SortEntity } from "../../../../types/questions";
import { ReorderAnswer } from "../../../../types/answer";

interface ReorderTypeReviewProps {
  question: SortEntity;
  userOrder: ReorderAnswer;
}

const ReorderTypeReview = (props: ReorderTypeReviewProps) => {
  const { question, userOrder } = props;
  
  return (
    <div className="flex flex-col gap-2 mt-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] text-[#4a3d2e] font-semibold uppercase tracking-widest">
          Your order
        </span>
        <span className="text-[#2a2418] mx-1">·</span>
        <span className="text-[10px] text-emerald-400/70 font-semibold uppercase tracking-widest">
          Correct order
        </span>
      </div>
      {userOrder.map((item, i) => {
        const questionValue = question.options.find(opt => opt.id === item)?.value;
        const sortedOptions = [...question.options].sort((a, b) => a.orderIndex! - b.orderIndex!);
        const correctPos = sortedOptions[i].id === item ? i + 1 : null
        const isCorrectPos = correctPos === i + 1;
        return (
          <div
            key={item}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${isCorrectPos ? "bg-emerald-400/6 border-emerald-400/20" : "bg-red-400/5 border-red-400/15"}`}
          >
            {/* User pos badge */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isCorrectPos ? "bg-emerald-400 text-[#0f0d0a]" : "bg-red-400/20 text-red-400 border border-red-400/30"}`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm flex-1 leading-snug ${isCorrectPos ? "text-emerald-300" : "text-[#9a8878]"}`}
            >
              {questionValue}
            </span>
            {/* Correct pos badge */}
            {!isCorrectPos && (
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-[#4a3d2e]">→</span>
                <div className="w-7 h-7 rounded-full bg-emerald-400/15 border border-emerald-400/30 flex items-center justify-center text-xs font-bold text-emerald-400">
                  {sortedOptions.findIndex(opt => opt.id === item) + 1}
                </div>
              </div>  
            )}
            {isCorrectPos && (
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReorderTypeReview;
