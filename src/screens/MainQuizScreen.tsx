import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { paths } from '../paths';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import Timer from '../components/Timer/Timer';
import Button from '../components/Button/Button';
import QuizButton from '../components/QuizButton/QuizButton';
import EndQuizModal from '../components/EndQuizModal/EndQuizModal';
import { RootState } from '../redux/store';
import { setTimer } from '../redux/slices/resultSlice';
import { incrementCorrectAnswers } from '../redux/slices/resultSlice';
import { resetConfig } from '../redux/slices/quizConfigSlice';
import '../styles/MainQuizScreen.css';

function MainQuizScreen() {
  const navigate = useNavigate();
  const questions = useSelector((state: RootState) => state.questionsList.questionsList);
  const config = useSelector((state: RootState) => state.quizConfig);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [showEndQuizModal, setShowEndQuizModal] = useState(false);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const quizTime = config.time;

  const dispatch = useDispatch();

  const [timer, setTimerLocal] = useState(quizTime);
  
  const handleTimeUp = useCallback(() => {
    setQuizEnded(true);
    dispatch(setTimer(0)); 
  }, [dispatch]);
  
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimerLocal(prevTimer => {
          const newTimer = prevTimer - 1;
          dispatch(setTimer(newTimer)); 
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      handleTimeUp(); 
      navigate(paths.results);
    }
  }, [timer, dispatch, handleTimeUp, navigate]);


  const handleEndQuiz = () => {
    setTimeout(() => setShowEndQuizModal(true), 1000);
  };

  const closeModal = () => setShowEndQuizModal(false);

  const confirmEndQuiz = () => {
    dispatch(resetConfig());
    navigate(paths.home);
  }

  const checkAnswer = (answer: string) => {
    if (config.type === 'multipleChoice') {
      return answer === currentQuestion.options[0];
    } else {
      return (answer === 'true' && currentQuestion.question.includes(currentQuestion.options[0])) ||
             (answer === 'false' && !currentQuestion.question.includes(currentQuestion.options[0]));
    }
  };
const handleAnswerClick = (answer: string) => {
  if (quizEnded) return;

  const correct = checkAnswer(answer);
  setIsAnswerCorrect(correct);
  setSelectedAnswer(answer);

  if (correct) dispatch(incrementCorrectAnswers());

  setTimeout(() => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      setQuizEnded(true);
      navigate(paths.results);
    }
  }, 1000); // Delay before the next question
};

return (
  <div className="main-quiz-screen">
    <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
    <Timer time={quizTime} onTimeUp={handleTimeUp} />

    {currentQuestion ? (
      <div className="question-container">
        <div className="question-text">{currentQuestion.question}</div>
        <div className="answer-buttons">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }} 
            transition={{ duration: 0.9 }} 
          >
            <QuizButton
              options={config.type === 'multipleChoice' ? currentQuestion.options : ['true', 'false']}
              selectedAnswer={selectedAnswer}
              isAnswerCorrect={isAnswerCorrect}
              onChange={handleAnswerClick}
            />
          </motion.div> 
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