import { Pool } from "mysql2";
import { Database } from "../@config";

export class TechnicianRepository {
  private query: Pool;
  constructor(private database: Database) {
    this.database = database;
    this.query = this.database.EstablishConnection();
  }

  async getAll() {
    const sql = `SELECT * FROM technician_details`;

    return new Promise((resolve, reject) => {
      this.query.query(sql, (err, results) => {
        if (err) {
          reject(err);
        }
        resolve(results);
      });
    });
  }
}
