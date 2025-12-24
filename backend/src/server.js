import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- LOGIN ---------------- */
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const [rows] = await db.execute(
        "SELECT user_id, name, sleep_goal FROM users WHERE email=? AND password=?",
        [email, password]
    );
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });
    res.json(rows[0]);
});

/* -------- LOGS + DEBT (JOIN) -------- */
app.get("/logs/:user_id", async (req, res) => {
    const [rows] = await db.execute(`
    SELECT l.date, l.total_sleep, d.daily_debt
    FROM sleep_logs l
    JOIN sleep_debt d 
      ON l.user_id = d.user_id AND l.date = d.date
    WHERE l.user_id = ?
    ORDER BY l.date
  `, [req.params.user_id]);
    res.json(rows);
});

/* -------- ADD SLEEP LOG -------- */
app.post("/logs", async (req, res) => {
    const { user_id, date, total_sleep } = req.body;
    await db.execute(
        "INSERT INTO sleep_logs (user_id, date, total_sleep) VALUES (?,?,?)",
        [user_id, date, total_sleep]
    );
    res.json({ status: "logged" });
});

/* -------- TIPS -------- */
app.get("/tip/:user_id", async (req, res) => {
    const [[{ total }]] = await db.execute(
        "SELECT IFNULL(SUM(daily_debt),0) AS total FROM sleep_debt WHERE user_id=?",
        [req.params.user_id]
    );

    const [tips] = await db.execute(
        "SELECT message FROM tips_and_tricks ORDER BY RAND() LIMIT 1"
    );

    res.json({ debt: total, tip: tips[0]?.message });
});

app.listen(3000, () =>
    console.log("🔥 Backend running on http://localhost:3000")
);
