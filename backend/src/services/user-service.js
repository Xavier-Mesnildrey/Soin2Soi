import bcrypt from "bcrypt";
import Client from "../../database/client";

export default class {
  constructor() {
    this.client = new Client();
  }

  // Create users
  async createOne({ username, email, password }) {
    // On vérifie que toutes les données nécessaire à la création de l'utilisateur soit fourni
    if (!username || !email || !password) {
      throw new Error("Missing user information");
    }

    // On doit crypter le mot de passe stocker en base de données
    const results = await this.client.users.create({
      username,
      email,
      hashedPassword: bcrypt.hashSync(password, 10),
    });
    if (!results.affectedRows) {
      throw new Error("Error while inserted user");
    }

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
