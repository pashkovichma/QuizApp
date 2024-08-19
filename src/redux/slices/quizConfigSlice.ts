import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categories, difficulties, types, times } from '../../config/quizConfigData';
import { CategoryKeys } from './interfaces/statisticsSlice.interface';
export interface QuizConfigState {
  numQuestions: number;
  category: CategoryKeys;
  difficulty: string;
  type: string;
  time: number; // time in seconds
}

const initialState: QuizConfigState = {
  numQuestions: 5,
  category: categories[0] as CategoryKeys,
  difficulty: difficulties[0],
  type: types[0],
  time: Number(times[0].slice(0, -1)) * 60,
};

const quizConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setNumQuestions(state, action: PayloadAction<number>) {
      state.numQuestions = action.payload;
    },
    setCategory(state, action: PayloadAction<CategoryKeys>) {
      state.category = action.payload;
    },
    setDifficulty(state, action: PayloadAction<string>) {
      state.difficulty = action.payload;
    },
    setType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
    setTime(state, action: PayloadAction<number>) {
      state.time = action.payload;
    },
    resetConfig(state) {
      state.numQuestions = initialState.numQuestions;
      state.category = initialState.category;
      state.difficulty = initialState.difficulty;
      state.type = initialState.type;
      state.time = initialState.time;
    },
  },
});

export const selectNumQuestions = (state: QuizConfigState) => state.numQuestions;

export const { 
  setNumQuestions, 
  setCategory, 
  setDifficulty, 
  setType, 
  setTime, 
  resetConfig 
} = quizConfigSlice.actions;
export default quizConfigSlice.reducer;
export {initialState};