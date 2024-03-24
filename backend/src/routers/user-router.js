import { Router } from "express";
import { userController, authController } from "../controllers";
import { authService } from "../services";

const router = Router();

// users
// Normalement on appel seulement les middlewares ou les fonctions de service, pas d'autres controllers
router.post("/register", userController.create, authController.signIn);
router.get("/users", authService.validate, userController.findAll);
router.get("/users/:id", authService.validate, userController.findOne);
router.put("/users/:id", authService.validate, userController.updateOne);
router.delete("/users/:id", authService.validate, userController.deleteOne);

export default router;
