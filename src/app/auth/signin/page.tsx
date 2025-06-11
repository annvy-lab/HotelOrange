"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import type { SignInDTO } from "@/services/auth";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn({ email, senha: password } as SignInDTO);
      toast.success("Login efetuado com sucesso!");
      router.push("/home");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Credenciais inválidas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-3">
      <div className="relative bg-card rounded-3xl shadow-xl w-full max-w-sm overflow-hidden">
        <div className="relative h-30 sm:h-45 md:h-50 lg:h-45 xl:h-50">
          <img
            src="/imageLogin.svg"
            alt="Hotel Building"
            className="absolute inset-0 w-full h-full object-cover object-center rounded-t-3xl"
          />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
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

        <div className="pt-16 pb-7 px-5 bg-white rounded-b-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 mt-1">
            Login
          </h2>
          <form onSubmit={handleSignin} className="space-y-3">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@gmail.com"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Senha
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
              />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="w-full h-9 bg-primary text-white mt-2 font-semibold py-3 rounded-full"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Não tem conta?{" "}
            <a
              href="/auth/signup"
              className="text-primary hover:underline font-semibold"
            >
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
