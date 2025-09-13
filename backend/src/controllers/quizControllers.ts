import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateQuizInput } from "../validation/quiz";

const prisma = new PrismaClient();

export const getAllQuizzes = async (req: Request, res: Response) => {
  const quizzes = await prisma.quiz.findMany({
    include: { questions: true },
  });

  res.json({ status: 200, quizzes });
};

export const getQuizById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
    include: { questions: { include: { options: true } } },
  });

  if (!quiz) {
    return res.status(404).json({ status: 404, message: "Quiz not found" });
  }

  res.json({ status: 200, quiz });
};

export const createQuiz = async (req: Request, res: Response) => {
  const { title, questions } = req.body as CreateQuizInput;

  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions.map((q) => ({
          text: q.text,
          type: q.type,
          correctAnswer: q.type === "INPUT" ? q.correctAnswer : undefined,
          options:
            q.options && q.type !== "INPUT" ? { create: q.options } : undefined,
        })),
      },
    },
    include: { questions: { include: { options: true } } },
  });

  res.json({ status: 201, quiz });
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.questionOption.deleteMany({
    where: { question: { quizId: Number(id) } },
  });

  await prisma.question.deleteMany({
    where: { quizId: Number(id) },
  });

  await prisma.quiz.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
};
