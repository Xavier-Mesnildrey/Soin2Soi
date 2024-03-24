import client from "../client";

export default class {
  constructor() {
    this.table = "users";
    this.client = client;
  }

  create = async ({ username, email, hashedPassword }) => {
    const [results] = await this.client
      .query(
        `INSERT INTO ${this.table} (username, email, password) VALUES (?,?,?)`,
        [username, email, hashedPassword]
      )
      .catch((err) => {
        throw new Error(err.message);
      });
    return results;
  };

  findById = async (id) => {
    const [results] = await this.client
      .query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
      .catch((err) => {
        console.error(err);
      });
    return results[0];
  };

  findByEmail = async (email) => {
    const [results] = await this.client
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .catch((err) => {
        console.error(err);
      });
    return results[0];
  };

  findAll = async () => {
    const [results] = await this.client
      .query(`SELECT * FROM ${this.table}`)
      .catch((err) => {
        console.error(err);
      });
    return results;
  };

  updateById = async (user) => {
    const [results] = await this.client
      .query(
        `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`,
        [user.username, user.email, user.hashedPassword, user.id]
      )
      .catch((err) => {
        console.error(err);
      });
    return results.affectedRows;
  };

  deleteById = async (id) => {
    const [results] = await this.client
      .query(`DELETE FROM ${this.table} WHERE id = ?`, [id])
      .catch((err) => {
        console.error(err);
      });
    return results.affectedRows;
  };
}
