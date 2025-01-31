/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig" ; 
import { signInWithEmailAndPassword } from "firebase/auth";

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Initialize axios interceptor
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();

        // Send the ID Token to the backend for verification
        const response = await axios.post("http://localhost:8080/api/auth/login", { idToken });

        localStorage.setItem("token", response.data.token as string);
        setToken(response.data.token);
        navigate("/analyze");
    } catch (error) {
      console.log(error);
        throw new Error("Login failed");
    }
};


  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        email,
        password,
      });
      const { token } = response.data;    
      localStorage.setItem("token", token); // Store token
      setToken(token); 
      navigate("/login");
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};