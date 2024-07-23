import { useReducer } from 'react';
import NumberInput from '../components/NumberInput';
import SelectInput from '../components/SelectInput';
import Button from '../components/Button';
import { categories, difficulties, types, times } from '../config/quizConfigData';


interface QuizConfigState {
  numQuestions: number;
  category: string;
  difficulty: string;
  type: string;
  time: string;
}

type QuizConfigAction =
  { type: 'SET_NUM_QUESTIONS'; payload: number }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_DIFFICULTY'; payload: string }
  | { type: 'SET_TYPE'; payload: string }
  | { type: 'SET_TIME'; payload: string };

  const quizConfigReducer = (state: QuizConfigState, action: QuizConfigAction): QuizConfigState => {
    switch (action.type) {
      case 'SET_NUM_QUESTIONS':
        return { ...state, numQuestions: action.payload };
      case 'SET_CATEGORY':
        return { ...state, category: action.payload };
      case 'SET_DIFFICULTY':
        return { ...state, difficulty: action.payload };
      case 'SET_TYPE':
        return { ...state, type: action.payload };
      case 'SET_TIME':
        return { ...state, time: action.payload };
      default:
        return state;
    }
  };

  const initialState: QuizConfigState = {
    numQuestions: 5,
    category: '',
    difficulty: '',
    type: '',
    time: '1m'
  };

function QuizConfigScreen() {
  const [state, dispatch] = useReducer(quizConfigReducer, initialState);

  const startQuiz = () => {
  };

  const seeStats = () => {
  };

  return (
    <div className="quiz-config-screen">
      <h1>Quiz Configuration</h1>
      <NumberInput
        label="Number of Questions"
        value={state.numQuestions}
        min={5}
        max={15}
        onChange={(value) => dispatch({ type: 'SET_NUM_QUESTIONS', payload: value })}
      />
      <SelectInput
        label="Category"
        options={categories}
        value={state.category}
        onChange={(value) => dispatch({ type: 'SET_CATEGORY', payload: value })}
      />
      <SelectInput
        label="Difficulty"
        options={difficulties}
        value={state.difficulty}
        onChange={(value) => dispatch({ type: 'SET_DIFFICULTY', payload: value })}
      />
      <SelectInput
        label="Type"
        options={types}
        value={state.type}
        onChange={(value) => dispatch({ type: 'SET_TYPE', payload: value })}
      />
      <SelectInput
        label="Time"
        options={times}
        value={state.time}
        onChange={(value) => dispatch({ type: 'SET_TIME', payload: value })}
      />
      <Button 
        label="Start Quiz"
        onClick={startQuiz}
        className="start-quiz-button"
      />
      <Button
        label="See My Stats"
        onClick={seeStats}
        className="see-stats-button"
      />
    </div>
  );
}

export default QuizConfigScreen;