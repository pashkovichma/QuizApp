import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatisticsPayload, Statistics } from "./interfaces/statisticsSlice.interface.ts";

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
            state.totalQuestions += action.payload;
        },
        refreshStatistics (state, action: PayloadAction<StatisticsPayload>) {
            const {questions, correctAnswers, category, difficulty, type}: StatisticsPayload = action.payload;
            
            state.totalQuestions += questions;
            state.totalCorrectAnswers += correctAnswers;
            state.categories[category] += questions;
            state.difficulties[difficulty] += questions;
            state.types[type] += questions;
            console.log(state);
        }
    }
});

export const { refreshStatistics } = statisticsSlice.actions;
export const { setTotalQuestions } = statisticsSlice.actions;
export default statisticsSlice.reducer;