import { CreateQuizBody } from '@/types';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getAllQuizzes = async () => {
  const response = await api.get('/quizzes');
  return response.data.data;
};

export const getQuizById = async (id: number) => {
  const response = await api.get(`/quizzes/${id}`);
  return response.data.data;
};

export const createQuiz = async (quizData: CreateQuizBody) => {
  const response = await api.post('/quizzes', quizData);
  return response.data;
};

export const deleteQuiz = async (id: number) => {
  await api.delete(`/quizzes/${id}`);
};
