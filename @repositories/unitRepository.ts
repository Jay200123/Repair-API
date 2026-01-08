import { Database } from "../@config";
import { Pool } from "mysql2";
import { UnitsQueryResults } from "./../@types";
import { RowDataPacket } from "mysql2";

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

  async getByUnitSKU(item_sku: string): Promise<UnitsQueryResults[]> {
    const sql = "SELECT id, unit_name FROM units WHERE unit_sku = ?";

    return new Promise((resolve, reject) => {
      this.query.query(sql, [item_sku], (err, results: UnitsQueryResults[]) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  async getBySKU(): Promise<UnitsQueryResults[]> {
    const sql = "SELECT DISTINCT unit_sku FROM units ORDER BY unit_sku";

    return new Promise((resolve, reject) => {
      this.query.query(sql, (err, results: UnitsQueryResults[]) => {
        if (err) {
          reject(err);
        }

        resolve(results);
      });
    });
  }

  async getById() {}

  create() {}

  updateById() {}

  deleteById() {}
}
