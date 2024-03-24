import { Router } from "express";
import { careController } from "../controllers";
import { authService } from "../services";

const router = Router();

// ROUTER = nom de la route + function à effectuer si une requête match la route
// si POST /api/care est appelé, on appel la function 1 (validate) et si l'execution se passe bien
// on appelle la function suivante (ici careController.create), etc ...
// router.post("nom de la route", n function)
router.post("/care", authService.validate, careController.create);
router.get("/cares", authService.validate, careController.findAll);
router.get("/cares/:id", authService.validate, careController.findOne);
router.put("/cares/:id", authService.validate, careController.updateOne);
router.delete("/cares/:id", authService.validate, careController.deleteOne);

export default router;
