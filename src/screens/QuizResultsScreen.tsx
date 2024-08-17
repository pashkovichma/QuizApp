import Button from '../components/Button';
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
  const statistics = useSelector((state: RootState) => state.statistics);

  const handleRestart = () => {
    navigate(paths.quiz);
    dispatch(resetCorrectAnswers());
  };

  const handleAnotherQuiz = () => {
    dispatch(resetConfig());
    navigate(paths.home);
    dispatch(resetCorrectAnswers());
  }

console.log(config.numQuestions);

console.log(statistics);
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

console.log(statistics);
  
return (
    <div className="quiz-results-screen">
      <h1>Thank you for completing this quiz. Here are your results:</h1>
      <div className="result-summary">
        <p>You answered {result.correctAnswers} out of {config.numQuestions} questions correctly.</p>
        <p>Quiz Type: {config.type}</p>
        <p>Category: {config.category}</p>
        <p>Total Time: {config.time}s</p>
        <p>Difficulty: {config.difficulty}</p>
        <p>Time Taken: {result.timer}s</p>
      </div>
      <div className="result-buttons">
        <Button
          label="Restart"
          onClick={handleRestart}
          className="restart-button"
        />
        <Button
          label="Choose another quiz"
          onClick={handleAnotherQuiz}
          className="choose-quiz-button"
        />
      </div>
    </div>
  );
};

export default QuizResultsScreen;
