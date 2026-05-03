import { create } from "zustand";

export const useTestStore = create((set) => ({
  currentQuestion: 0,
  answers: {},
  flag: {},
  setAnswer: (qid, ans) =>
    set((state) => ({ answers: { ...state.answers, [qid]: ans } })),
  setFlag: (qid) =>
    set((state) => ({ flag: { ...state.flag, [qid]: !state.flag[qid] } })),
  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  prevQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion - 1 })),
}));