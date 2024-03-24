import { Router } from "express";
import { conditionController } from "../controllers";
import { authService } from "../services";

const router = Router();

// conditions
router.post("/conditions", authService.validate, conditionController.create);
router.get("/conditions", authService.validate, conditionController.findAll);
router.get(
  "/conditions/:id",
  authService.validate,
  conditionController.findOne
);
router.put(
  "/conditions/:id",
  authService.validate,
  conditionController.updateOne
);
router.delete(
  "/conditions/:id",
  authService.validate,
  conditionController.deleteOne
);

export default router;
