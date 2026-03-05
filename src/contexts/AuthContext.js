import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";
import axios from "axios";

const AuthContext = createContext();

const axiosRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Example: http://localhost:3000/v1
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * AuthProvider component that provides authentication context to its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 *
 * @returns {JSX.Element} The AuthContext provider with authentication state and methods.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        const USER_ID = localStorage.getItem("userId");

        try {
          const { data } = await api.get(`/v1/users/${USER_ID}`);
          setUser(data);
        } catch (error) {
          console.error("Failed to load user:", error);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    // const { data } = await authService.loginWithPassword(email, password);
    const data = await axiosRequest
      .post("/v1/auth/login", { email, password })
      .then((res) => res.data);
    localStorage.setItem("accessToken", data.tokens.access.token, {
      path: "/",
    });
    localStorage.setItem("refreshToken", data.tokens.refresh.token, {
      path: "/",
    });
    localStorage.setItem("userId", data.user.id, {
      path: "/",
    });
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/v1/auth/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
