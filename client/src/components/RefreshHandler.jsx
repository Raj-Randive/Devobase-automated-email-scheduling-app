import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    if (data) {
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  }, [setIsAuthenticated, navigate]);

  return null;
};

export default RefreshHandler;
