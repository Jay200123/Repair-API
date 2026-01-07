import { RowDataPacket } from "mysql2";

interface UnitsQueryResults extends RowDataPacket {
  id: number;
  item_sku: string;
  item_name: string;
  createdAt: Date;
  updatedAt: Date;
}

type Units = {
    item_sku: string,
    item_name: string
}

export {
    UnitsQueryResults,
    Units
}