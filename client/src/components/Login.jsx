import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://devobase-automated-email-scheduling-api.vercel.app/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("user-info", JSON.stringify(response.data));
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
