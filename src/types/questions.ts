export interface Options {
  id: number,
  value: string,
  isCorrect?: boolean,
  orderIndex?: number,
}

interface BaseQuestion {
  id: number,
  type: string,
  text: string,
  imageUrl?: string,
  explanation?: string, 
  difficulty?: string,
  tags?: string[],
  points?: number,
  optionsOfTrueFalseType?: string[],
}

export interface SingleChoiceEntity extends BaseQuestion {
  options: Options[],
};

export interface MultipleChoiceEntity extends BaseQuestion {
  options: Options[],
};

export interface TrueFalseEntity extends BaseQuestion {
  statements: Options[],
};

export interface SortEntity extends BaseQuestion {
  options: Options[],
};

export interface HotSpotEntity extends BaseQuestion {
  hint: string,
  image: string,
  hotSpots: {
    label: string,
    x: string,
    y: string,
    w: string,
    h: string,
    isCorrect: boolean,
  }[],
}

export interface MatchEntity extends BaseQuestion {
  pairs: {
    id: number,
    left: { id: number, value: string },
    right: { id: number, value: string },
    isCorrect: boolean,
  }[],
}

export type QuestionTypeEntity = SingleChoiceEntity | MultipleChoiceEntity | TrueFalseEntity | SortEntity | MatchEntity | HotSpotEntity;

export interface QuizData {
  id: string;
  questions: QuestionTypeEntity[];
}


export type QuestionType =
  | "single"
  | "multiple"
  | "truefalse"
  | "reorder"
  | "match"
  | "hotspot";

export type DrawerFilter = "all" | "flagged" | "unanswered";

export const typeLabels: Record<QuestionType, string> = {
  single: "Single Choice",
  multiple: "Multiple Choice",
  truefalse: "True / False",
  reorder: "Drag & Reorder",
  match: "Drag & Match",
  hotspot: "Hotspot",
};

export const typeColors: Record<QuestionType, string> = {
  single: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  multiple: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  truefalse: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  reorder: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  match: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  hotspot: "text-[#c8a46e] bg-[#c8a46e]/10 border-[#c8a46e]/20",
};
