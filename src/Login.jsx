import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "user@example.com" && password === "password") {
            localStorage.setItem("auth", "true");
            navigate("/dashboard");
        } else {
            alert("Invalid email or password");
        }
    };

    return (
        <div className="login-container">
            <h1> Blass Academy</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <div class="login-guide">
                <div>
                    <p>
                        Accepted usernames are:<br />
                        standard_user<br />
                        locked_out_user<br />
                        problem_user<br />
                        performance_glitch_user<br />
                        error_user<br />
                        visual_user
                    </p>
                </div>
                <div>
                    <p>
                        Password for all users:<br />
                        secret_sauce<br />
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
