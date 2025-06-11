"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import type { SignUpDTO } from "@/services/auth";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp({ nome: name, email, senha: password } as SignUpDTO);
      toast.success("Cadastro realizado com sucesso!");
      router.push("/home");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-50 p-3">
      <div className="relative bg-card rounded-3xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="relative h-35">
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
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
            Cadastro
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Nome
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-full"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-full mt-1"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
