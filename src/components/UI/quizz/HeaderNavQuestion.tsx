import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import React from "react";
import {
  QuestionType,
  QuestionTypeEntity,
  typeLabels,
} from "../../../types/questions";
import { AnswerMap } from "../../../types/answer";
import scrollToAnchorWithOffset from "@/utils/scrollToAnchorElement";

interface HeaderNavQuestionProps {
  questions: QuestionTypeEntity[];
  answers: AnswerMap;
  flagged: Set<number>;
  current: number;
  setCurrent: (c: any) => void;
  submitted: boolean;
  setSubmitted: (i: boolean) => void;
  timedDoTest: number;
}

const HeaderNavQuestion = (props: HeaderNavQuestionProps) => {
  const {
    questions,
    current,
    answers,
    flagged,
    setCurrent,
    setSubmitted,
    timedDoTest
  } = props;

  const hasAnswer = (id: number) => {
    const a = (answers as Record<number, unknown>)[id];
    
    if (a === undefined || a === null) return false;
    if (Array.isArray(a)) return a.length > 0;
    if(a instanceof Set) return a.size > 0;
    if (typeof a === "object") return Object.keys(a).length > 0;
    return true;
  };

  return (
    <>
      {/* ── Sticky bottom navigation ── */}
      <div className="sticky bottom-0 bg-[#13100d]/95 backdrop-blur-md border-t border-[#2a231a] px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Prev */}
          <button
            onClick={() => {
                setCurrent((c: number) => Math.max(0, c - 1));
                scrollToAnchorWithOffset("question");
              }
            }
            disabled={current === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#2e2418] bg-[#1a1510] text-sm font-medium text-[#7a6b55] hover:text-[#c8a46e] hover:border-[#3e3020] hover:bg-[#1e1810] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            <ChevronLeft size={15} />
            <span className="hidden sm:inline">Previous</span>
          </button>
          {/* Progress bar lg screen*/}
          <div className="px-6 lg:px-8 w-[stretch] hidden md:block">
            <div className="flex items-center gap-3">
              <div className="flex-1 flex gap-1">
                {questions.map((question, i) => {
                  const done = hasAnswer(question.id);
                  const isActive = i === current;
                  const isFlaggedQ = flagged.has(question.id);
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      title={`Q${i + 1}: ${typeLabels[question.type as QuestionType]}`}
                      className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#c8a46e] shadow-sm shadow-[#c8a46e]/40"
                          : done && isFlaggedQ
                            ? "bg-orange-400/70"
                            : done
                              ? "bg-[#549956]"
                              : isFlaggedQ
                                ? "bg-orange-400/30"
                                : "bg-[#2a2418]"
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Progress bar mobile screen*/}
          <div className="px-6 lg:px-8 block md:hidden">
            <div className="relative w-8/12 max-w-md h-4 flex items-center justify-center overflow-visible">

  {questions
    .map((q, index) => ({ q, index }))
    .filter(({ index }) => Math.abs(index - current) <= 2)
    .map(({ index }) => {
      const distance = index - current;

      let scale = "scale-75";
      let opacity = "opacity-70";
      let z = "z-0";
      let blur = "blur-[0.9px]";
      let dimension = "h-8 w-8";
      let decoration = "bg-[#2a2418] border-[#3a3020] text-[#c8a88a] text-sm text-thin"
      if (distance === 0) {
        scale = "scale-125";
        opacity = "opacity-100";
        z = "z-30";
        blur = "blur-0";
        dimension = "w-14 h-14";
        decoration = "bg-[#c8a46e] border-[#a88352] border-[2px] text-[#dbd7cc] text-semibold text-2xl"
      } else if (Math.abs(distance) === 1) {
        scale = "scale-100";
        opacity = "opacity-70";
        z = "z-20";
        blur = "blur-[0.5px]";
        dimension="h-10 w-10";
      }

      return (
        <div
          key={index}
          onClick={() => setCurrent(index)}
          className={`
            absolute left-1/2 top-1/2 cursor-pointer
            transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${scale} ${opacity} ${z} ${blur}
          `}
          style={{
            transform: `translate(-50%, -50%) translateX(${distance * 45}px)`,
          }}
        >
          <div className={`flex items-center justify-center rounded-full shadow-md ${dimension} ${decoration}`}>
            {index + 1}
          </div>
        </div>
      );
    })}
</div>
          </div>

          {/* Right: Next or Submit */}
          {current !== questions.length - 1 ? (
            <button
              onClick={() => {
                  setCurrent((c: number) => Math.min(questions.length - 1, c + 1));
                  scrollToAnchorWithOffset("question");
                }
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c8a46e]/15 border border-[#c8a46e]/30 text-sm font-semibold text-[#c8a46e] hover:bg-[#c8a46e]/25 hover:border-[#c8a46e]/50 transition-all duration-150"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(true);
                localStorage.setItem("timedDoTest", timedDoTest.toString());
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c8a46e] text-sm font-bold text-[#13100d] hover:bg-[#d4b47e] active:scale-[0.97] transition-all duration-150 shadow-lg shadow-[#c8a46e]/20"
            >
              <Send size={13} />
              <span>Submit</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderNavQuestion;
