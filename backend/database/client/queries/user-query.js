import client from "../client";

export default class {
  constructor() {
    this.table = "users";
    this.client = client;
  }

  create = async (user) => {
    const [results] = await this.client
      .query(
        `INSERT INTO ${this.table} (userName, email, hashed_password, is_administrator) VALUES (?,?,?,?)`,
        [user.username, user.email, user.hashedPassword]
      )
      .catch((err) => {
        return err;
      });
    return results;
  };

  findById = async (id) => {
    const [results] = await this.client
      .query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
      .catch((err) => {
        console.error(err);
      });
    return results;
  };

  findByEmail = async (email) => {
    const [results] = await this.client
      .query(`SELECT * FROM ${this.table} WHERE email = ?`, [email])
      .catch((err) => {
        console.error(err);
      });
    return results;
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
