import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ResultState {
  correctAnswers: number;
  timer: number;
}

const initialState: ResultState = {
  correctAnswers: 0,
  timer: 0,
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
    }
  }
});

export const { 
  incrementCorrectAnswers, 
  setTimer, 
  resetTimer } = resultSlice.actions;
export default resultSlice.reducer;