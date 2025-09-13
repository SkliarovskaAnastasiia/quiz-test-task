import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
} from "../controllers/quizControllers";
import { validateBody } from "../middlewares/validateBody";
import { createQuizSchema } from "../validation/quiz";
import { validateId } from "../middlewares/validateId";

const router = Router();

router.get("/", ctrlWrapper(getAllQuizzes));
router.get("/:id", validateId, ctrlWrapper(getQuizById));
router.post("/", validateBody(createQuizSchema), ctrlWrapper(createQuiz));
router.delete("/:id", validateId, ctrlWrapper(deleteQuiz));

export default router;
