import client from "../client";

export default class {
  constructor() {
    this.table = "conditions";
    this.client = client;
  }

  // {name: "" , description: ""} object
  create = async ({ name, description }) => {
    const [results] = await this.client
      .query(`INSERT INTO ${this.table} (name, description) VALUES (?,?)`, [
        name,
        description,
      ])
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

  findAll = async () => {
    const [results] = await this.client
      .query(`SELECT * FROM ${this.table}`)
      .catch((err) => {
        console.error(err);
      });
    return results;
  };

  updateById = async ({ name, description, id }) => {
    const [results] = await this.client
      .query(`UPDATE conditions SET name = ?, description = ? WHERE id = ?`, [
        name,
        description,
        id,
      ])
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
