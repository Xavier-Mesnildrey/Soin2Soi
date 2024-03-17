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

  async findAll() {
    const results = await this.client.cares.findAll();
    return results;
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
