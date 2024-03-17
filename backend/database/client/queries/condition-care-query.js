import client from "../client";

export default class {
  constructor() {
    this.table = "condition_care";
    this.client = client;
  }

  create = async ({ conditionId, careId }) => {
    const [results] = await this.client.query(
      `INSERT INTO ${this.table} (condition_id, care_id) VALUES (?,?)`,
      [conditionId, careId]
    );

    return results;
  };
}
