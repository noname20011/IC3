import { ChevronLeft, Circle, Flag, LayoutList, X } from "lucide-react";
import {
  AnswerMap,
  MatchAnswer,
} from "../../../types/answer";
import {
  MatchEntity,
  MultipleChoiceEntity,
  QuestionType,
  QuestionTypeEntity,
  SingleChoiceEntity,
  SortEntity,
  TrueFalseEntity,
  typeColors,
  typeLabels,
} from "../../../types/questions";
import { AnswerListReview, QuestionScore } from "../../../types/questionScore";
import ReviewQuestionBody from "../quizz/ReviewQuestionBody";
import { useState } from "react";
import QuestionAnswerListDrawer from "./QuestionReviewListDrawer";
import { useCustomContext } from "../../../hooks/use-context";
import UserReviewPanel from "./UserReviewPanel";
import { Button } from "@/components/core/buttons/MainButton";
import { useNavigate } from "react-router";

interface TestViewScreenProps {
  questions: QuestionTypeEntity[];
  answers: AnswerMap;
  flagged: Set<number>;
  onClose: () => void;
  setAnswerListReview?: React.Dispatch<
    React.SetStateAction<AnswerListReview[]>
  >;
}

export interface FormData {
  studentName: string;
  studentClass: string;
  schoolId: string;
  schoolName: string | null;
}

function scoreQuestion(
  q: QuestionTypeEntity,
  answers: AnswerMap,
): QuestionScore {

  const a = (answers as Record<number, unknown>)[q.id];
  const base = { questionId: q.id, max: q.points || 0 };

  if (a === undefined || a === null)
    return { ...base, earned: 0, isCorrect: false, isPartial: false };

  if (q.type === "single") {
    // const correct = (a as number) === q.correctAnswer;
    const correct = (q as SingleChoiceEntity).options.some(
      (opt) => opt.id === a && opt.isCorrect,
    );
    return {
      ...base,
      earned: correct ? q.points : 0,
      isCorrect: correct,
      isPartial: false,
    };
  }
  if (q.type === "multiple") {
    const user = [...(a as number[])].sort();
    const correct = (q as MultipleChoiceEntity).options
      .reduce<
        number[]
      >((acc, opt) => (opt.isCorrect ? [...acc, opt.id] : acc), [])
      .sort();
    const isExact =
      user.length === correct.length && user.every((v, i) => v === correct[i]);
    if (isExact) {
      return { ...base, earned: q.points, isCorrect: true, isPartial: false };
    }
    const correctSet = new Set(correct);
    const truePositives = user.filter((v) => correctSet.has(v)).length;
    const falsePositives = user.filter((v) => !correctSet.has(v)).length;
    const partial = Math.max(0, truePositives - falsePositives);
    const earned = Math.round((partial / correct.length) * (q.points ?? 0));
    return { ...base, earned, isCorrect: false, isPartial: earned > 0 };
  }
  if (q.type === "truefalse") {
    const user = a as Record<number, "true" | "false">;
    const rows = (q as TrueFalseEntity).statements.length;
    let correct = 0;

    (q as TrueFalseEntity).statements.forEach((_) => {
      if (user && user[_.id] === String(_.isCorrect)) correct++;
    });
    const earned = Math.round((correct / rows) * (q.points ?? 0));

    return {
      ...base,
      earned,
      isCorrect: correct === rows,
      isPartial: correct > 0 && correct < rows,
    };
  }
  if (q.type === "reorder") {
    const user = a as number[];
    let correct = 0;
    const correctOrder = [...(q as SortEntity).options].sort(
      (a, b) => a.orderIndex! - b.orderIndex!,
    );
    correctOrder.forEach((_, index) => {
      if (user && user[index] === _.id) correct++;
    });

    const earned = Math.round(
      (correct / (q as SortEntity).options.length) * (q.points ?? 0),
    );
    const isExact = correct === (q as SortEntity).options.length;
    return {
      ...base,
      earned,
      isCorrect: isExact,
      isPartial: !isExact && earned > 0,
    };
  }
  if (q.type === "match") {
    const user = a as MatchAnswer;

    let correct = 0;
    for (const pair of (q as MatchEntity).pairs) {
      if (user?.some((u) => u[pair.right.value] === pair.left.value)) {
        correct++;
      }
    }

    const earned = Math.round(
      (correct / (q as MatchEntity).pairs.length) * (q.points ?? 0),
    );
    return {
      ...base,
      earned,
      isCorrect: correct === (q as MatchEntity).pairs.filter((p) => p.isCorrect).length,
      isPartial: correct > 0 && correct < (q as MatchEntity).pairs.filter((p) => p.isCorrect).length,
    };
  }
  if (q.type === "hotspot") {
    const user = a as { x: number; y: number };
    const dx = user.x - 60; // thay logic để lấy user answer đúng từ q.correctAnswer.x
    const dy = user.y - 60; // // thay logic để user answer đúng từ q.correctAnswer.y
    const dist = Math.sqrt(dx * dx + dy * dy);
    const correct = dist <= 150; // threshold radius for correctness
    return {
      ...base,
      earned: correct ? q.points : 0,
      isCorrect: correct,
      isPartial: false,
    };
  }
  return { ...base, earned: 0, isCorrect: false, isPartial: false };
}

const TestReviewScreen = ({
  questions,
  answers,
  flagged
}: TestViewScreenProps) => {
  // get saved state from localStorage
  const userData = JSON.parse(localStorage.getItem("student") || "{}");

  const navigate = useNavigate();
  const {showList, setShowList } = useCustomContext();
  const [answerListReview, setAnswerListReview] = useState<AnswerListReview[]>(
    questions
      .map((q) => scoreQuestion(q, answers))
      .map((answer) => ({
        qId: answer.questionId,
        isCorrect: answer.isCorrect,
      })),
  );

  const scores = questions.map((q) => scoreQuestion(q, answers));


  // scroll to question when click drawer list 
  const scrollToAnchorWithOffset = (id: string, offset = 100) => {
    
  const el = document.getElementById(id);
  if (!el) return;
  
  // Get element's top position relative to the document
  const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
}

  return (
    <div className="flex min-h-screen bg-[#13100d] relative">
      <main className="flex-1 min-h-screen px-6 lg:px-8 py-6 max-w-6xl mx-auto grid items-start grid-cols-1 md:grid-cols-5 gap-6">

        <div className="md:col-span-4 col-span-1">
          {/* Legend */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path
                  d="M1 5L4 8L11 1"
                  stroke="#34d399"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[11px] text-emerald-400">
                Correct answer
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <X size={11} className="text-red-400" />
              <span className="text-[11px] text-red-400">Wrong selection</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded border border-dashed border-emerald-400/40" />
              <span className="text-[11px] text-[#6b5e4a]">Missed correct</span>
            </div>
          </div>

          {/* All questions */}
          <div className="flex flex-col gap-5">
            {questions.map((q, i) => {
              const sc = scores[i];
              const isFlaggedQ = flagged.has(q.id);
              const hasUserAnswer =
                (answers as Record<number, unknown>)[q.id] !== undefined;

              return (
                <div
                  id={`${q.id}`}
                  key={q.id}
                  className={`bg-[#1a1510] border rounded-2xl overflow-hidden ${sc.isCorrect ? "border-emerald-400/20" : sc.isPartial ? "border-orange-400/20" : hasUserAnswer ? "border-red-400/15" : "border-[#2e2418]"}`}
                >
                  {/* Question header */}
                  <div className="px-5 pt-5 pb-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-wrap mb-2">
                        {/* Status badge */}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${sc.isCorrect ? "bg-emerald-400/15" : sc.isPartial ? "bg-orange-400/15" : hasUserAnswer ? "bg-red-400/15" : "bg-[#2a2418]"}`}
                        >
                          {sc.isCorrect ? (
                            <svg
                              width="12"
                              height="10"
                              viewBox="0 0 12 10"
                              fill="none"
                            >
                              <path
                                d="M1 5L4 8L11 1"
                                stroke="#34d399"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          ) : sc.isPartial ? (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 10 10"
                              fill="none"
                            >
                              <path
                                d="M2 5h6"
                                stroke="#fb923c"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          ) : hasUserAnswer ? (
                            <X size={11} className="text-red-400" />
                          ) : (
                            <Circle size={11} className="text-[#4a3d2e]" />
                          )}
                        </div>
                        <span className="text-xs font-semibold text-[#5a4e3a]">
                          Q{i + 1}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${typeColors[q.type as QuestionType]}`}
                        >
                          {typeLabels[q.type as QuestionType]}
                        </span>
                        {isFlaggedQ && (
                          <span className="flex items-center gap-1 text-[10px] text-orange-400 font-medium">
                            <Flag size={9} className="fill-orange-400" />{" "}
                            Flagged
                          </span>
                        )}
                      </div>
                      {/* Points */}
                      <div
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg shrink-0 text-xs font-bold ${sc.isCorrect ? "bg-emerald-400/12 text-emerald-400" : sc.isPartial ? "bg-orange-400/12 text-orange-400" : "bg-[#2a2418] text-[#4a3d2e]"}`}
                      >
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M5 1l.9 1.8 2 .3-1.45 1.4.34 2L5 5.6l-1.79 1 .34-2L2.1 3.1l2-.3z"
                            fill="currentColor"
                          />
                        </svg>
                        {sc.earned}/{sc.max}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {q.text}
                    </p>
                  </div>
                  {/* Answer body */}
                  <div className="px-5 pb-5">
                    <ReviewQuestionBody q={q} answers={answers} />
                  </div>

                  {/* Question List Drawer */}
                  {showList && 
                  <QuestionAnswerListDrawer
                    open={showList}
                    onClose={() => setShowList(false)}
                    questions={answerListReview}
                    scrollToAnchorWithOffset={scrollToAnchorWithOffset}
                  />}
                </div>
              );
            })}
          </div>

          <div className="h-10" />
        </div>
        <div className="md:mt-10 col-span-1 w-full sticky md:top-20">
          <UserReviewPanel userData={userData} points={answerListReview.filter((q) => q.isCorrect).length * 10} totalScore={answerListReview.length * 10} />
        </div>
      </main>
        
        
      {/* Button */}
      <Button className="bg-devotion-gold/80 border text-white w-9/12 rounded-xl py-4 
      block md:hidden fixed bottom-4 left-10 right-10 mx-auto h-14 overflow-y-auto" 
      onClick={() => 
        {
          navigate("/leaderboard"); 
          localStorage.clear();
        }} >
        {/* glow animation */}
        <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 hover:opacity-100 transition" />

        <span className="relative z-10">Go to Leaderboard →</span>
      </Button>

    </div>
  );
};

export default TestReviewScreen;
