import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  // Create cares
  async createOne(care) {
    const results = await this.client.cares.create(care);
    return results;
  }

  // Find cares
  async findById(id) {
    const results = await this.client.cares.findById(id);
    return results;
  }

  async findAll(conditionId, cityId) {
    const conditionIdParsed = parseInt(conditionId, 10);
    const cityIdParsed = parseInt(cityId, 10);

    const results = await this.client.cares.findAll(
      conditionIdParsed,
      cityIdParsed
    );

    // "nom1,nom2,nom3" => [nom1 , nom2 , nom3]
    const formatedResults = results.map(
      ({ placeNames, placeDescriptions, ...rest }) => ({
        ...rest,
        placeNames: placeNames.split(","),
        placeDescriptions: placeDescriptions.split(","),
      })
    );

    return formatedResults;
  }

  // Update cares
  async updateById(care) {
    const results = await this.client.cares.updateById(care);
    return results.affectedRows;
  }

  // Delete cares
  async deleteById(id) {
    const results = await this.client.cares.deleteById(id);
    return results;
  }
}
