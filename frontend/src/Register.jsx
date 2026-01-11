import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert("User already exists or error occurred");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account 🚀</h2>
        <p>Sign up to get started</p>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={registerUser}>Register</button>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/" className="login-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
