import "dotenv/config";
import { readFileSync } from "node:fs";
import { createConnection } from "mysql2/promise";

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = readFileSync(
      `${__dirname}/migrations/20240220102512_init.sql`,
      "utf8"
    );

    // Create a specific connection to the database
    const database = await createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Drop the existing database if it exists
    await database.query(`drop database if exists ${DB_NAME}`);

    // Create a new database with the specified name
    await database.query(`create database ${DB_NAME}`);

    // Switch to the newly created database
    await database.query(`use ${DB_NAME}`);

    // Execute the SQL statements to update the database schema
    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${DB_NAME} updated 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

// Run the migration function
migrate();
