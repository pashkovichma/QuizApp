import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const StatisticsScreen = () => {

  const statistics = useSelector((state: RootState) => state.statistics);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Questions: {statistics.totalQuestions}</p>
      <p>Correct Answers: {statistics.totalCorrectAnswers}</p>

      <h3>Statistics according to categories:</h3>
      <ul>
        {Object.entries(statistics.categories).map(([category, count]) => (
          <li key={category}>
            {category}: {count} questions
          </li>
        ))}
      </ul>

      <h3>Statistics according to difficulties:</h3>
      <ul>
        {Object.entries(statistics.difficulties).map(([difficulty, count]) => (
          <li key={difficulty}>
            {difficulty}: {count} вопросов
          </li>
        ))}
      </ul>

      <h3>Statistics according to types:</h3>
      <ul>
        {Object.entries(statistics.types).map(([type, count]) => (
          <li key={type}>
            {type}: {count} questions
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatisticsScreen;