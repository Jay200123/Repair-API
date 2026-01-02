import { ResultSetHeader, RowDataPacket } from "mysql2";

type UnitStatus = "GOOD" | "FOR_SCRAP" | "FOR_REPAIR" | "UNDER_OBSERVATION";

type UnitRemarks = "CLASS-B" | "CLASS-C" | "CLASS-D" | "FOR-SHIP";

type UnitCategory = "CUSTOMER_UNIT" | "DEFECTIVE_UNIT";

/**
 * RepairDetails represents a single row returned from a MySQL SELECT query.
 *
 * This interface extends RowDataPacket to explicitly indicate that the data
 * originates from mysql2's result set. mysql2 constrains SELECT query results
 * to RowDataPacket[] (as opposed to ResultSetHeader used by INSERT/UPDATE),
 * and extending RowDataPacket allows TypeScript to correctly infer the query
 * result type when using generics with pool.query<T>().
 *
 * Without this extension, TypeScript cannot safely treat the result as a
 * SELECT row, which leads to inference issues (e.g., `unknown` results,
 * missing `.length`, or ResultSetHeader conflicts).
 */

interface RepairQueryResults extends RowDataPacket {
  unit_id: number;
  serial_number: string;
  actual_problem: string;
  unit_findings: string;
  work_done: string;
  date_returned: Date | string;
  date_repaired: Date | string;
  unit_status: UnitStatus;
  unit_remarks: UnitRemarks;
  unit_category: UnitCategory;
}

type RepairDetails = {
  unit_id: number;
  serial_number: string;
  actual_problem: string;
  unit_findings: string;
  work_done: string;
  date_returned: Date | string;
  date_repaired: Date | string;
  unit_status: UnitStatus;
  unit_remarks: UnitRemarks;
  unit_category: UnitCategory;
};

export { RepairQueryResults, RepairDetails };
