import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Button from '../Button/Button';
import { QuizButtonProps } from './quizButton.interface';

function shuffleArray<T>(array: T[]): T[] {
  return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
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
          onClick={() => props.onChange(option)}
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