import client from "../client";

export default class {
  constructor() {
    this.table = "cities";
    this.client = client;
  }

  create = async (city) => {
    const [results] = await this.client
      .query(`INSERT INTO ${this.table} (name, description) VALUES (?,?)`, [
        city.name,
        city.description,
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

  updateById = async (city) => {
    const [results] = await this.client
      .query(`UPDATE cities SET name = ?, description = ? WHERE id = ?`, [
        city.name,
        city.description,
        city.id,
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
