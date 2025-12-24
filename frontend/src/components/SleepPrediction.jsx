export default function SleepPrediction({ logs }) {
    // Calculate current debt from the last log
    const lastLog = logs[logs.length - 1];
    const currentDebt = lastLog ? lastLog.daily_debt : 0;

    let prediction = "";
    let color = "";

    if (currentDebt > 2) {
        prediction = "You're in deep debt! Aim for 9+ hours tonight to recover.";
        color = "#ff4d6d";
    } else if (currentDebt > 0) {
        prediction = "Slight debt. Try to get 8 hours tonight.";
        color = "#fbbf24";
    } else {
        prediction = "You're doing great! Keep it up with 7-8 hours.";
        color = "#34d399";
    }

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3>Sleep Prediction 🔮</h3>
            <p style={{ fontSize: '1.1rem', color: color, fontWeight: '500' }}>
                {prediction}
            </p>
        </div>
    );
}
