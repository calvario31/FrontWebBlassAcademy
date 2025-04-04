import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; // Import the CSS file
import logo from './assets/logos/logoBlassAcademyLetra.png'


function Login() {
    const usernames = [
        'standard_user',
        'locked_out_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user'
    ]    
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
            <img src={logo}></img>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
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
            <div className="login-guide">
                <div>
                    Accepted usernames are:
                    {usernames.map((username, index) => (
                        <p key={index}>{username}</p>
                    ))}
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
