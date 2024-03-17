import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  // Create users
  async createOne(user) {
    const results = await this.client.users.create(user);
    return results;
  }

  // Find users
  async findById(id) {
    const results = await this.client.users.findById(id);
    return results;
  }

  async findByEmail(email) {
    const results = await this.client.users.findByEmail(email);
    return results;
  }

  async findAll() {
    const results = await this.client.users.findAll();

    if (!results) {
      return [];
    }
    return results;
  }

  // Update users
  async updateById(user) {
    const results = await this.client.users.updateById(user);
    return results.affectedRows;
  }

  // Delete users
  async deleteById(id) {
    const results = await this.client.users.deleteById(id);
    return results;
  }
}
