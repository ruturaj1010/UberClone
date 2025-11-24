import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const captainLogout = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/captain-login");
        return;
      }

      try {
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/logout`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        localStorage.removeItem("token");
        navigate("/captain-login");
      } catch (error) {
        console.error("Captain logout failed" + error);
        localStorage.removeItem("token");
        navigate("/captain-login");
      }
    };
    captainLogout();
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      Captain Logout Loading
    </div>
  );
};

export default CaptainLogout;
