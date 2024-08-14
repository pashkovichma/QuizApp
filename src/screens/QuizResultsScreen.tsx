import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { paths } from '../paths';
import { RootState } from '../redux/store';
import '../styles/QuizResultsScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import { resetConfig } from '../redux/slices/quizConfigSlice';

const QuizResultsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config = useSelector((state: RootState) => state.quizConfig);
  const result = useSelector((state: RootState) => state.result);

  const handleRestart = () => {
    navigate(paths.quiz);
  };

  const handleAnotherQuiz = () => {
    dispatch(resetConfig());
    navigate(paths.home);
  }

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
