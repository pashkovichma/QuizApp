import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { paths } from '../paths';
import NumberInput from '../components/NumberInput';
import SelectInput from '../components/SelectInput';
import Button from '../components/Button';
import { categories, difficulties, types, times } from '../config/quizConfigData';
import { RootState, AppDispatch } from '../redux/store';
import { setNumQuestions, setCategory, setDifficulty, setType, setTime } from '../redux/slices/quizConfigSlice';
import { fetchQuestions } from '../redux/slices/questionsListSlice';

function timeToSeconds(time:string): number {
  return Number(time.slice(0, -1)) * 60;
}

function QuizConfigScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector((state: RootState) => state.quizConfig);

  const startQuiz = async() => {
    await dispatch(fetchQuestions());
    console.log(config);
    navigate(paths.quiz, { state: config });
  };

  const seeStats = () => {
    navigate(paths.statistics);
  };

  return (
    <div className="quiz-config-screen">
      <h1>Quiz Configuration</h1>
      <NumberInput
        label="Number of Questions"
        value={config.numQuestions}
        min={5}
        max={15}
        onChange={(value) => dispatch(setNumQuestions(value))}
      />
      <SelectInput
        label="Category"
        options={categories}
        value={config.category}
        onChange={(value) => dispatch(setCategory(value))}
      />
      <SelectInput
        label="Difficulty"
        options={difficulties}
        value={config.difficulty}
        onChange={(value) => dispatch(setDifficulty(value))}
      />
      <SelectInput
        label="Type"
        options={types}
        value={config.type}
        onChange={(value) => dispatch(setType(value))}
      />
      <SelectInput
        label="Time"
        options={times}
        value={config.time}
        onChange={(value) => dispatch(setTime(timeToSeconds(value)))}
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
