import { Router } from "express";
import PlaceController from "../controllers/place-controller";

const placeController = new PlaceController();

const router = Router();

// places
router.post("/place", placeController.create);
router.get("/places", placeController.findAll);
router.get("/places/:id", placeController.findOne);
router.put("/places/:id", placeController.updateOne);
router.delete("/places/:id", placeController.deleteOne);

export default router;
