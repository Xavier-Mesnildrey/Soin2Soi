import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  // Create places
  async createOne(place) {
    const results = await this.client.places.create(place);
    return results;
  }

  // Find places
  async findById(id) {
    const results = await this.client.places.findById(id);
    return results;
  }

  async findAll() {
    const results = await this.client.places.findAll();
    return results;
  }

  // Update places
  async updateById(place) {
    const results = await this.client.places.updateById(place);
    return results.affectedRows;
  }

  // Delete places
  async deleteById(id) {
    const results = await this.client.places.deleteById(id);
    return results;
  }
}
