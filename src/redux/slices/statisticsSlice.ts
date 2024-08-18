import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  Statistics, 
  CategoriesPayload, 
  DifficultiesPayload, 
  TypesPayload, 
} from "./interfaces/statisticsSlice.interface.ts";

const initialState: Statistics = {
  totalQuestions: 0,
  totalCorrectAnswers: 0,
  categories: {
    capitals: 0,
    rivers: 0
  },
  difficulties: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  types: {
    multipleChoice: 0,
    trueFalse: 0
  }
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setTotalQuestions(state, action: PayloadAction<number>){
      const numQuestions = action.payload;
      state.totalQuestions += numQuestions;
    },
    setTotalCorrectAnswers(state, action: PayloadAction<number>){
      const correctAnswers = action.payload;
      state.totalCorrectAnswers += correctAnswers;
    },
    setTotalCorrectAnswersByCategories( state, action: PayloadAction<CategoriesPayload>){
      const { correctAnswers, category }: CategoriesPayload = action.payload;
      state.categories[category] += correctAnswers;
    },
    setTotalCorrectAnswersByDifficulties( state, action: PayloadAction<DifficultiesPayload>) {
      const { correctAnswers, difficulty }: DifficultiesPayload = action.payload;
      state.difficulties[difficulty] += correctAnswers;
    },
    setTotalCorrectAnswersByTypes( state, action: PayloadAction<TypesPayload>) {
      const { correctAnswers, type }: TypesPayload = action.payload;
      state.types[type] += correctAnswers;
    }
  }
});

export const { setTotalQuestions } = statisticsSlice.actions;
export const { setTotalCorrectAnswers } = statisticsSlice.actions;
export const { setTotalCorrectAnswersByCategories } = statisticsSlice.actions;
export const { setTotalCorrectAnswersByDifficulties} = statisticsSlice.actions;
export const { setTotalCorrectAnswersByTypes} = statisticsSlice.actions;
export default statisticsSlice.reducer;