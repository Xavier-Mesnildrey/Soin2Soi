import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  // Create conditions
  async createOne(condition) {
    const results = await this.client.conditions.create(condition);
    return results;
  }

  // Find conditions
  async findById(id) {
    const results = await this.client.conditions.findById(id);
    return results;
  }

  async findAll() {
    const results = await this.client.conditions.findAll();
    return results;
  }

  // Update conditions
  async updateById(condition) {
    const results = await this.client.conditions.updateById(condition);
    return results.affectedRows;
  }

  // Delete conditions
  async deleteById(id) {
    const results = await this.client.conditions.deleteById(id);
    return results;
  }
}
