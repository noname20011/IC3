// ─── Answer state ─────────────────────────────────────────────────────────────
export type SingleAnswer = number; // id của option
export type MultipleAnswer = Array<number>; // danh sách id
export type TrueFalseAnswer = Record<number, "true" | "false">; // statementId -> true/false
export type ReorderAnswer = number[]; // danh sách optionId theo thứ tự
export type MatchAnswer = Record<string, string | null>[]; // leftId -> rightId
export type HotspotAnswer = {id: number, left: number; top: number }[] | null;

export type AnswerValue = SingleAnswer | MultipleAnswer | TrueFalseAnswer | ReorderAnswer | MatchAnswer | HotspotAnswer;

export type AnswerMap = Record<number, AnswerValue>; // questionId -> answerValue
