import AuthService from "./auth-service";
import CareService from "./care-service";
import CityService from "./city-service";
import ConditionService from "./condition-service";
import PlaceService from "./place-service";
import UserService from "./user-service";

const authService = new AuthService();
const careService = new CareService();
const cityService = new CityService();
const conditionService = new ConditionService();
const placeService = new PlaceService();
const userService = new UserService();

export {
  authService,
  careService,
  cityService,
  conditionService,
  placeService,
  userService,
};
