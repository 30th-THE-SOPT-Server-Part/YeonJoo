import { Router } from "express";
import { body } from "express-validator/check";
import UserController from "../controllers/UserController";
import auth from "../middleware/auth";

const router: Router = Router();

// route => use (/user) => post (/)
router.post(
  "/",
  [
    body("email").isEmail(),
    body("email").notEmpty(),
    body("password").isLength({ min: 6 }),
    body("password").notEmpty(),
    body("name").notEmpty(),
    body("phone").notEmpty(),
  ],
  UserController.createUser
);
router.put("/:userId", auth, UserController.updateUser);
router.get("/:userId", auth, UserController.findUserById);
router.delete("/:userId", auth, UserController.deleteUser);
router.post(
  "/signin",
  [
    body("email").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("password").notEmpty(),
  ],
  UserController.signInUser
);

export default router;
