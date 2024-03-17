import { Router } from "express";
import UserController from "../controllers/user-controller";

const userController = new UserController();

const router = Router();

// users
router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.updateOne);
router.delete("/users/:id", userController.deleteOne);

export default router;
