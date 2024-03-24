import AuthController from "./auth-controller";
import CareController from "./care-controller";
import CityController from "./city-controller";
import ConditionController from "./condition-controller";
import PlaceController from "./place-controller";
import UserController from "./user-controller";

const authController = new AuthController();
const careController = new CareController();
const cityController = new CityController();
const conditionController = new ConditionController();
const placeController = new PlaceController();
const userController = new UserController();

export {
  authController,
  careController,
  cityController,
  conditionController,
  placeController,
  userController,
};
