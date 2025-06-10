"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.some((user: any) => user.email === email)) {
      setError("E-mail já cadastrado.");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    setSuccess(true);
    setError("");
    setTimeout(() => router.push("/auth/signin"), 1500);
  };

  useEffect(() => {
    if (success) {
      toast.success("Cadastro realizado! Redirecionando...");
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 p-3">
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="relative h-35 sm:h-35 md:h-35 lg:h-35 xl:h-35">
          <img
            src="/imageLogin.svg"
            alt="Hotel Building"
            className="absolute inset-0 w-full h-full object-cover object-center rounded-t-3xl"
          />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              <path d="M19.34 9.34l-1.41-1.41a1 1 0 00-1.41 0l-1.41 1.41a1 1 0 000 1.41l1.41 1.41a1 1 0 001.41 0l1.41-1.41a1 1 0 000-1.41z" />
            </svg>
          </div>
        </div>
        <div className="pt-16 pb-3 px-5 bg-white rounded-b-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-1 mt-0">
            Cadastro
          </h2>
          <form
            onSubmit={handleSignup}
            className="p-1 w-full max-w-sm space-y-4"
          >
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Nome
            </label>
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-10 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            />
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="email"
            >
              E-mail
            </label>
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-10 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            />
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="password"
            >
              Senha
            </label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-10 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-800"
            />
            <Button type="submit" className="w-full rounded-full mt-1">
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
