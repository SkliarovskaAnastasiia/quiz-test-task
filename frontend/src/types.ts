export interface QuestionOption {
  text: string;
  isCorrect: boolean;
}

export type QuestionType = 'BOOLEAN' | 'INPUT' | 'CHECKBOX';

export interface Question {
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  correctAnswer?: string;
}

export interface CreateQuizBody {
  title: string;
  questions: Question[];
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}
