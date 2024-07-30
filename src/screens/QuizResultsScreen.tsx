import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizResultsScreen.css';

const QuizResultsScreen = () => {
  const navigate = useNavigate();

  const totalQuestions = 10;
  const correctAnswers = 5;
  const quizType = 'Multiple Choice';
  const quizCategory = 'General Knowledge';
  const quizTime = '4 minutes';
  const difficulty = 'Medium';
  const timeTaken = '3 minutes and 45 seconds';

  return (
    <div className="quiz-results-screen">
      <h1>Thank you for completing this quiz. Here are your results:</h1>
      <div className="result-summary">
        <p>You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
        <p>Quiz Type: {quizType}</p>
        <p>Category: {quizCategory}</p>
        <p>Total Time: {quizTime}</p>
        <p>Difficulty: {difficulty}</p>
        <p>Time Taken: {timeTaken}</p>
      </div>
      <div className="result-buttons">
        <Button label="Restart" onClick={() => {navigate('/quiz');}} className="restart-button" />
        <Button label="Choose another quiz" onClick={() => {navigate('/');}} className="choose-quiz-button" />
      </div>
    </div>
  );
};

export default QuizResultsScreen;
