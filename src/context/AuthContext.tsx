"use client";

import type React from "react";
import {   useState, useEffect } from "react";
import { AuthContext } from "./AuthContextProvider";

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string; // for local-only use
}





// Default user (for localhost)
const DEFAULT_USER = {
  id: "admin123",
  email: "sadeniyi016@gmail.com",
  name: "Admin",
  password: "password123",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage
  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (session) {
      try {
        const userData = JSON.parse(session);
        setUser(userData);
      } catch {
        localStorage.removeItem("ticketapp_session");
      }
    }
    setIsLoading(false);
  }, []);

  // --- Helpers for local user list ---
  const getStoredUsers = (): User[] => {
    const users = localStorage.getItem("ticketapp_users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem("ticketapp_users", JSON.stringify(users));
  };

  // --- Login ---
  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Check default user
    if (email.toLowerCase() === DEFAULT_USER.email.toLowerCase() && password === DEFAULT_USER.password) {
      const {  ...safeUser } = DEFAULT_USER;
      localStorage.setItem("ticketapp_session", JSON.stringify(safeUser));
      setUser(safeUser);
      return;
    }

    // Check stored users
    const users = getStoredUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    const {  ...safeUser } = foundUser;
    localStorage.setItem("ticketapp_session", JSON.stringify(safeUser));
    setUser(safeUser);
  };

  // --- Signup ---
  const signup = async (email: string, password: string, name: string) => {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    if (!email.includes("@")) {
      throw new Error("Please enter a valid email");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    const users = getStoredUsers();
    const existingUser = users.find((u) => u.email === email);
    if (existingUser || email === DEFAULT_USER.email) {
      throw new Error("User already exists");
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after signup
    const {  ...safeUser } = newUser;
    localStorage.setItem("ticketapp_session", JSON.stringify(safeUser));
    setUser(safeUser);
  };

  // --- Logout ---
  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


