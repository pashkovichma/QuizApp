import { useState } from 'react';
import classNames from 'classnames';
import { mockQuizData } from '../config/mockQuizData';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import Button from '../components/Button';
import '../styles/MainQuizScreen.css';

type MultipleChoiceQuestion = {
  id: number;
  question: string;
  type: 'multiple';
  options: string[];
  correctAnswer: string;
};

type BooleanQuestion = {
  id: number;
  question: string;
  type: 'boolean';
  correctAnswer: 'true' | 'false';
};

type Question = MultipleChoiceQuestion | BooleanQuestion;

const questions: Question[] = mockQuizData.questions.slice(0, 20) as Question[]; // Take the first 20 questions

function MainQuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizEnded, setQuizEnded] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const quizTime = 60;

  const handleTimeUp = () => {
    setQuizEnded(true);
  };

  const handleAnswerClick = (answer: string) => {
    if (currentQuestion) {
      const correct = answer === currentQuestion.correctAnswer;
      setIsAnswerCorrect(correct);
      setSelectedAnswer(answer);

      if (currentQuestionIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          setSelectedAnswer(null);
          setIsAnswerCorrect(null);
        }, 1000); // Delay before the next question
      } else {
        // Quiz completion
        console.log('Quiz complete!');
      }
    }
  };

  const handleEndQuiz = () => {
    setQuizEnded(true);
  };

  return (
    <div className="main-quiz-screen">
      <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
      <Timer time={quizTime} onTimeUp={handleTimeUp} />

      {currentQuestion ? (
        <div className="question-container">
          <div className="question-text">{currentQuestion.question}</div>
          <div className="answer-buttons">
            {currentQuestion.type === 'multiple' ? (
              currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  label={option}
                  onClick={() => handleAnswerClick(option)}
                  className={classNames({
                    'correct-answer': selectedAnswer === option && isAnswerCorrect,
                    'incorrect-answer': selectedAnswer === option && !isAnswerCorrect,
                  })}
                />
              ))
            ) : (
              ['true', 'false'].map((option) => (
                <Button
                  key={option}
                  label={option}
                  onClick={() => handleAnswerClick(option)}
                  className={classNames({
                      'correct-answer': selectedAnswer === option && isAnswerCorrect, // Apply 'correct-answer' if selected and correct
                      'incorrect-answer': selectedAnswer === option && !isAnswerCorrect, // Apply 'incorrect-answer' if selected and incorrect
                    })}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-complete">
          <h2>Quiz Complete</h2>
          <Button
            label="Restart Quiz"
            onClick={() => setCurrentQuestionIndex(0)}
            className="restart-quiz-button"
          />
        </div>
      )}
      {!quizEnded && (
        <Button
          label="End Quiz"
          onClick={handleEndQuiz}
          className="end-quiz-button"
        />
      )}
    </div>
  );
}

export default MainQuizScreen;