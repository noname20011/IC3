export interface AnswerListReview {
  qId: number; 
  isCorrect: boolean
}

export interface QuestionScore {
  questionId: number;
  earned?: number;
  max: number;
  isCorrect: boolean;
  isPartial: boolean;
}