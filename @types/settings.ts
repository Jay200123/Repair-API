import { ResultSetHeader } from "mysql2";

interface SettingsQueryResults extends ResultSetHeader {
  id: number;
  settings_username: string;
  settings_password: string;
  createdAt: Date;
  updatedAt: Date;
}

export { SettingsQueryResults };
