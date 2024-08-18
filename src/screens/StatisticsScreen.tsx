import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { paths } from '../paths';
import '../styles/StatisticsScreen.css';

const StatisticsScreen = () => {
  const navigate = useNavigate();

  const statistics = useSelector((state: RootState) => state.statistics);

  const handleAnotherQuiz = () => {
    navigate(paths.home);
  }

  return (
    <div className="statistics-screen">
      <h2 className="statistics-header">Statistics</h2>
      <p className="statistics-text">Total Questions: {statistics.totalQuestions}</p>
      <p className="statistics-text">Correct Answers: {statistics.totalCorrectAnswers}</p>

      <div className="statistics-section">
        <h3>Statistics according to categories:</h3>
        <ul className="statistics-list">
          {Object.entries(statistics.categories).map(([category, count]) => (
            <li key={category} className="statistics-list-item">
              {category}: {count} questions
            </li>
          ))}
        </ul>
      </div>

      <div className="statistics-section">
        <h3>Statistics according to difficulties:</h3>
        <ul>
          {Object.entries(statistics.difficulties).map(([difficulty, count]) => (
            <li key={difficulty} className="statistics-list-item">
              {difficulty}: {count} questions
            </li>
          ))}
        </ul>
      </div>

      <div className="statistics-section">
        <h3>Statistics according to types:</h3>
        <ul>
          {Object.entries(statistics.types).map(([type, count]) => (
            <li key={type} className="statistics-list-item">
              {type}: {count} questions
            </li>
          ))}
        </ul>
        </div>

        <Button
          label="Choose another quiz"
          onClick={handleAnotherQuiz}
          className="another-quiz-button"
        />
    </div>
  );
};

export default StatisticsScreen;