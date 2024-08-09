import { configureStore } from '@reduxjs/toolkit';
import quizConfigReducer from './slices/quizConfigSlice';
import questionsListReducer from './slices/questionsListSlice';
import resultSlice from './slices/resultSlice';

export const store = configureStore({
  reducer: {
    quizConfig: quizConfigReducer,
    questionsList: questionsListReducer,
    result: resultSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;