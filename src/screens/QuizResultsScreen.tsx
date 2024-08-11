import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { paths } from '../paths';
import { RootState } from '../redux/store';
import '../styles/QuizResultsScreen.css';
import { useSelector } from 'react-redux';

const QuizResultsScreen = () => {
  const correctAnswersAmount = useSelector((state: RootState) => state.result);
  console.log(correctAnswersAmount);
  const navigate = useNavigate();

  const config = useSelector((state: RootState) => state.quizConfig);
  const result = useSelector((state: RootState) => state.result);

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
        <Button label="Restart" onClick={() => {navigate(paths.quiz);}} className="restart-button" />
        <Button label="Choose another quiz" onClick={() => {navigate(paths.home);}} className="choose-quiz-button" />
      </div>
    </div>
  );
};

export default QuizResultsScreen;
