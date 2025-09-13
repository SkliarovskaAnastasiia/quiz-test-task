import { Request, Response, NextFunction } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const parsedId = Number(id);

  if (isNaN(parsedId) || parsedId <= 0) {
    return next({
      status: 400,
      message: "Invalid ID. ID must be a positive number.",
    });
  }

  next();
};
