import { Router } from "express";
import ConditionController from "../controllers/condition-controller";

const conditionController = new ConditionController();

const router = Router();

// conditions
router.post("/conditions", conditionController.create);
router.get("/conditions", conditionController.findAll);
router.get("/conditions/:id", conditionController.findOne);
router.put("/conditions/:id", conditionController.updateOne);
router.delete("/conditions/:id", conditionController.deleteOne);

export default router;
