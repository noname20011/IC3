import { useState } from "react";
import { AnswerMap } from "../../../types/answer";
import {
  DrawerFilter,
  MatchEntity,
  QuestionTypeEntity,
  SingleChoiceEntity,
  TrueFalseEntity,
} from "../../../types/questions";
import { CheckCircle2, Circle, Flag, LayoutList, X } from "lucide-react";

interface QuestionListDrawerProps {
  open: boolean;
  onClose: () => void;
  questions: QuestionTypeEntity[];
  current: number;
  flagged: Set<number>;
  answers: AnswerMap;
  onNavigate: (index: number) => void;
}

export default function QuestionListDrawer({
  open,
  onClose,
  questions,
  current,
  flagged,
  answers,
  onNavigate,
}: QuestionListDrawerProps) {
  const [filter, setFilter] = useState<DrawerFilter>("all");

  const hasAns = (id: number) => {
    const a = (answers as Record<number, unknown>)[id];
    if (a === undefined || a === null) return false;
    if (Array.isArray(a)) return a.length > 0;
    if (typeof a === "object") return Object.keys(a).length > 0;
    return true;
  };

  const filtered = questions.filter((q) => {
    if (filter === "flagged") return flagged.has(q.id);
    if (filter === "unanswered") return !hasAns(q.id);
    return true;
  });

  const flaggedCount = questions.filter((q) => flagged.has(q.id)).length;
  const unansweredCount = questions.filter((q) => !hasAns(q.id)).length;

  // ─── Answer summary helper ────────────────────────────────────────────────────
  function getAnswerSummary(
    q: QuestionTypeEntity,
    answers: AnswerMap,
  ): string | null {
    const a = (answers as Record<number, unknown>)[q.id];
    if (a === undefined || a === null) return null;
    if (q.type === "single") {
      const idx = a as number;
      const optionValue =
        (q as SingleChoiceEntity).options.find((opt) => opt.id === idx)
          ?.value ?? "Unknown";
      return `${String.fromCharCode(65 + idx)}. ${optionValue.slice(0, 36)}${optionValue.length > 36 ? "…" : ""}`;
    }
    if (q.type === "multiple") {
      const idxs = a as number[];
      if (!idxs.length) return null;
      return `Selected: ${idxs.map((i) => String.fromCharCode(65 + i)).join(", ")}`;
    }
    if (q.type === "truefalse") {
      const map = a as Record<number, "true" | "false">;
      const count = Object.keys(map).length;
      const total = (q as TrueFalseEntity).statements.length;
      return `${count}/${total} rows answered`;
    }
    if (q.type === "reorder") {
      const items = a as string[];
      return items.length ? "Order set ✓" : null;
    }
    if (q.type === "match") {
      const map = a as Record<string, string>;
      const count = Object.keys(map).length;
      const total = (q as MatchEntity).pairs.map((p) => p.isCorrect).length;
      return `${count}/${total} matched`;
    }
    if (q.type === "hotspot") {
      const pt = a as { x: number; y: number };
      return pt ? `Point at (${pt.x}%, ${pt.y}%)` : null;
    }
    return null;
  }

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
              key: "flagged" as DrawerFilter,
              label: "Flagged",
              count: flaggedCount,
            },
            {
              key: "unanswered" as DrawerFilter,
              label: "Unanswered",
              count: unansweredCount,
            },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === key
                  ? key === "flagged"
                    ? "bg-orange-400/15 border border-orange-400/30 text-orange-400"
                    : key === "unanswered"
                      ? "bg-red-400/10 border border-red-400/20 text-red-400"
                      : "bg-[#c8a46e]/12 border border-[#c8a46e]/30 text-[#c8a46e]"
                  : "text-[#5a4e3a] hover:text-[#9a8668] hover:bg-[#1e1810]"
              }`}
            >
              {label}
              <span
                className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                  filter === key
                    ? key === "flagged"
                      ? "bg-orange-400/20 text-orange-400"
                      : key === "unanswered"
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
                {filter === "flagged" ? (
                  <Flag size={16} className="text-[#3a3020]" />
                ) : (
                  <CheckCircle2 size={16} className="text-[#3a3020]" />
                )}
              </div>
              <p className="text-xs text-[#4a3d2e]">
                {filter === "flagged"
                  ? "No flagged questions"
                  : "All questions answered!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 gap-y-4 justify-items-center ml-3">
              {filtered.map((question) => {
                const qIdx = questions.indexOf(question);
                const isActive = qIdx === current;
                const isFlagged = flagged.has(question.id);
                const isDone = hasAns(question.id);
                const summary = getAnswerSummary(question, answers);

                return (
                  <button
                    key={question.id}
                    onClick={() => {
                      onNavigate(qIdx);
                      onClose();
                    }}
                    className={`text-left transition-all hover:bg-[#1a1510] border-b border-[#17140e] last:border-0 ${isActive ? "bg-[#1e1810]" : ""}`}
                  >
                    {/* Number badge */}
                    <div
                      className={`w-16 h-16 rounded-lg shrink-0 border-[2px] border-[#c8a46e] flex items-center justify-center text-[16px] font-bold mt-0.5 hover:scale-110 ${
                        isActive
                          ? "bg-[#c8a46e] text-[#13100d]"
                          : isFlagged && isDone
                            ? "bg-orange-400/20 text-orange-400 border border-orange-400/30"
                            : isFlagged
                              ? "bg-orange-400/50 text-orange-400"
                              : isDone
                                ? "bg-[#c8a46e]/15 text-[#c8a46e]"
                                : "bg-[#2a2418] text-[#5a4e3a]"
                      }`}
                    >
                      {qIdx + 1}{" "}
                      {isFlagged && (
                        <Flag
                          size={18}
                          className={`${isActive ? "text-[#13100d] fill-black" : "fill-orange-400 text-orange-400"} ml-1`}
                        />
                      )}
                    </div>

                    {/* Current indicator */}
                    {isActive && <div className="rounded-full bg-[#c8a46e]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#2a231a] flex flex-col gap-2">
          {flaggedCount > 0 && (
            <button
              onClick={() => {
                const firstFlagged = questions.findIndex((q) =>
                  flagged.has(q.id),
                );
                if (firstFlagged >= 0) {
                  onNavigate(firstFlagged);
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-400/12 border border-orange-400/25 text-orange-400 text-xs font-semibold hover:bg-orange-400/20 transition-all"
            >
              <Flag size={12} className="fill-orange-400" />
              Review {flaggedCount} flagged question
              {flaggedCount > 1 ? "s" : ""}
            </button>
          )}
          {unansweredCount > 0 && (
            <button
              onClick={() => {
                const firstUnanswered = questions.findIndex(
                  (q) => !hasAns(q.id),
                );
                if (firstUnanswered >= 0) {
                  onNavigate(firstUnanswered);
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1a1510] border border-[#2e2418] text-[#6b5e4a] text-xs font-semibold hover:text-[#c8a46e] hover:border-[#3e3020] transition-all"
            >
              <Circle size={12} />
              Go to first unanswered ({unansweredCount})
            </button>
          )}
        </div>
      </div>
    </>
  );
}
