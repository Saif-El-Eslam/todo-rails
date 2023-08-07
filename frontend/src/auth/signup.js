import { useState } from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../comp/header";

function Signup() {
  const navigate = useNavigate();

  //   const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");

      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/signup`,
        {
          username,
          email,
          password,
        }
      );

      console.log(data);
      setError("");
      navigate("/login");
    } catch (err) {
      console.log(err);
      //   setError(err.response.data.message);
    }
  };

  return (
    <div className="signup">
      <Header />
      <div className="signup-container">
        <h1>Signup</h1>
        <div className="error">{error}</div>
        <form
          className="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="email@example.co"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
