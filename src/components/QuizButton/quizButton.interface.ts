export interface QuizButtonProps {
  options: string[];
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
  onAnswerClick: (answer: string) => void;
}