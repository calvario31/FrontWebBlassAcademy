import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; // Import the CSS file
import logo from './assets/logos/logoBlassAcademyLetra.png'

function Login() {
    const usernames = [
        'standard',
        'bloqueado',
        'inexistente',
    ]
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "username" && password === "password") {
            localStorage.setItem("auth", "true");
            navigate("/dashboard");
        } else {
            alert("Invalid username or password");
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
                    <button type="submit"
                        id="login-button"
                        name="login-button"
                        value="Login"
                    >Login</button>
                </form>
                <div className="login-guide">
                    <div id="login-credentials" className="login-credentials" data-test="login-credentials">
                        <div className="inner-text">
                            <h4>Accepted usernames are: </h4>
                            {usernames.map((username, index) => (
                                <p key={index}>{username}</p>
                            ))}
                        </div>
                    </div>
                    <div className="login-password" data-test="login-password">
                        <div className="inner-text"> 
                            <h4> Password for all users:</h4>
                            secret_blass_academy
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
