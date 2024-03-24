import client from "../client";

export default class {
  constructor() {
    this.table = "care_place";
    this.client = client;
  }

  create = async ({ careId, placeId }) => {
    const [results] = await this.client.query(
      `INSERT INTO ${this.table} (care_id, place_id) VALUES (?,?)`,
      [careId, placeId]
    );

    return results;
  };
}
