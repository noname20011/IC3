import { X } from "lucide-react";
import { HotSpotEntity } from "../../../../types/questions";

interface HotspotTypeReviewProps {
  question: HotSpotEntity;
  userPt?: { x: number; y: number };
  isCorrect: boolean;
}
const HotspotTypeReview = (props: HotspotTypeReviewProps) => {
  const { question, userPt, isCorrect } = props;
  return (
    <div
      className="mt-3 space-y-3">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${isCorrect ? "bg-emerald-400/8 border-emerald-400/20" : "bg-red-400/8 border-red-400/20"}`}
      >
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
        ) : (
          <X size={13} className="text-red-400" />
        )}
        <div>
          <p
            className={`text-xs font-semibold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}
          >
            {isCorrect ? "Correct location!" : "Incorrect location"}
          </p>
          {userPt && (
            <p className="text-[10px] text-[#5a4e3a] mt-0.5">
              Your Click: ({userPt.x}%, {userPt.y}%)
            </p>
          )}
          <p className="text-[10px] text-emerald-400/70 mt-0.5">
            Correct: q.correctAnswer.label q.correctAnswer.x%,
            q.correctAnswer.y%
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotspotTypeReview;
