import classNames from 'classnames';
import Button from './Button';

type QuizButtonProps = {
  options: string[];
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  onAnswerClick: (answer: string) => void;
};

function QuizButton(props: QuizButtonProps) {
  return (
    <div className="answer-buttons">
      {props.options.map((option) => (
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