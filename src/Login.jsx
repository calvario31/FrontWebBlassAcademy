import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; // Import the CSS file
import logo from './assets/logos/logoBlassAcademyLetra.png'
import Cookies from 'js-cookie';

function Login() {
    const usernames = [
        'standard_user',
        'blocked_user',
    ]
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (usernames.includes(username) && password === "secret_blass_academy") {
            localStorage.setItem("auth", "true");
            Cookies.set('session-username', 'standard_user', { expires: 1 });
            setError("");
            navigate("/dashboard");
        } else {
            const message = usernames.includes(username) ? 'Usuario o contraseña inválidos' : 'Usuario inválido';
            setError(message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-info-container">
                <img src={logo}></img>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="user-name"
                        name="user-name"
                        placeholder="Username"
                        data-test="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        data-test="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <div className="error-box">
                            <span>{error}</span>
                            <button className="close-btn" onClick={() => setError("")}>
                                ×
                            </button>
                        </div>
                    )}

                    <button type="submit"
                        id="login-button"
                        name="login-button"
                        value="Login"
                    >Login</button>
                </form>
                <div className="login-guide">
                    <div id="login-credentials" className="login-credentials" data-test="login-credentials">
                        <div className="inner-text">
                            <h4>Username existentes: </h4>
                            {usernames.map((username, index) => (
                                <p key={index}>{username}</p>
                            ))}
                        </div>
                    </div>
                    <div className="login-password" data-test="login-password">
                        <div className="inner-text">
                            <h4> Password para los usuarios:</h4>
                            secret_blass_academy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
