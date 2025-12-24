import { useEffect, useState } from "react";
import axios from "axios";

export default function TipBox({ user }) {
    const [tip, setTip] = useState("Loading tip...");

    useEffect(() => {
        axios.get(`http://localhost:3000/tip/${user.user_id}`)
            .then(res => setTip(res.data.tip || "Sleep more. Seriously."))
            .catch(() => setTip("No tip today, just vibes."));
    }, [user.user_id]);

    return (
        <div className="card">
            <h3>Daily Tip 💡</h3>
            <p style={{ fontStyle: 'italic', color: '#a5b4fc' }}>"{tip}"</p>
        </div>
    );
}
