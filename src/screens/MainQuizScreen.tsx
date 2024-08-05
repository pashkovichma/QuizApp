import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '../paths';
import { mockQuizData } from '../config/mockQuizData';
import ProgressBar from '../components/ProgressBar';
import Timer from '../components/Timer';
import Button from '../components/Button';
import QuizButton from '../components/QuizButton';
import EndQuizModal from '../components/EndQuizModal';
import '../styles/MainQuizScreen.css';

type MultipleChoiceQuestion = {
  id: number;
  question: string;
  type: 'multiple';
  options: string[];
  correctAnswer: string;
  difficulty: string;
};

type BooleanQuestion = {
  id: number;
  question: string;
  type: 'boolean';
  correctAnswer: 'true' | 'false';
  difficulty: string;
};

type Question = MultipleChoiceQuestion | BooleanQuestion;

const questions: Question[] = mockQuizData.questions.slice(0, 20) as Question[]; // Take the first 20 questions

function MainQuizScreen() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showEndQuizModal, setShowEndQuizModal] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const quizTime = 60;

  const handleTimeUp = () => {
    setQuizEnded(true);
  };

  const handleEndQuiz = () => {
    setShowEndQuizModal(true);
  };

  const closeModal = () => {
    setShowEndQuizModal(false);
  };

  const confirmEndQuiz = () => {
    navigate(paths.home);
  };

  const handleAnswerClick = (answer: string) => {
    if (quizEnded) return;

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
        setQuizEnded(true);
        navigate(paths.results);
      }
    }
  };

  return (
    <div className="main-quiz-screen">
      <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
      <Timer time={quizTime} onTimeUp={handleTimeUp} />

      {currentQuestion ? (
        <div className="question-container">
          <div className="question-text">{currentQuestion.question}</div>
          <div className="answer-buttons">
            <QuizButton
              options={currentQuestion.type === 'multiple' ? currentQuestion.options : ['true', 'false']}
              selectedAnswer={selectedAnswer}
              isAnswerCorrect={isAnswerCorrect}
              onAnswerClick={handleAnswerClick}
            />
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
      <Button
        label="End Quiz"
        onClick={handleEndQuiz}
        className="end-quiz-button"
      />
      <EndQuizModal 
        onClose={closeModal} 
        onConfirm={confirmEndQuiz} 
        active={showEndQuizModal}
      />
      
    </div>
  );
}

export default MainQuizScreen;