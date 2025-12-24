import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function SleepLineChart({ logs }) {
    return (
        <Line
            data={{
                labels: logs.map(l => new Date(l.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })),
                datasets: [
                    {
                        label: "Sleep Hours",
                        data: logs.map(l => l.total_sleep),
                        borderColor: "#7c7cff",
                        backgroundColor: "rgba(124,124,255,0.2)",
                        tension: 0.4
                    },
                    {
                        label: "Sleep Debt",
                        data: logs.map(l => l.daily_debt),
                        borderColor: "#ff4d6d",
                        backgroundColor: "rgba(255,77,109,0.2)",
                        tension: 0.4
                    }
                ]
            }}
            options={{
                plugins: { legend: { labels: { color: "#ddd" } } },
                scales: {
                    x: { ticks: { color: "#aaa" } },
                    y: { ticks: { color: "#aaa" } }
                }
            }}
        />
    );
}
