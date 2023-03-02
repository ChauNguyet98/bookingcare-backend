// get the client
import mysql from "mysql2/promise";

// create connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "booking-care",
});

export default pool;
