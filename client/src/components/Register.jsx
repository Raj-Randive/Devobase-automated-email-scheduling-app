import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3002/api/auth/register", {
        userName,
        email,
        password,
      });

      if (response.status === 200) {
        // On success, redirect to login or dashboard
        console.log(response.data.message);  // Can show success message
        navigate("/login");  // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error("Error during registration: ", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-3 mt-4 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mt-4 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mt-4 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleRegister}
          className="w-full mt-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;