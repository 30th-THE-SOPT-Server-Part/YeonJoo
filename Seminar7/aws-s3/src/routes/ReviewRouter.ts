import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { body } from "express-validator/check";
import auth from "../middleware/auth";

const router: Router = Router();

router.post(
  "/movies/:movieId",
  [
    body("title").notEmpty(),
    body("content").notEmpty(),
    body("writer").notEmpty(),
  ],
  auth,
  ReviewController.createReview
);

router.get("/movies/:movieId", auth, ReviewController.getReviews);

export default router;
