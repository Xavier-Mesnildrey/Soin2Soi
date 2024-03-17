import client from "../client";

export default class {
  constructor() {
    this.table = "cares";
    this.client = client;
  }

  create = async (care) => {
    const [results] = await this.client
      .query(`INSERT INTO ${this.table} (name, description) VALUES (?,?)`, [
        care.name,
        care.description,
      ])
      .catch((err) => {
        return err;
      });
    return results;
  };

  // `SELECT *, places.* FROM ${this.table} JOIN care_place ON care_id = cares.id JOIN places ON places.id = place_id`

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

  updateById = async (care) => {
    const [results] = await this.client
      .query(`UPDATE cares SET name = ?, description = ? WHERE id = ?`, [
        care.name,
        care.description,
        care.id,
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
