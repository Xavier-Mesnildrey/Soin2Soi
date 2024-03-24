import {
  UserQuery,
  CareQuery,
  CityQuery,
  ConditionQuery,
  PlaceQuery,
  CarePlaceQuery,
  ConditionCareQuery,
} from "./queries";

// client
export default class {
  constructor() {
    this.users = new UserQuery();
    this.cares = new CareQuery();
    this.cities = new CityQuery();
    this.conditions = new ConditionQuery();
    this.places = new PlaceQuery();
    this.carePlace = new CarePlaceQuery();
    this.conditionCare = new ConditionCareQuery();
  }
}
