import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Button from './Button';

type QuizButtonProps = {
  options: string[];
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  onAnswerClick: (answer: string) => void;
};

function shuffleArray(array: string[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function QuizButton(props: QuizButtonProps) {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (props.options.length > 2) {
      setShuffledOptions(shuffleArray(props.options));
    } else {
      setShuffledOptions(props.options);
    }
  }, [props.options]);

  return (
    <div className="answer-buttons">
      {shuffledOptions.map((option) => (
        <Button
          key={option}
          label={option}
          onClick={() => props.onAnswerClick(option)}
          className={classNames({
            'correct-answer': props.selectedAnswer === option && props.isAnswerCorrect,
            'incorrect-answer': props.selectedAnswer === option && !props.isAnswerCorrect,
          })}
        />
      ))}
    </div>
  );
}

export default QuizButton;