import { Router } from "express";
import CareController from "../controllers/care-controller";

const careController = new CareController();

const router = Router();

// cares
router.post("/care", careController.create);
router.get("/cares", careController.findAll);
router.get("/cares/:id", careController.findOne);
router.put("/cares/:id", careController.updateOne);
router.delete("/cares/:id", careController.deleteOne);

export default router;
