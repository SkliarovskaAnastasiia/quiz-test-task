export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface CreateQuestion {
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface CreateQuizBody {
  title: string;
  questions: CreateQuestion[];
}

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}
