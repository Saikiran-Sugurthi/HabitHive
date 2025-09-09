import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
    const data = response.data;
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };
  
  const register = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, formData);
    const data = response.data;
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;