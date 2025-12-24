import axios from "axios";
import { useState } from "react";

export default function AddSleepForm({ user, reload }) {
    const [date, setDate] = useState("");
    const [sleep, setSleep] = useState("");
    const [showToast, setShowToast] = useState(false);

    const add = async () => {
        if (!date || !sleep) return;

        await axios.post("http://localhost:3000/logs", {
            user_id: user.user_id,
            date,
            total_sleep: sleep
        });
        setDate("");
        setSleep("");
        reload();

        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="card" style={{ position: 'relative' }}>
            <h3>Add Sleep 💤</h3>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <input placeholder="Hours slept" value={sleep} onChange={e => setSleep(e.target.value)} />
            <button onClick={add}>Log Sleep</button>

            {showToast && (
                <div style={{
                    position: 'absolute',
                    bottom: '-40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#34d399',
                    color: '#064e3b',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    whiteSpace: 'nowrap',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    Sleep logged! 🌙
                </div>
            )}
        </div>
    );
}
