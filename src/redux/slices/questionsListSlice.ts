import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { capitalsQuizData } from '../../config/capitalsQuizData';
import { riversQuizData } from '../../config/riversQuizData';

interface Question {
  id: number;
  difficulty: string;
  question: string;
  options: string[];
}

export interface QuestionsListState {
  questionsList: {
    id: number;
    question: string;
    options: string[];
  }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: QuestionsListState = {
  questionsList: [],
  status: 'idle',
  error: null,
};

function getRandomNumber(): number {
  return Math.floor(Math.random() * 4);
}

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (_, { getState }) => {
    const state = getState() as RootState;
    let questions: Question[] = [];

    function filterAccordingToConfig(sourseData: Question[]) {
      return sourseData.filter((question: Question) => question.difficulty === state.quizConfig.difficulty).splice(0, state.quizConfig.numQuestions);
    }

    switch (state.quizConfig.category) {
      case 'capitals':
        questions = filterAccordingToConfig(capitalsQuizData);
        switch (state.quizConfig.type) {
          case 'multipleChoice':
            questions.map(item => item.question = `What is the capital of ${item.question}?`)
            break;
          case 'trueFalse':
            questions.map(item => item.question = `Is ${item.options[getRandomNumber()]} the capital of ${item.question}?`)
            break;
        }
        break;
      case 'rivers':
        questions = filterAccordingToConfig(riversQuizData);
        switch (state.quizConfig.type) {
          case 'multipleChoice':
            questions.map(item => item.question = `Which river flows through ${item.question}?`)
            break;
          case 'trueFalse':
            questions.map(item => item.question = `Is ${item.options[getRandomNumber()]} flows through ${item.question}?`)
            break;
        }
        break;
      default:
        questions = [];
    }

    return questions;
  }
);

const questionsListSlice = createSlice({
  name: 'questionsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<{ id: number; question: string; options: string[] }[]>) => {
        state.status = 'succeeded';
        state.questionsList = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch questions';
      });
  },
});

export default questionsListSlice.reducer;