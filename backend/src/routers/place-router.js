import { Router } from "express";
import { placeController } from "../controllers";
import { authService } from "../services";

const router = Router();

// places
router.post("/place", authService.validate, placeController.create);
router.get("/places", authService.validate, placeController.findAll);
router.get("/places/:id", authService.validate, placeController.findOne);
router.put("/places/:id", authService.validate, placeController.updateOne);
router.delete("/places/:id", authService.validate, placeController.deleteOne);

export default router;
