import { CheckCircle2, Flag, LayoutList, X } from "lucide-react";
import { AnswerListReview } from "../../../types/questionScore";
import { useMemo, useState } from "react";

type DrawerFilter = "all" | "correct" | "incorrect";

interface QuestionAnswerListDrawerProps {
  open: boolean;
  onClose: () => void;
  questions: AnswerListReview[];
  scrollToAnchorWithOffset: (qId: string) => void;
}

export default function QuestionAnswerListDrawer({
  open,
  onClose,
  questions,
  scrollToAnchorWithOffset,
}: QuestionAnswerListDrawerProps) {
  const [filter, setFilter] = useState<DrawerFilter>("all");
  const [current, setCurrent] = useState<number>(0);

  const filtered = useMemo(() => {
  return questions.filter((q) => {
    if (filter === "correct") return q.isCorrect;
    if (filter === "incorrect") return !q.isCorrect;
    return true;
  });
}, [questions, filter]);

const { correctCount, inCorrectCount } = useMemo(() => {
  const correct = questions.filter((q) => q.isCorrect).length;
  return {
    correctCount: correct,
    inCorrectCount: questions.length - correct
  };
}, [questions]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm flex flex-col bg-[#0f0d0a] border-l border-[#2a231a] shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a231a]">
          <div className="flex items-center gap-2.5">
            <LayoutList size={16} className="text-[#c8a46e]" />
            <h2 className="text-sm font-bold text-white">All Questions</h2>
            <span className="text-xs text-[#5a4e3a] font-medium">
              {questions.length} total
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-[#1e1810] border border-[#2e2418] flex items-center justify-center hover:bg-[#2a2018] transition-colors"
          >
            <X size={13} className="text-[#6b5e4a]" />
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1.5 px-5 py-3 border-b border-[#1e1810]">
          {[
            {
              key: "all" as DrawerFilter,
              label: "All",
              count: questions.length,
            },
            {
              key: "correct" as DrawerFilter,
              label: "Correct",
              count: correctCount,
            },
            {
              key: "incorrect" as DrawerFilter,
              label: "Incorrect",
              count: inCorrectCount,
            },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === key
                  ? key === "correct"
                    ? "bg-orange-400/15 border border-orange-400/30 text-orange-400"
                    : key === "incorrect"
                      ? "bg-red-400/10 border border-red-400/20 text-red-400"
                      : "bg-[#c8a46e]/12 border border-[#c8a46e]/30 text-[#c8a46e]"
                  : "text-[#5a4e3a] hover:text-[#9a8668] hover:bg-[#1e1810]"
              }`}
            >
              {label}
              <span
                className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  filter === key
                    ? key === "correct"
                      ? "bg-orange-400/20 text-orange-400"
                      : key === "incorrect"
                        ? "bg-red-400/15 text-red-400"
                        : "bg-[#c8a46e]/20 text-[#c8a46e]"
                    : "bg-[#2a2418] text-[#5a4e3a]"
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>

        {/* Question list */}
        <div className="flex-1 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2">
              <div className="w-10 h-10 rounded-full bg-[#1e1810] flex items-center justify-center">
                {filter === "correct" ? (
                  <Flag size={16} className="text-[#3a3020]" />
                ) : (
                  <CheckCircle2 size={16} className="text-[#3a3020]" />
                )}
              </div>
              <p className="text-xs text-[#4a3d2e]">
                {filter === "incorrect"
                  ? "No correct questions"
                  : "All questions correct!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 gap-y-4 justify-items-center ml-3">
              {filtered.map((question, index) => {
                const qIdx = questions.indexOf(question);
                const isActive = qIdx === current;

                return (
                  <a
                    key={question.qId}
                    onClick={() => {
                      onClose();
                      setCurrent(index);
                      scrollToAnchorWithOffset(question.qId.toString());
                    }}
                    className={`transition-all overflow-hidden cursor-pointer`}
                  >
                    {/* Number badge */}
                    <div
                      className={`w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-[16px] overflow-hidden font-bold mt-0.5 relative before:contents-[''] hover:before:w-full hover:before:bg-black/80 hover:before:absolute hover:before:z-10 hover:before:bottom-0 before:h-0 before:z-10 before:transition-all before:duration-500 hover:before:h-4 hover:before:rounded-bl-lg hover:before:rounded-br-lg ${
                        isActive
                          ? "bg-[#c8a46e] text-[#13100d] before:w-full before:h-4 before:bg-black/60 before:absolute before:z-10 before:bottom-0"
                          : question.isCorrect
                            ? "bg-[#549956] text-white border hover:border-none"
                            : "bg-[#ff0000]/60 text-white border hover:border-none"
                      }`}
                    >
                      {qIdx + 1}{" "}
                    </div>

                    {/* Current indicator */}
                    {isActive && <div className="rounded-full bg-[#c8a46e]" />}
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#2a231a] flex gap-2">
          <span className="flex items-center gap-x-2 text-[10px] font-light shrink-0">
            <div className="p-2 bg-[#549956] rounded-md"></div>
            Correct
          </span>
          <span className="flex items-center gap-x-2 text-[10px] font-light shrink-0">
            <div className="p-2 bg-[#ff0000]/60 rounded-md"></div>
            Incorrect
          </span>
          <span className="flex items-center gap-x-2 text-[10px] font-light shrink-0">
            <div className="p-2 bg-[#c8a46e] rounded-md"></div>
            Activating
          </span>
        </div>
      </div>
    </>
  );
}
