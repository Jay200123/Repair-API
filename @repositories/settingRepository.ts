import { Pool } from "mysql2/typings/mysql/lib/Pool";
import { Database } from "../@config";
import { SettingsQueryResults } from "../@types";

export class SettingsRepository {
  private query: Pool;
  constructor(private database: Database) {
    this.database = database;
    this.query = database.EstablishConnection();
  }

  async getBasicCredentials(
    settings_username: string,
    settings_password: string
  ): Promise<SettingsQueryResults[]> {
    const sql = `SELECT * FROM settings WHERE settings_username=? and settings_password = MD5(?)`;

    return new Promise((resolve, reject) => {
      this.query.query(
        sql,
        [settings_username, settings_password],
        (err, result: SettingsQueryResults[]) => {
          if (err) {
            reject(err);
          }

          resolve(result);
        }
      );
    });
  }
}
