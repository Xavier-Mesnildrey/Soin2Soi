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

  findAll = async (conditionId, cityId) => {
    const [results] = await this.client
      .query(
        `SELECT cares.id, cares.name, cares.description, 
        GROUP_CONCAT(places.name) AS placeNames, 
        GROUP_CONCAT(places.description) AS placeDescriptions
        FROM ${this.table} 
        INNER JOIN care_place ON care_place.care_id = cares.id 
        INNER JOIN places ON places.id = care_place.place_id 
        INNER JOIN cities ON cities.id = places.city_id
        INNER JOIN condition_care ON condition_care.care_id = cares.id
        INNER JOIN conditions ON conditions.id = condition_care.condition_id
        WHERE conditions.id = ? AND cities.id = ?
        GROUP BY cares.id`,
        [conditionId, cityId]
      )
      .catch((err) => {
        console.error(err);
      });
    return results;
  };

  updateById = async (care) => {
    const [results] = await this.client
      .query(
        `UPDATE ${this.table} SET name = ?, description = ? WHERE id = ?`,
        [care.name, care.description, care.id]
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
