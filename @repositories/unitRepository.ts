import { Database } from "../@config";
import { Pool } from "mysql2";
import { UnitsQueryResults } from "./../@types";

export class UnitRepository {
  private query: Pool;
  constructor(private database: Database) {
    this.database = database;
    this.query = database.EstablishConnection();
  }

  async getAll(): Promise<UnitsQueryResults[]> {
    const sql = "SELECT * FROM units ORDER BY id ASC";

    return new Promise((resolve, reject) => {
      this.query.query(sql, (err, results: UnitsQueryResults[]) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  async getAllWithPagination(limit: number, offset: number) {}

  async getById() {}

  create() {}

  updateById() {}

  deleteById() {}
}
