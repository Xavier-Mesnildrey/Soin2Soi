import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  // Create cities
  async createOne(city) {
    const results = await this.client.cities.create(city);
    return results;
  }

  // Find cities
  async findById(id) {
    const results = await this.client.cities.findById(id);
    return results;
  }

  async findAll() {
    const results = await this.client.cities.findAll();
    return results;
  }

  // Update cities
  async updateById(city) {
    const results = await this.client.cities.updateById(city);
    return results.affectedRows;
  }

  // Delete cities
  async deleteById(id) {
    const results = await this.client.cities.deleteById(id);
    return results;
  }
}
