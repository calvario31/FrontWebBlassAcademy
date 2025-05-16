import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; // Import the CSS file
import logo from "../assets/logos/logoBlassAcademyLetra.png";
import Cookies from "js-cookie";
import { users, masterPassword, loginErrors } from "../constants/constants";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (username === "" && password === "") {
            //ambos vacios
            setError(loginErrors.missingBoth);
        } else if (username === "" && password !== "") {
            //username vacio
            setError(loginErrors.missingUsername);
        } else if (username !== "" && password === "") {
            //password vacio
            setError(loginErrors.missingPassword);
        } else if (password !== masterPassword) {
            //contraseña incorecta
            setError(loginErrors.wrong);
        } else if (username === users.valid) {
            //usuario valido
            localStorage.setItem("auth", "true");
            Cookies.set("session-username", users.valid, { expires: 1 });
            setError("");
            navigate("/dashboard");
        } else if (username === users.blocked) {
            //usuario bloqueado
            setError(loginErrors.blocked);
        }
    }

    return (
        <div className="login-container">
            <div className="login-info-container">
                <img className="login_logo" src={logo}></img>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="user-name"
                        name="user-name"
                        placeholder="Username"
                        data-test="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        data-test="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && (
                        <h3 className="error-box" data-test="error">
                            <span>{error}</span>
                            <button className="close-btn" onClick={() => setError("")}>
                                ×
                            </button>
                        </h3>
                    )}

                    <button
                        className="blass-button success"
                        type="submit"
                        id="login-button"
                        name="login-button"
                        data-test="login-button"
                        value="Login"
                    >
                        Login
                    </button>
                </form>
                <div className="login-guide">
                    <div
                        id="login-credentials"
                        className="login-credentials"
                        data-test="login-credentials"
                    >
                        <div className="inner-text">
                            <h4>Username existentes: </h4>
                            <p key={0}> {users.valid}</p>
                            <p key={1}> {users.blocked}</p>
                        </div>
                    </div>
                    <div className="login-password" data-test="login-password">
                        <div className="inner-text">
                            <h4> Password para los usuarios:</h4>
                            {masterPassword}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
