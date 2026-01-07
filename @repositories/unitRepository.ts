import { Database } from "../@config";
import { Pool } from "mysql2";

export class UnitRepository {
  private query: Pool;
  constructor(private database: Database) {
    this.database = database;
    this.query = database.EstablishConnection();
  }

  async getAll() {}

  async getById() {}

  create() {}

  updateById() {}

  deleteById() {}
}
