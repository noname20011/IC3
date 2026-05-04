import { use, useEffect, useState } from "react";
import { AlertCircle, AlignLeft, Flag, X } from "lucide-react";
import {
  DragMatchType,
  HotSpotType,
  MultipleType,
  ReorderType,
  SingleType,
  TrueFalseType,
} from "../components/UI/quizz/TypeQuestionTest";
import {
  QuestionTypeEntity,
  HotSpotEntity,
  MatchEntity,
  MultipleChoiceEntity,
  SingleChoiceEntity,
  SortEntity,
  TrueFalseEntity,
  typeLabels,
  typeColors,
  QuestionType,
} from "../types/questions";
import { QuestionScore } from "../types/questionScore";
import {
  AnswerMap,
  AnswerValue,
  MatchAnswer,
  MultipleAnswer,
  ReorderAnswer,
} from "../types/answer";
import questionsData from "../data/questions.json";
import QuestionListDrawer from "../components/UI/quizz/QuestionListDrawer";
import HeaderNavQuestion from "../components/UI/quizz/HeaderNavQuestion";
import TestReviewScreen from "../components/UI/Review/TestViewScreen";
import { useCustomContext } from "../hooks/use-context";
import { s, u } from "framer-motion/client";
import PopUp from "../components/core/popups/PopUp";
import { useParams } from "react-router-dom";
import { Button } from "@/components/core/buttons/MainButton";
// ─── Question type definitions ────────────────────────────────────────────────

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
      if (user?.some((u) => u[pair.left.value] === pair.right.value)) {
        correct++;
      }
    }

    const earned = Math.round(
      (correct / (q as MatchEntity).pairs.length) * (q.points ?? 0),
    );
    return {
      ...base,
      earned,
      isCorrect: correct === (q as MatchEntity).pairs.length,
      isPartial: correct > 0 && correct < (q as MatchEntity).pairs.length,
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

// ─── Main Quiz component ───────────────────────────────────────────────────────

export default function Quiz() {
  // get saved state from localStorage
  const saved = JSON.parse(localStorage.getItem("quiz_state") || "{}");

  const [current, setCurrent] = useState<number>(saved.current || 0);
  const [flagged, setFlagged] = useState<Set<number>>(
    new Set(saved.flagged || []),
  );
  const [submitted, setSubmitted] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>(saved.answers || {});
  const { showList, setShowList, setCompleteQuiz } = useCustomContext();

  const [zoomOutImage, setZoomOutImage] = useState(false);

  // Get questions data by partId
  const { partId } = useParams();
  const questions: QuestionTypeEntity[] = questionsData.find(
    (q) => q.partId === Number(partId),
  )?.questions as QuestionTypeEntity[];

  const q = questions[current];
  const totalPoints = questions.reduce((s, q) => s + (q.points ?? 0), 0);
  const answered = Object.keys(answers).length;
  const isFlagged = flagged.has(q.id);

  useEffect(() => {
    localStorage.setItem(
      "quiz_state",
      JSON.stringify({
        answers,
        flagged: Array.from(flagged),
        current,
      }),
    );
  }, [answers, flagged, current]);

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      next.has(q.id) ? next.delete(q.id) : next.add(q.id);
      return next;
    });
  };

  const setAnswer = (id: number, val: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const { timeCountDown, timeDoTest } = useCustomContext();
  
  useEffect(() => {
    const id = setTimeout(() => {
      if (timeCountDown === 0) {
        localStorage.setItem("timedDoTest", String(timeDoTest - timeCountDown));
        setSubmitted(true);
      }}, 2000);
    return () => clearTimeout(id);
  }, [timeCountDown]);

  // ─── Test Review Screen ────────────────────────────────────────────────────────
  if (submitted && reviewing) {
    return (
      <TestReviewScreen
        questions={questions}
        answers={answers}
        flagged={flagged}
        onClose={() => setReviewing(false)}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[#13100d]">
      <main className="flex-1 min-w-0 flex flex-col">
        {/* ── Sticky header ── */}
        <header className="sticky top-16 z-10 bg-[#13100d]/95 backdrop-blur-md border-b border-[#2a231a]">
          {/* ── Sticky bottom navigation ── */}
          <HeaderNavQuestion
            questions={questions}
            flagged={flagged}
            current={current}
            setCurrent={setCurrent}
            submitted={submitted}
            setSubmitted={setSubmitted}
            answers={answers}
            timedDoTest={timeDoTest - timeCountDown}
          />
        </header>
        {/* ── Question body (scrollable) ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
            {/* Question header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Type badge */}
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[11px] font-semibold uppercase tracking-widest ${typeColors[q.type as QuestionType]}`}
                >
                  {typeLabels[q.type as QuestionType]}
                </span>
                {/* Question number */}
                <span className="text-xs text-[#5a4e3a] font-medium">
                  Question {current + 1}{" "}
                  <span className="text-[#3a3020]">/ {questions.length}</span>
                </span>
                {/* Points */}
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#2a2418] rounded-md text-xs text-[#c8a46e] font-semibold">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5 1l.9 1.8 2 .3-1.45 1.4.34 2L5 5.6l-1.79 1 .34-2L2.1 3.1l2-.3z"
                      fill="#c8a46e"
                    />
                  </svg>
                  {q.points ?? 10} pts
                </span>
                {isFlagged && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-400/10 border border-orange-400/20 rounded-md text-xs text-orange-400 font-medium">
                    <Flag size={9} /> Flagged
                  </span>
                )}
              </div>
              {/* Flag button */}
              <button
                onClick={toggleFlag}
                title={isFlagged ? "Remove flag" : "Flag for review"}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
                  isFlagged
                    ? "bg-orange-400/15 border-orange-400/30 text-orange-400 hover:bg-orange-400/20"
                    : "bg-[#1e1810] border-[#2e2418] text-[#5a4e3a] hover:text-[#9a8668] hover:border-[#3e3020]"
                }`}
              >
                <Flag
                  size={13}
                  className={isFlagged ? "fill-orange-400" : ""}
                />
                <span className="hidden sm:inline">
                  {isFlagged ? "Flagged" : "Flag"}
                </span>
              </button>
            </div>

            {/* Question text */}
            <div className="mb-6 p-5 bg-[#1a1510] border border-[#2e2418] rounded-2xl">
              <p className="text-base sm:text-lg font-semibold text-[#b1ada4] leading-relaxed">
                {q.text}
              </p>
              {q.imageUrl && <div className="flex items-end gap-4">
                  <img src={q.imageUrl} alt="Question" className="mt-4 rounded-lg max-h-28 object-contain w-auto"/>
                <Button className="inline-block text-[#fafafa] bg-devotion-gold text-sm"
                  onClick={() => setZoomOutImage(true)}
                >
                  Zoom out image
                </Button>
                {zoomOutImage && (
                  <PopUp
                    showPopup={zoomOutImage}
                    setShowPopup={setZoomOutImage}
                    className="p-0 md:space-y-0 lg:max-w-3xl"
                  >
                    <img
                      src={q.imageUrl}
                      alt="Question"
                      className="rounded-lg max-h-[180vh] object-contain"
                    />
                  </PopUp>
                )}
              </div> 
              }
            </div>

            {/* Question body */}
            {q.type.toLowerCase() === "single" && (
              <SingleType
                question={q as SingleChoiceEntity}
                value={(answers as Record<number, number>)[q.id]}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "multiple" && (
              <MultipleType
                q={q as MultipleChoiceEntity}
                value={answers[q.id] as MultipleAnswer}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "truefalse" && (
              <TrueFalseType
                q={q as TrueFalseEntity}
                value={
                  (answers as Record<number, Record<number, "true" | "false">>)[
                    q.id
                  ]
                }
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "reorder" && (
              <ReorderType
                q={q as SortEntity}
                value={answers[q.id] as ReorderAnswer}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "match" && (
              <DragMatchType
                q={q as MatchEntity}
                value={answers[q.id] as MatchAnswer}
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}
            {q.type.toLowerCase() === "hotspot" && (
              <HotSpotType
                q={q as HotSpotEntity}
                value={
                  (answers as Record<number, { x: number; y: number } | null>)[
                    q.id
                  ]
                }
                onChange={(v) => setAnswer(q.id, v)}
              />
            )}

            {/* Spacer so content clears the bottom nav */}
          </div>
        </div>
      </main>

      {/* Question List Drawer */}
      <QuestionListDrawer
        open={showList}
        onClose={() => setShowList(false)}
        questions={questions}
        current={current}
        flagged={flagged}
        answers={answers}
        onNavigate={(i) => setCurrent(i)}
      />

      {/* PopUp submit Test */}
      {submitted && (
        <PopUp showPopup={submitted} setShowPopup={setSubmitted}>
          <div className="flex">
            <main className="flex-1 flex items-center justify-center p-4">
              <div className="max-w-md w-full text-center">
                {/* Icon */}
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <AlertCircle
                    size={80}
                    className="text-[#c8a46e] font-light"
                  />
                </div>

                <h2 className="text-2xl font-bold text-white mb-1">
                  Are sure you wanna submit?
                </h2>
                <p className="text-sm text-[#6b5e4a] mb-7">
                  {answered} of {questions.length} questions answered
                </p>

                {/* 3 stat cards */}
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-[#1a1510] border border-[#2e2418] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">{answered}</p>
                    <p className="text-xs text-[#6b5e4a] mt-1">Answered</p>
                  </div>
                  <div className="bg-[#1a1510] border border-[#2e2418] rounded-xl p-4">
                    <p className="text-2xl font-bold text-white">
                      {flagged.size}
                    </p>
                    <p className="text-xs text-[#6b5e4a] mt-1">Flagged</p>
                  </div>
                  <div className="bg-[#1a1510] border border-[#2e2418] rounded-xl p-4">
                    <p className="text-2xl font-bold text-[#c8a46e]">
                      {questions.length - answered}
                    </p>
                    <p className="text-xs text-[#6b5e4a] mt-1">Unanswered</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setReviewing(true)
                      setCompleteQuiz(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c8a46e] text-lg  font-semibold text-[#13100d] rounded-xl hover:bg-[#d4b47e] transition-all shadow-lg shadow-[#c8a46e]/20"
                  >
                    <AlignLeft size={16} />
                    Submit
                  </button>
                </div>
              </div>
            </main>
          </div>
        </PopUp>
      )}
    </div>
  );
}
