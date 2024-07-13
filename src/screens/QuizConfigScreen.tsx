import { useState } from 'react';
import NumberInput from '../components/NumberInput';
import SelectInput from '../components/SelectInput';
import Button from '../components/Button';

function QuizConfigScreen() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');
  const [time, setTime] = useState('1m');

  const categories = ['General Knowledge', 'Science', 'Math', 'History'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const types = ['Multiple Choice', 'True/False'];
  const times = ['1m', '2m', '5m'];

  const startQuiz = () => {
  };

  const seeStats = () => {
  };

  return (
    <div className="quiz-config-screen">
      <h1>Quiz Configuration</h1>
      <NumberInput
        label="Number of Questions"
        value={numQuestions}
        min={5}
        max={15}
        onChange={setNumQuestions}
      />
      <SelectInput
        label="Category"
        options={categories}
        value={category}
        onChange={setCategory}
      />
      <SelectInput
        label="Difficulty"
        options={difficulties}
        value={difficulty}
        onChange={setDifficulty}
      />
      <SelectInput
        label="Type"
        options={types}
        value={type}
        onChange={setType}
      />
      <SelectInput
        label="Time"
        options={times}
        value={time}
        onChange={setTime}
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