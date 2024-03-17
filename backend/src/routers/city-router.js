import { Router } from "express";
import CityController from "../controllers/city-controller";

const cityController = new CityController();

const router = Router();

// cares
router.post("/city", cityController.create);
router.get("/cities", cityController.findAll);
router.get("/cities/:id", cityController.findOne);
router.put("/cities/:id", cityController.updateOne);
router.delete("/cities/:id", cityController.deleteOne);

export default router;
