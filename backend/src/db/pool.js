import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
    console.log("PostgreSQL connection established");
});

pool.on("error", (error) => {
    console.error("PostgreSQL pool error:", error);
});

pool.query("SELECT current_database(), current_user")
    .then((result) => {
        console.log("Database test:", result.rows[0]);
    })
    .catch((error) => {
        console.error("Database test FAILED:", error);
    });
