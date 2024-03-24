import { Router } from "express";
import { cityController } from "../controllers";
import { authService } from "../services";

const router = Router();

// cares
router.post("/city", authService.validate, cityController.create);
router.get("/cities", authService.validate, cityController.findAll);
router.get("/cities/:id", authService.validate, cityController.findOne);
router.put("/cities/:id", authService.validate, cityController.updateOne);
router.delete("/cities/:id", authService.validate, cityController.deleteOne);

export default router;
