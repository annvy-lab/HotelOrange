"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/lib/api";
import {
  signIn as signInService,
  signUp as signUpService,
  SignInDTO,
  SignUpDTO,
} from "@/services/auth";

interface AuthContextType {
  user: { name: string; email: string } | null;
  signIn: (dto: SignInDTO) => Promise<void>;
  signUp: (dto: SignUpDTO) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: { name: string; email: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      api
        .get("/auth/profile")
        .then(res => setUser({
          name: res.data.nome, // Mapeia 'nome' para 'name'
          email: res.data.email,
        }))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const signIn = async (dto: SignInDTO) => {
    const { accessToken, user } = await signInService(dto);
    localStorage.setItem("token", accessToken);
    setUser(user);
  };

  const signUp = async (dto: SignUpDTO) => {
    const { accessToken, user } = await signUpService(dto);
    localStorage.setItem("token", accessToken);
    setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfile = async (data: { name: string; email: string }) => {
    const response = await api.put("/auth/profile", data);
    setUser({
      name: response.data.nome,
      email: response.data.email,
    });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
