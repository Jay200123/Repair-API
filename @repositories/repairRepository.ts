import { Database } from "../@config";
import { Pool, ResultSetHeader } from "mysql2";
import { RepairQueryResults, RepairDetails } from "../@types";

export class RepairRepository {
  private query: Pool;

  constructor(private database: Database) {
    this.database = database;
    this.query = database.EstablishConnection();
  }

  async getAll(limit: number, offset: number): Promise<RepairQueryResults[]> {
    const sql = `
       SELECT
          a.id AS repair_id,  
          b.item_sku,
          b.item_name,
          a.serial_number,
          a.actual_problem,
          a.unit_findings,
          a.work_done,
          a.date_returned,
          a.date_repaired,
          a.unit_status,
          a.unit_remarks,
          a.unit_category,
          c.technician_name,
          a.createdAt,
          a.updatedAt
      FROM repair_details a
      INNER JOIN units b ON b.id = a.unit_id
      INNER JOIN technician_details c ON  c.id = a.technician_id
      ORDER BY a.id ASC
      LIMIT ? OFFSET ?`;

    return new Promise((resolve, reject) => {
      this.query.query(
        sql,
        [limit, offset],
        (err, results: RepairQueryResults[]) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  async getById(id: number): Promise<RepairQueryResults[]> {
    const sql = `
     SELECT
      a.id AS repair_id,
      b.item_sku,
      b.item_name,
      a.serial_number,
      a.actual_problem,
      a.unit_findings,
      a.work_done,
      a.date_returned,
      a.date_repaired,
      a.unit_status,
      a.unit_remarks,
      a.unit_category
    FROM repair_details a
    INNER JOIN units b ON b.id = a.unit_id
    WHERE a.id = ?`;

    return new Promise((resolve, reject) => {
      this.query.query(sql, [id], (err, result: RepairQueryResults[]) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  async create(data: RepairDetails): Promise<ResultSetHeader> {
    const sql = `
      INSERT INTO 
        repair_details
          ( 
            unit_id,
            serial_number, 
            actual_problem, 
            unit_findings, 
            work_done, 
            date_returned, 
            date_repaired, 
            unit_status,
            unit_remarks,
            unit_category,
            technician_id,
            createdAt,
            updatedAt
          )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

    return new Promise<ResultSetHeader>((resolve, reject) => {
      this.query.query<ResultSetHeader>(
        sql,
        [
          data.unit_id,
          data.serial_number,
          data.actual_problem,
          data.unit_findings,
          data.work_done,
          data.date_returned,
          data.date_repaired,
          data.unit_status,
          data.unit_remarks,
          data.unit_category,
          data.technician_id,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        }
      );
    });
  }

  async updateById(id: number, data: any) {
    const sql = `UPDATE repair_details SET ${data} WHERE id = ?`;

    return new Promise((resolve, reject) => {
      this.query.query(sql, [id], (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  async getByDateRepaired(
    date_from: string,
    date_to: string
  ): Promise<RepairQueryResults[]> {
    const sql = `
        SELECT
          a.id AS repair_id,  
          b.item_sku,
          b.item_name,
          a.serial_number,
          a.actual_problem,
          a.unit_findings,
          a.work_done,
          a.date_returned,
          a.date_repaired,
          a.unit_status,
          a.unit_remarks,
          a.unit_category,
          c.technician_name
        FROM repair_details a
        INNER JOIN units b ON b.id = a.unit_id
        INNER JOIN technician_details c ON  c.id = a.technician_id
        WHERE a.date_repaired BETWEEN ? AND ?
        ORDER BY a.id ASC`;

    return new Promise((resolve, reject) => {
      this.query.query(
        sql,
        [date_from, date_to],
        (err, results: RepairQueryResults[]) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        }
      );
    });
  }
}
