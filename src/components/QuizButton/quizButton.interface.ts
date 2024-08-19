import { BaseOptionsProps } from "../base.interface";
export interface QuizButtonProps extends BaseOptionsProps {
  selectedAnswer: string | null;
  isAnswerCorrect: boolean | null;
}