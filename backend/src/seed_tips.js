import db from "./db.js";

const tips = [
    'Avoid screens 1 hour before sleep',
    'Drink water after waking up',
    'Keep a consistent sleep schedule',
    'No caffeine after 6 PM',
    'Dark room = better sleep'
];

async function seed() {
    try {
        const [rows] = await db.execute("SELECT COUNT(*) as count FROM tips_and_tricks");
        if (rows[0].count === 0) {
            console.log("Seeding tips...");
            for (const tip of tips) {
                await db.execute("INSERT INTO tips_and_tricks (message) VALUES (?)", [tip]);
            }
            console.log("✅ Tips seeded successfully!");
        } else {
            console.log("ℹ️ Tips table already has data.");
        }
    } catch (err) {
        console.error("❌ Error seeding tips:", err);
    } finally {
        process.exit();
    }
}

seed();
