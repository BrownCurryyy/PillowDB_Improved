import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pass123",
    database: "sleep_tracker"
});

export default db;
