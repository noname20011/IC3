import {
  AnswerMap,
  HotspotAnswer,
  MatchAnswer,
  ReorderAnswer,
  SingleAnswer,
  TrueFalseAnswer,
} from "@/types/answer";
import {
  HotSpotEntity,
  MatchEntity,
  MultipleChoiceEntity,
  QuestionTypeEntity,
  SingleChoiceEntity,
  SortEntity,
  TrueFalseEntity,
} from "@/types/questions";
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

export interface Rect {
  id?: string | number;
  left: number;   // Tọa độ X bắt đầu (%)
  top: number;    // Tọa độ Y bắt đầu (%)
  width: number;  // Chiều rộng (%)
  height: number; // Chiều cao (%)
}

// 2. Định nghĩa kiểu dữ liệu cho điểm Hotspot (%)
export interface Point {
  id: string | number;
  left: number; // Tọa độ X của điểm (%)
  top: number;  // Tọa độ Y của điểm (%)
}

const isPointInRect = (point: Point, rect: Rect): boolean => {
  const isInsideX = point.left >= rect.left && point.left <= (rect.left + rect.width);
  const isInsideY = point.top >= rect.top && point.top <= (rect.top + rect.height);
  return isInsideX && isInsideY; 
}

export const checkCollision = (hotSpot: Point, blocks: Rect[]): Rect | null => {
  return blocks?.find(block => isPointInRect(hotSpot, block)) || null;
};


export const ReviewQuestionBody = ({ q, answers }: ReviewQuestionBody) => {
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
    const pt = a as HotspotAnswer;
    let  totalCorrect = 0;

    pt?.forEach(point => {
      if(checkCollision(point, (q as HotSpotEntity).hotSpots)) {
        totalCorrect++;
      }
      return totalCorrect;
    });
    
    return (
      <HotspotTypeReview
        question={q as HotSpotEntity}
        userPts={pt}
        isCorrect={totalCorrect === (q as HotSpotEntity).totalRequiredHotSpot}
      />
    );
  }

  return null;
};

export default ReviewQuestionBody;
