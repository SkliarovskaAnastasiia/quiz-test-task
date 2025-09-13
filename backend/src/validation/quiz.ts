import { z } from "zod";

const questionOptionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  type: z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]),
  options: z.array(questionOptionSchema).optional(),
  correctAnswer: z.string().optional(),
});

export const createQuizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
