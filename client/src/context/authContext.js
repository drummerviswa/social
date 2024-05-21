import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = async(inputs) => {
    try {
      const res = await axios.post("https://social-5r67.onrender.com/api/auth/login", inputs, {
        withCredentials: true,
        headers:{
          Authorization:`bearer ${currentUser}`
        }
      });
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const logout = async () => {
    try {
      await axios.post("https://social-5r67.onrender.com/api/auth/logout", {}, {
        withCredentials: true,
        headers:{
          Authorization:`bearer ${currentUser}`
        }
      });
      setCurrentUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed:", err);
      // Handle the error appropriately, e.g., show a message to the user
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
