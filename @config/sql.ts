import mysql from "mysql2";
import { Pool } from "mysql2";
import dotenv from "dotenv";

/**
 * Database connection class
 * This class establishes a connection to the MySQL database using environment variables.
 * It uses a connection pool to manage multiple connections efficiently.
 * @class Database
 * @method EstablishConnection - Establishes a connection to the MySQL database.
 * @throws {Error} If the connection fails, an error is thrown with the error message.
 */

export class Database {
  private pool: Pool | null;

  constructor() {
    this.pool = null;
  }

  /**
   * Establishes a connection to the MySQL database.
   * This method uses a connection pool to manage connections efficiently.
   * It retrieves the database connection details from environment variables.
   */
  
  EstablishConnection(): Pool {

    dotenv.config();
    // Connection pool configuration
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASENAME,
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT), // The maximum number of connections to create at once
      multipleStatements: true, // Allow multiple statements in a single query
    });

    /**
     * Callback function to handle the connection.
     * @param {Error} err - The error object if the connection fails.
     * @param {Connection} connection - The MySQL connection object if the connection is successful.
     * @throws {Error} If the connection fails, an error is thrown with the error message.
     */
    this.pool.getConnection((err, connection) => {
      // If there is an error, throw an error with the message
      if (err) {
        throw new Error(err.message);
      }

      // Release the connection back to the pool, after used.
      if (connection) {
        connection.release();
      }
    });

    return this.pool;
  }
}
