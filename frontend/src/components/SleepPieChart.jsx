import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function SleepPieChart({ logs }) {
    const good = logs.filter(l => l.daily_debt === 0).length;
    const bad = logs.length - good;

    return (
        <Pie
            data={{
                labels: ["Good Sleep Days", "Bad Sleep Days"],
                datasets: [
                    {
                        data: [good, bad],
                        backgroundColor: ["#6c63ff", "#ff4d6d"]
                    }
                ]
            }}
            options={{
                plugins: { legend: { labels: { color: "#ddd" } } }
            }}
        />
    );
}
