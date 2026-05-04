import { TrueFalseAnswer } from "../../../../types/answer";
import { TrueFalseEntity } from "../../../../types/questions";
import { X } from "lucide-react";
interface TrueFalseTypeReviewProps {
  question: TrueFalseEntity;
  user: TrueFalseAnswer;
}

const TrueFalseTypeReview = (props: TrueFalseTypeReviewProps) => {
  const { question, user } = props;
  
  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-[#2e2418]">
      <div className="grid grid-cols-[1fr_80px_80px] bg-[#1a1510] border-b border-[#2e2418] px-4 py-2">
        <span className="text-[10px] font-semibold text-[#5a4e3a] uppercase tracking-widest">
          Statement
        </span>
        {question.optionsOfTrueFalseType?.map((opt, i) => (
          <span
            key={i}
            className={`text-[12px] font-semibold ${i === 1 ? "text-emerald-400" : "text-red-400"} uppercase tracking-widest text-center`}
          >
            {opt}
          </span>
        ))}
      </div>
      {question.statements.map((stmt, i) => {
        const userAns = user[stmt.id];
        const correctAns = stmt.isCorrect ? "true" : "false";
        
        const isRowCorrect = userAns === correctAns;
        
        return (
          <div
            key={i}
            className={`grid grid-cols-[1fr_80px_80px] items-center px-4 py-3.5 border-b border-[#1e1810] last:border-0 ${!isRowCorrect && userAns ? "bg-red-400/5" : isRowCorrect ? "bg-emerald-400/5" : ""}`}
          >
            <div className="flex items-center gap-2 pr-3">
              {isRowCorrect && userAns ? (
                <svg
                  width="12"
                  height="10"
                  viewBox="0 0 12 10"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M1 5L4 8L11 1"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : !isRowCorrect && userAns ? (
                <X size={20} className="text-red-400 shrink-0" />
              ) : <X size={20} className="text-red-400 shrink-0" />}
              <p className="text-sm text-[#9a8878] leading-snug">
                {stmt.value}
              </p>
            </div>
            {/* Đúng cell */}
            <div className="flex items-center justify-center">
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                  correctAns === "true" && userAns === "true"
                    ? "border-emerald-400 bg-emerald-400/20"
                    : correctAns === "true"
                      ? "border-emerald-400/40"
                      : userAns === "true"
                        ? "border-red-400 bg-red-400/15"
                        : "border-[#2e2418]"
                }`}
              >
                {userAns === "true" && (
                  <div
                    className={`w-3 h-3 rounded-full ${correctAns === "true" ? "bg-emerald-400" : "bg-red-400"}`}
                  />
                )}
                {userAns !== "true" && correctAns === "true" && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
                )}
              </div>
            </div>
            {/* Sai cell */}
            <div className="flex items-center justify-center">
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${
                  correctAns === "false" && userAns === "false"
                    ? "border-emerald-400 bg-emerald-400/20"
                    : correctAns === "false"
                      ? "border-emerald-400/40"
                      : userAns === "false"
                        ? "border-red-400 bg-red-400/15"
                        : "border-[#2e2418]"
                }`}
              >
                {userAns === "false" && (
                  <div
                    className={`w-3 h-3 rounded-full ${correctAns === "false" ? "bg-emerald-400" : "bg-red-400"}`}
                  />
                )}
                {userAns !== "false" && correctAns === "false" && (
                  <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrueFalseTypeReview;
