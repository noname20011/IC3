import {
  AnswerMap,
  MatchAnswer,
  ReorderAnswer,
  SingleAnswer,
  TrueFalseAnswer,
} from "../../../types/answer";
import {
  HotSpotEntity,
  MatchEntity,
  MultipleChoiceEntity,
  QuestionTypeEntity,
  SingleChoiceEntity,
  SortEntity,
  TrueFalseEntity,
} from "../../../types/questions";
import {
  HotspotTypeReview,
  MatchTypeReview,
  MultiTypeReview,
  ReorderTypeReview,
  SingleTypeReview,
  TrueFalseTypeReview,
} from "./TypeQuestionReview";

interface ReviewQuestionBody {
  q: QuestionTypeEntity;
  answers: AnswerMap;
}

const ReviewQuestionBody = ({ q, answers }: ReviewQuestionBody) => {
  const a = answers[q.id];

  // ── Single choice ──
  if (q.type === "single") {
    const userIdx = a as SingleAnswer;
    return (
      <SingleTypeReview question={q as SingleChoiceEntity} userIdx={userIdx} />
    );
  }

  // ── Multiple choice ──
  if (q.type === "multiple") {
    const userIdxs: Set<number> =
      a instanceof Set
        ? a
        : Array.isArray(a)
          ? new Set(a as number[])
          : new Set();
    const correctSet = new Set(
      (q as MultipleChoiceEntity).options
        .reduce<
          number[]
        >((acc, opt) => (opt.isCorrect ? [...acc, opt.id] : acc), [])
        .sort(),
    );
    return (
      <MultiTypeReview
        question={q as MultipleChoiceEntity}
        userIdxs={userIdxs}
        correctSet={correctSet}
      />
    );
  }

  // ── True / False ──
  if (q.type === "truefalse") {
    const user = (a as TrueFalseAnswer) ?? {};
    return <TrueFalseTypeReview question={q as TrueFalseEntity} user={user} />;
  }

  // ── Drag & Reorder ──
  if (q.type === "reorder") {
    const userOrder =
      (a as ReorderAnswer) ??
      (q as SortEntity).options
        .sort((a, b) => a.orderIndex! - b.orderIndex!)
        .map((opt) => opt.id);
    return (
      <ReorderTypeReview question={q as SortEntity} userOrder={userOrder} />
    );
  }

  // ── Drag & Match ──
  if (q.type === "match") {
    const user = (a as MatchAnswer) ?? {};
    return <MatchTypeReview question={q as MatchEntity} user={user} />;
  }

  // ── Hotspot ──
  if (q.type === "hotspot") {
    const pt = a as { x: number; y: number } | undefined;
    const isCorrect = pt
      ? Math.sqrt((pt.x - 60) ** 2 + (pt.y - 80) ** 2) <= 150
      : false;
    return (
      <HotspotTypeReview
        question={q as HotSpotEntity}
        userPt={pt}
        isCorrect={isCorrect}
      />
    );
  }

  return null;
};

export default ReviewQuestionBody;
