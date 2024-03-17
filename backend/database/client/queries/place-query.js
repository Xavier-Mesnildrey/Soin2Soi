import client from "../client";

export default class {
  constructor() {
    this.table = "places";
    this.client = client;
  }

  create = async (place) => {
    const [results] = await this.client.query(
      `INSERT INTO ${this.table} (name, description, city_id) VALUES (?,?,?)`,
      [place.name, place.description, place.city_id]
    );
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

  updateById = async (place) => {
    const [results] = await this.client
      .query(`UPDATE places SET name = ?, description = ? WHERE id = ?`, [
        place.name,
        place.description,
        place.id,
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
