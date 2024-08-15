import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResultState {
  correctAnswers: number;
  timer: number;
}

interface ExtendedResultState extends ResultState {
  totalQuizzes: number;
  averageScore: number;
}

const initialState: ExtendedResultState = {
  correctAnswers: 0,
  timer: 0,
  totalQuizzes: 0,
  averageScore: 0,
}

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    incrementCorrectAnswers(state) {
      state.correctAnswers++;
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    resetTimer(state) {
      state.timer = 0;
    },
    updatePerformance(state) {
      state.totalQuizzes++;
      state.averageScore = state.correctAnswers / state.totalQuizzes; // Simple average calculation
    },
  }
});

export const { 
  incrementCorrectAnswers, 
  setTimer, 
  resetTimer } = resultSlice.actions;
export default resultSlice.reducer;
export type { ExtendedResultState };