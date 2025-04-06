import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss"; // Import the CSS file
import logo from './assets/logos/logoBlassAcademyLetra.png'
import Cookies from 'js-cookie';
import {usuario, claveSecreta, mensajeError} from "./constantes"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if(password !== claveSecreta) {
            setError(mensajeError.credencialesIncorrectas)
        } else if(username === usuario.valido) {
            localStorage.setItem("auth", "true");
            Cookies.set('session-username', usuario.valido, { expires: 1 });
            setError("");
            navigate("/dashboard");
        } else if(username === usuario.bloqueado) {
            setError(mensajeError.usuarioBloqueado);
        } else {
            setError(mensajeError.usuario)
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
                        <h3 className="error-box" data-test="error">
                            <span>{error}</span>
                            <button className="close-btn" onClick={() => setError("")}>
                                ×
                            </button>
                        </h3>
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
                            <p key={0}> {usuario.valido}</p>
                            <p key={1}> {usuario.bloqueado}</p>
                        </div>
                    </div>
                    <div className="login-password" data-test="login-password">
                        <div className="inner-text">
                            <h4> Password para los usuarios:</h4>
                            {claveSecreta}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
