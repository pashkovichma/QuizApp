import Button from '../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { paths } from '../paths';
import { RootState } from '../redux/store';
import '../styles/QuizResultsScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { resetConfig } from '../redux/slices/quizConfigSlice';
import { setTotalQuestions, 
  setTotalCorrectAnswers, 
  setTotalCorrectAnswersByCategories,
  setTotalCorrectAnswersByDifficulties,
  setTotalCorrectAnswersByTypes,
} from '../redux/slices/statisticsSlice.ts'
import { resetCorrectAnswers } from '../redux/slices/resultSlice.ts';
import { DifficultyKeys, TypeKeys } from '../redux/slices/interfaces/statisticsSlice.interface.ts';

const QuizResultsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = useSelector((state: RootState) => state.quizConfig);
  const result = useSelector((state: RootState) => state.result);
  
  const handleRestart = () => {
    navigate(paths.quiz);
    dispatch(resetCorrectAnswers());
  };

  const handleAnotherQuiz = () => {
    dispatch(resetConfig());
    navigate(paths.home);
    dispatch(resetCorrectAnswers());
  }

  const handleStatistics = () => {
    dispatch(resetConfig());
    navigate(paths.statistics);
    dispatch(resetCorrectAnswers());
  }
const hasDispatched = useRef(false); 
useEffect(() => {
  if (!hasDispatched.current) {
    dispatch(setTotalQuestions(config.numQuestions));
    dispatch(setTotalCorrectAnswers(result.correctAnswers));
    dispatch(setTotalCorrectAnswersByCategories({
      correctAnswers: result.correctAnswers, 
      category: config.category
    }));
    dispatch(setTotalCorrectAnswersByDifficulties({
      correctAnswers: result.correctAnswers,
      difficulty: config.difficulty as DifficultyKeys
    })); 
    dispatch(setTotalCorrectAnswersByTypes({
      correctAnswers: result.correctAnswers,
      type: config.type as TypeKeys
    }));
  
    hasDispatched.current = true;
  }
}, [dispatch, config.numQuestions, config.category, config.difficulty, config.type, result.correctAnswers]); 

return (
    <div className="quiz-results-screen">
      <h1 className="results-header">Thank you for completing this quiz. Here are your results:</h1>
      <div className="results-container">
        <p className="results-text">You answered {result.correctAnswers} out of {config.numQuestions} questions correctly.</p>
        <p className="results-text">Quiz Type: {config.type}</p>
        <p className="results-text">Category: {config.category}</p>
        <p className="results-text">Total Time: {config.time}s</p>
        <p className="results-text">Difficulty: {config.difficulty}</p>
        <p className="results-text">Time Taken: {result.timer}s</p>
      </div>
      <div className="result-buttons">
        <Button
          label="Restart"
          onClick={handleRestart}
          className="result-button"
        />
        <Button
          label="Choose another quiz"
          onClick={handleAnotherQuiz}
          className="result-button"
        />
        <Button
          label="Show statistics"
          onClick={handleStatistics}
          className="result-button"
        />
      </div>
    </div>
  );
};

export default QuizResultsScreen;