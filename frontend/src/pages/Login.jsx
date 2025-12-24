import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const nav = useNavigate();

    const login = async () => {
        setError("");
        try {
            const res = await axios.post("http://localhost:3000/login", {
                email,
                password
            });
            localStorage.setItem("user", JSON.stringify(res.data));
            nav("/dashboard");
        } catch (err) {
            setError("Invalid email or password 😬");
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1>PillowDB 🌙</h1>
                <p>Log in before your Sleep-Debt Logs you</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {error && <span className="error">{error}</span>}

                <button onClick={login}>Login</button>
            </div>
        </div>
    );
}
