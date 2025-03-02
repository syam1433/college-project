import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./index.css";
import { useauthstore } from "./store/authuser";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login,isLoggingIn } = useauthstore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <>
      <div className="maindata">
        <div className="logo">
          <img src={logo} alt="aditya logo" />
        </div>
        <div className="loginform">
          <p>Employee Login</p>
          <div className="data">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button disabled={isLoggingIn} type="submit">Login</button>
              <p>
                <a href="">forgot password</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
