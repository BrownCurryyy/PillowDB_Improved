import { useEffect, useState } from "react";
import axios from "axios";
import SleepPrediction from "../components/SleepPrediction";
import SleepLineChart from "../components/SleepLineChart";
import SleepPieChart from "../components/SleepPieChart";
import AddSleepForm from "../components/AddSleepForm";
import TipBox from "../components/TipBox";
import "../styles/dashboard.css";

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [logs, setLogs] = useState([]);

    const loadLogs = async () => {
        const res = await axios.get(`http://localhost:3000/logs/${user.user_id}`);
        setLogs(res.data);
    };

    useEffect(() => {
        loadLogs();
    }, []);

    return (
        <div className="dashboard">
            <header className="dash-header">
                <h1>PillowDB 🌙</h1>
                <div className="user-badge">Hi {user.name}!!</div>
            </header>

            <div className="grid-container">
                <section className="section-input">
                    <div className="card">
                        <AddSleepForm user={user} reload={loadLogs} />
                    </div>
                    <div className="card">
                        <TipBox user={user} />
                    </div>
                </section>

                <section className="section-charts">
                    <div className="chart-card full-width">
                        <h3>Sleep vs Debt Trend</h3>
                        <SleepLineChart logs={logs} />
                    </div>

                    <div className="chart-card">
                        <h3>Quality Breakdown</h3>
                        <SleepPieChart logs={logs} />
                    </div>

                    <div className="chart-card">
                        <SleepPrediction logs={logs} />
                    </div>

                    <div className="chart-card full-width">
                        <h3>Stats</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center', width: '100%' }}>
                            <div>
                                <h2 style={{ fontSize: '2rem', margin: '10px 0', color: '#818cf8' }}>{logs.length}</h2>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total Logs</span>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', margin: '10px 0', color: '#38bdf8' }}>
                                    {logs.length > 0 ? (logs.reduce((acc, curr) => acc + curr.total_sleep, 0) / logs.length).toFixed(1) : 0}h
                                </h2>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Avg Sleep</span>
                            </div>
                            <div>
                                <h2 style={{ fontSize: '2rem', margin: '10px 0', color: '#ff4d6d' }}>
                                    {logs.length > 0 ? (logs.reduce((acc, curr) => acc + curr.daily_debt, 0) / logs.length).toFixed(1) : 0}h
                                </h2>
                                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Avg Debt</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer className="dash-footer">
                Built with Caffeine & Poor Sleep ☕
            </footer>
        </div>
    );
}
